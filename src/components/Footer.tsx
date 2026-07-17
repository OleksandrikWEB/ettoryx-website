import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Linkedin, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { navItems } from '@/lib/nav';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24 border-t border-line bg-bg-primary"
      data-testid="site-footer"
    >
      <div className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo-lockup.png"
              alt="ettoryx"
              width={217}
              height={120}
              className="h-12 w-auto object-contain object-left"
            />
            <p className="mt-3 text-caption uppercase tracking-[0.25em] text-gold-light/80">
              Code that works, solutions that last
            </p>
            <p className="mt-4 max-w-xs text-body text-ink-secondary">
              {t('footer.tagline')}
            </p>
            <Link
              href="/contacts"
              className={cn(buttonVariants({ size: 'sm' }), 'mt-6')}
              data-testid="footer-cta"
            >
              {t('cta.discussProject')}
            </Link>
          </div>

          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider text-ink-secondary">
              {t('footer.nav')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body text-ink-secondary transition-colors hover:text-gold-light"
                    data-testid={`footer-nav-${item.key}`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider text-ink-secondary">
              {t('footer.contact')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:info@ettoryx.com"
                  className="inline-flex items-center gap-1 text-body text-ink-secondary transition-colors hover:text-gold-light"
                  data-testid="footer-email"
                >
                  info@ettoryx.com <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+380980599887"
                  className="inline-flex items-center gap-1 text-body text-ink-secondary transition-colors hover:text-gold-light"
                >
                  +38 098 059 98 87
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/mykola_plikhtiak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-body text-ink-secondary transition-colors hover:text-gold-light"
                >
                  Telegram <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li className="text-body text-ink-secondary">
                {t('footer.responseNote')}
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {[
                {
                  Icon: Linkedin,
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/ettoryx',
                },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                {
                  Icon: Send,
                  label: 'Telegram',
                  href: 'https://t.me/mykola_plikhtiak',
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-gold hover:text-gold-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-caption text-ink-secondary sm:flex-row sm:items-center">
          <p>
            © {year} ettoryx. {t('footer.rights')}
          </p>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-gold-light"
          >
            {t('cookie.policy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
