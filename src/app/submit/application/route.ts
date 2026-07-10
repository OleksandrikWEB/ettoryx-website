import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from 'react-email';
import { ApplicationNotification } from '@/emails/ApplicationNotification';
import { cms } from '@/lib/cms';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = 'info@ettoryx.com';
const FROM = 'ettoryx <noreply@ettoryx.com>';

export async function POST(request: Request) {
  const form = await request.formData();

  // Honeypot
  if (form.get('company_website')) {
    return NextResponse.json({ ok: true });
  }

  const jobSlug = String(form.get('job') ?? '').trim();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  const cv = form.get('cv') as File | null;

  if (!name || !email || !message || !jobSlug) {
    return NextResponse.json(
      { ok: false, message: 'Missing required fields' },
      { status: 400 },
    );
  }

  // Resolve job title from CMS (English fallback)
  const job = await cms.getJob(jobSlug);
  const jobTitle = job?.title.en ?? jobSlug;

  const html = await render(
    ApplicationNotification({
      name,
      email,
      jobSlug,
      jobTitle,
      message,
      cvFilename: cv?.name,
    }),
  );

  // Attach CV if provided
  const attachments: { filename: string; content: Buffer }[] = [];
  if (cv && cv.size > 0) {
    const bytes = await cv.arrayBuffer();
    attachments.push({ filename: cv.name, content: Buffer.from(bytes) });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Нова заявка: ${jobTitle} — ${name}`,
    html,
    attachments,
  });

  if (error) {
    console.error('[Resend] application error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to send email' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
