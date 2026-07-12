import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from 'react-email';
import { ContactNotification } from '@/emails/ContactNotification';

const TO = 'info@ettoryx.com';
const FROM = 'ettoryx <onboarding@resend.dev>';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const form = await request.formData();

  // Honeypot: bots fill hidden fields
  if (form.get('company_website')) {
    return NextResponse.json({ ok: true });
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const service = String(form.get('service') ?? '').trim();
  const budget = String(form.get('budget') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, message: 'Missing required fields' },
      { status: 400 },
    );
  }

  const html = await render(
    ContactNotification({ name, email, phone, service, budget, message }),
  );

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Нова заявка від ${name}`,
    html,
  });

  if (error) {
    console.error('[Resend] contact error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to send email' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
