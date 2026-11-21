import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { useInView, useSpring } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { formatEuro, tr, PRICING_UI, type Offer } from '@/lib/pricing';

/** A euro amount that counts up when it scrolls into view, then glides to any new value. */
export function AnimatedPrice({ value, className, style }: { value: number; className?: string; style?: React.CSSProperties }) {
  const { language } = useTranslation();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const spring = useSpring(0, { stiffness: 90, damping: 22, mass: 0.8 });
  const [display, setDisplay] = useState(() => formatEuro(value, language));

  useEffect(() => spring.on('change', (v) => setDisplay(formatEuro(Math.round(v), language))), [spring, language]);
  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);
  useEffect(() => {
    // render the right figure even before the first animation frame (and for reduced motion / no JS crawlers)
    if (!inView) setDisplay(formatEuro(value, language));
  }, [language, value, inView]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }} aria-label={formatEuro(value, language)}>
      {display}
    </span>
  );
}

/** Card with a soft teal spotlight that follows the pointer. */
export function SpotlightCard({ children, highlight, className = '' }: { children: ReactNode; highlight?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        background: highlight
          ? 'linear-gradient(180deg, hsl(var(--accent-teal) / 0.10), hsl(var(--bg-card)) 45%)'
          : 'hsl(var(--bg-card))',
        border: highlight ? '1px solid hsl(var(--accent-teal) / 0.7)' : '1px solid hsl(0 0% 88% / 0.08)',
        boxShadow: highlight ? '0 0 40px -12px hsl(var(--accent-teal) / 0.45)' : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--accent-teal) / 0.10), transparent 60%)' }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

export function FeatureList({ items, columns = 1 }: { items: Offer['features']; columns?: 1 | 2 }) {
  const { language } = useTranslation();
  return (
    <ul className={`grid gap-x-6 gap-y-2.5 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: 'hsl(var(--silver) / 0.8)' }}>
          <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
          {tr(f, language)}
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({ id, num, title, badge }: { id?: string; num: string; title: string; badge?: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs" style={{ color: 'hsl(var(--accent-teal))' }}>{num}</span>
      <h2 id={id} className="text-2xl font-bold md:text-3xl" style={{ color: 'hsl(var(--silver))' }}>{title}</h2>
      {badge && (
        <span
          className="rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em]"
          style={{ background: 'hsl(var(--accent-teal) / 0.15)', color: 'hsl(var(--accent-teal))' }}
        >
          {badge}
        </span>
      )}
      <span className="h-px flex-1" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
    </div>
  );
}

export function PriceLine({ offer, size = 'lg', accent }: { offer: Offer; size?: 'lg' | 'md'; accent?: boolean }) {
  const { language } = useTranslation();
  return (
    <div>
      {offer.from && (
        <div className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: 'hsl(var(--silver) / 0.55)' }}>
          {tr(PRICING_UI.from, language)}
        </div>
      )}
      <div className="flex items-baseline gap-2">
        <AnimatedPrice
          value={offer.price}
          className={`font-extrabold tracking-tight ${size === 'lg' ? 'text-4xl md:text-5xl' : 'text-4xl'}`}
          style={{ color: accent ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver))' }}
        />
        <span className="text-xs" style={{ color: 'hsl(var(--silver) / 0.55)' }}>{tr(PRICING_UI.ttc, language)}</span>
      </div>
    </div>
  );
}

export function ChooseButton({ onClick, primary }: { onClick: () => void; primary?: boolean }) {
  const { language } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:gap-3"
      style={
        primary
          ? { background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))' }
          : { border: '1px solid hsl(0 0% 88% / 0.15)', color: 'hsl(var(--silver))' }
      }
    >
      {tr(PRICING_UI.choose, language)}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}
