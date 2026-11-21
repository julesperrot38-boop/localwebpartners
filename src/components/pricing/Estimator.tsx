import { Link } from 'react-router-dom';
import { CalendarCheck, Mail } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { AnimatedPrice } from '@/components/pricing/PricingParts';
import {
  PROJECT_OFFERS,
  LOGO_OFFERS,
  MAINTENANCE,
  PRICING_UI,
  formatEuro,
  tr,
  type Offer,
} from '@/lib/pricing';

export interface EstimatorState {
  project: string | null;
  brand: string | null;
  care: boolean;
}

interface Props {
  state: EstimatorState;
  onChange: (next: EstimatorState) => void;
  onBook: (summary: string) => void;
}

function Choice({
  selected,
  onSelect,
  title,
  price,
  name,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price?: string;
  name: string;
}) {
  return (
    <label
      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-all"
      style={{
        background: selected ? 'hsl(var(--accent-teal) / 0.12)' : 'hsl(var(--bg-dark))',
        border: selected ? '1px solid hsl(var(--accent-teal) / 0.8)' : '1px solid hsl(0 0% 88% / 0.08)',
        color: 'hsl(var(--silver))',
      }}
    >
      <span className="flex items-center gap-3">
        <input type="radio" name={name} checked={selected} onChange={onSelect} className="sr-only" />
        <span
          aria-hidden="true"
          className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
          style={{ border: `1.5px solid ${selected ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver) / 0.35)'}` }}
        >
          {selected && <span className="h-2 w-2 rounded-full" style={{ background: 'hsl(var(--accent-teal))' }} />}
        </span>
        {title}
      </span>
      {price && <span className="font-mono text-xs" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{price}</span>}
    </label>
  );
}

const projectLabel = (o: Offer, lang: Parameters<typeof tr>[1]) =>
  o.id.startsWith('vitrine-') ? `${tr(PRICING_UI.sectionVitrine, lang)} · ${tr(o.name, lang)}` : tr(o.name, lang);

export default function Estimator({ state, onChange, onBook }: Props) {
  const { language } = useTranslation();
  const project = PROJECT_OFFERS.find((o) => o.id === state.project) || null;
  const brand = LOGO_OFFERS.find((o) => o.id === state.brand) || null;
  const oneOff = (project?.price || 0) + (brand?.price || 0);
  const monthly = state.care ? MAINTENANCE.pricePerMonth : 0;
  const empty = oneOff === 0 && monthly === 0;
  const fmt = (v: number) => formatEuro(v, language);

  const summary = [
    project && `${projectLabel(project, language)} (${project.from ? `${tr(PRICING_UI.from, language)} ` : ''}${fmt(project.price)})`,
    brand && `${tr(brand.name, language)} (${fmt(brand.price)})`,
    state.care && `${tr(MAINTENANCE.name, language)} (${fmt(MAINTENANCE.pricePerMonth)} ${tr(PRICING_UI.perMonth, language)})`,
  ]
    .filter(Boolean)
    .join(' + ');

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="space-y-7 rounded-2xl p-6 md:p-8" style={{ background: 'hsl(var(--bg-card))', border: '1px solid hsl(0 0% 88% / 0.08)' }}>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold" style={{ color: 'hsl(var(--silver))' }}>{tr(PRICING_UI.stepProject, language)}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PROJECT_OFFERS.map((o) => (
              <Choice
                key={o.id}
                name="est-project"
                selected={state.project === o.id}
                onSelect={() => onChange({ ...state, project: o.id })}
                title={projectLabel(o, language)}
                price={`${o.from ? `${tr(PRICING_UI.from, language)} ` : ''}${fmt(o.price)}`}
              />
            ))}
            <Choice name="est-project" selected={state.project === null} onSelect={() => onChange({ ...state, project: null })} title={tr(PRICING_UI.noneProject, language)} />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold" style={{ color: 'hsl(var(--silver))' }}>{tr(PRICING_UI.stepBrand, language)}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {LOGO_OFFERS.map((o) => (
              <Choice
                key={o.id}
                name="est-brand"
                selected={state.brand === o.id}
                onSelect={() => onChange({ ...state, brand: o.id })}
                title={tr(o.name, language)}
                price={fmt(o.price)}
              />
            ))}
            <Choice name="est-brand" selected={state.brand === null} onSelect={() => onChange({ ...state, brand: null })} title={tr(PRICING_UI.haveLogo, language)} />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--silver))' }}>
            {tr(PRICING_UI.stepCare, language)}
            <span className="rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider" style={{ background: 'hsl(var(--accent-teal) / 0.15)', color: 'hsl(var(--accent-teal))' }}>
              {tr(PRICING_UI.optional, language)}
            </span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            <Choice name="est-care" selected={state.care} onSelect={() => onChange({ ...state, care: true })} title={tr(PRICING_UI.careOn, language)} price={`${fmt(MAINTENANCE.pricePerMonth)} ${tr(PRICING_UI.perMonth, language)}`} />
            <Choice name="est-care" selected={!state.care} onSelect={() => onChange({ ...state, care: false })} title={tr(PRICING_UI.careOff, language)} price={fmt(0)} />
          </div>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.6)' }}>{tr(PRICING_UI.optionalNote, language)}</p>
        </fieldset>
      </div>

      <aside
        className="flex flex-col rounded-2xl p-6 md:p-8 lg:sticky lg:top-28 lg:self-start"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--accent-teal) / 0.12), hsl(var(--bg-card)) 55%)',
          border: '1px solid hsl(var(--accent-teal) / 0.5)',
        }}
        aria-live="polite"
      >
        <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--accent-teal))' }}>{tr(PRICING_UI.summary, language)}</h3>

        <div className="text-sm" style={{ color: 'hsl(var(--silver) / 0.65)' }}>
          {tr(PRICING_UI.oneOff, language)}
          {project?.from && ` · ${tr(PRICING_UI.from, language).toLowerCase()}`}
        </div>
        <div className="flex items-baseline gap-2">
          <AnimatedPrice value={oneOff} className="text-5xl font-extrabold tracking-tight" style={{ color: 'hsl(var(--silver))' }} />
          <span className="text-xs" style={{ color: 'hsl(var(--silver) / 0.55)' }}>{tr(PRICING_UI.ttc, language)}</span>
        </div>
        {oneOff > 0 && (
          <div className="mt-1 text-xs" style={{ color: 'hsl(var(--silver) / 0.55)' }}>
            {tr(PRICING_UI.deposit, language)} : {fmt(Math.round(oneOff * 0.4))}
          </div>
        )}

        <div className="mt-6 border-t pt-5" style={{ borderColor: 'hsl(0 0% 88% / 0.1)' }}>
          <div className="text-sm" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(PRICING_UI.monthly, language)}</div>
          <div className="flex items-baseline gap-2">
            <AnimatedPrice value={monthly} className="text-3xl font-bold" style={{ color: state.care ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver) / 0.5)' }} />
            <span className="text-xs" style={{ color: 'hsl(var(--silver) / 0.55)' }}>{tr(PRICING_UI.perMonth, language)}</span>
          </div>
        </div>

        {project?.from && <p className="mt-4 text-xs leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.6)' }}>{tr(PRICING_UI.fromNote, language)}</p>}
        {empty && <p className="mt-4 text-xs" style={{ color: 'hsl(var(--silver) / 0.6)' }}>{tr(PRICING_UI.emptyNote, language)}</p>}

        <div className="mt-7 grid gap-3">
          <button
            type="button"
            onClick={() => onBook(summary)}
            disabled={empty}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))' }}
          >
            <CalendarCheck size={18} aria-hidden="true" />
            {tr(PRICING_UI.book, language)}
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors hover:text-[hsl(var(--accent-teal))]"
            style={{ border: '1px solid hsl(0 0% 88% / 0.15)', color: 'hsl(var(--silver))' }}
          >
            <Mail size={16} aria-hidden="true" />
            {tr(PRICING_UI.quote, language)}
          </Link>
        </div>
      </aside>
    </div>
  );
}
