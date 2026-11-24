import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'hsl(var(--bg-dark))',
        borderTop: '1px solid hsl(0 0% 88% / 0.08)',
        color: 'hsl(var(--silver))',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold tracking-widest text-sm uppercase">
                LocalWeb<span style={{ color: 'hsl(var(--accent-teal))' }}>_</span>Partners
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
              {t('footer', 'description')}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Liens rapides">
            <h4 className="font-semibold mb-4" style={{ color: 'hsl(var(--accent-teal))' }}>{t('footer', 'navigation')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('nav', 'home')}</Link></li>
              <li><Link to="/prestations" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('nav', 'services')}</Link></li>
              <li><Link to="/portfolio" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('nav', 'portfolio')}</Link></li>
              <li><Link to="/equipe" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('nav', 'team')}</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('nav', 'contact')}</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'hsl(var(--accent-teal))' }}>{t('footer', 'servicesTitle')}</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
              <li>{t('footer', 'showcaseSite')}</li>
              <li>{t('footer', 'logoCreation')}</li>
              <li>{t('footer', 'application')}</li>
              <li>{t('footer', 'maintenanceHosting')}</li>
              <li>{t('footer', 'ecommerce')}</li>
            </ul>
          </div>

          {/* Contact */}
          <address className="not-italic">
            <h4 className="font-semibold mb-4" style={{ color: 'hsl(var(--accent-teal))' }}>{t('footer', 'contactTitle')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                <Mail size={16} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                <a href="mailto:info.localwebpartners@gmail.com" className="hover:text-[hsl(168,58%,45%)] transition-colors">
                  info.localwebpartners@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                <Phone size={16} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                <a href="tel:+33671002119" className="hover:text-[hsl(168,58%,45%)] transition-colors">
                  +33 6 71 00 21 19 - {t('footer', 'webDesigner')}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                <Instagram size={16} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                <a 
                  href="https://www.instagram.com/localwebpartners" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[hsl(168,58%,45%)] transition-colors"
                >
                  @localwebpartners
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
          <div className="text-center md:text-left">
            <p className="text-sm font-medium mb-1" style={{ color: 'hsl(var(--accent-teal))' }}>{t('footer', 'basedIn')}</p>
            <p className="text-sm" style={{ color: 'hsl(var(--silver) / 0.4)' }}>
              {t('footer', 'copyright')}
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/cgu" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.4)' }}>{t('footer', 'terms')}</Link>
            <Link to="/confidentialite" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.4)' }}>{t('footer', 'privacy')}</Link>
            <Link to="/mentions-legales" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.4)' }}>Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
