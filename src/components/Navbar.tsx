import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logoLocalweb from '@/assets/logo-localweb.png';
import logoFull from '@/assets/logo-localweb-full.png';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const [cursorPosition, setCursorPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navItems = [
    { name: t('nav', 'home'), path: '/' },
    { name: t('nav', 'services'), path: '/prestations' },
    { name: t('nav', 'portfolio'), path: '/portfolio' },
    { name: t('nav', 'team'), path: '/equipe' },
    { name: t('nav', 'contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: 'hsl(var(--bg-dark) / 0.85)',
        borderBottom: '1px solid hsl(0 0% 88% / 0.08)',
      }}
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="LocalWeb Partners - Accueil">
            <img src={logoFull} alt="LocalWeb Partners" className="h-10 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <div
              className="relative flex items-center rounded-full p-1"
              style={{ border: '1px solid hsl(0 0% 88% / 0.2)', background: 'hsl(0 0% 100% / 0.05)' }}
              onMouseLeave={() => setCursorPosition(pv => ({ ...pv, opacity: 0 }))}
            >
              {navItems.map((item) => (
                <NavTab
                  key={item.path}
                  to={item.path}
                  setPosition={setCursorPosition}
                  isActive={isActive(item.path)}
                >
                  {item.name}
                </NavTab>
              ))}
              <motion.div
                animate={cursorPosition}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute z-0 h-8 rounded-full md:h-9"
                style={{ background: 'hsl(var(--accent-teal))' }}
              />
            </div>
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm">
              {t('nav', 'freeQuote')}
            </Link>
            <a
              href="mailto:contact.localwebpartners@gmail.com"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}
              aria-label={t('common', 'sendEmail')}
            >
              <Mail style={{ color: 'hsl(var(--accent-teal))' }} size={20} aria-hidden="true" />
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg transition-colors duration-200 active:bg-[hsl(var(--accent-teal)/0.2)] hover:bg-[hsl(var(--accent-teal)/0.15)]"
              style={{ color: isOpen ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver))' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('common', 'closeMenu') : t('common', 'openMenu')}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden absolute top-16 left-0 right-0 animate-fade-in"
            style={{
              background: 'hsl(var(--bg-dark))',
              borderTop: '1px solid hsl(0 0% 88% / 0.08)',
              boxShadow: '0 10px 40px hsl(0 0% 0% / 0.5)',
            }}
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-6 py-3 font-medium transition-colors"
                  style={{
                    color: isActive(item.path) ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver) / 0.7)',
                    borderLeft: isActive(item.path) ? '4px solid hsl(var(--accent-teal))' : '4px solid transparent',
                    background: isActive(item.path) ? 'hsl(var(--accent-teal) / 0.05)' : 'transparent',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-6 pt-4">
                <Link
                  to="/contact"
                  className="btn-primary block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav', 'freeQuote')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavTab = ({
  children,
  setPosition,
  to,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  to: string;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      ref={ref}
      to={to}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-2 md:text-sm font-medium tracking-wide transition-colors mix-blend-difference"
      style={{ color: 'hsl(var(--silver))' }}
    >
      {children}
    </Link>
  );
};

export default Navbar;
