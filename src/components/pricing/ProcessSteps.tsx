import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { PROCESS_STEPS, PRICING_UI, tr } from '@/lib/pricing';

const AUTO_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const pad = (n: number) => String(n + 1).padStart(2, '0');

/** Clickable 5-step timeline. It walks through the steps on its own until the visitor picks one. */
export default function ProcessSteps() {
  const { language } = useTranslation();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { margin: '-120px' });
  const count = PROCESS_STEPS.length;
  const playing = auto && inView && !reduced;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setDir(1);
      setActive((a) => (a + 1) % count);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [playing, active, count]);

  const go = (i: number, focus = false) => {
    const next = (i + count) % count;
    setDir(next >= active ? 1 : -1);
    setActive(next);
    setAuto(false);
    if (focus) tabsRef.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1, true); }
    else if (e.key === 'Home') { e.preventDefault(); go(0, true); }
    else if (e.key === 'End') { e.preventDefault(); go(count - 1, true); }
  };

  const step = PROCESS_STEPS[active];
  const fill = count > 1 ? (active / (count - 1)) * 100 : 0;

  return (
    <div ref={rootRef}>
      {/* Stepper */}
      <div className="relative" role="tablist" aria-label={tr(PRICING_UI.sectionProcess, language)} onKeyDown={onKey}>
        <div aria-hidden="true" className="absolute left-5 right-5 top-5 h-px md:left-[10%] md:right-[10%]" style={{ background: 'hsl(0 0% 88% / 0.12)' }}>
          <motion.div className="h-full" style={{ background: 'hsl(var(--accent-teal))' }} animate={{ width: `${fill}%` }} transition={{ duration: 0.6, ease }} />
        </div>
        <div className="relative grid grid-cols-5">
          {PROCESS_STEPS.map((s, i) => {
            const isActive = i === active;
            const done = i < active;
            return (
              <button
                key={i}
                ref={(el) => (tabsRef.current[i] = el)}
                type="button"
                role="tab"
                id={`step-tab-${i}`}
                aria-selected={isActive}
                aria-controls="step-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-3 px-1 text-center outline-none"
              >
                <span
                  className="relative flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs transition-all duration-300 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-[hsl(var(--accent-teal))] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[hsl(var(--bg-dark))]"
                  style={
                    isActive
                      ? { background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))', boxShadow: '0 0 0 6px hsl(var(--accent-teal) / 0.18)' }
                      : done
                        ? { background: 'hsl(var(--accent-teal) / 0.2)', color: 'hsl(var(--accent-teal))', border: '1px solid hsl(var(--accent-teal) / 0.6)' }
                        : { background: 'hsl(var(--bg-dark))', color: 'hsl(var(--silver) / 0.6)', border: '1px solid hsl(0 0% 88% / 0.2)' }
                  }
                >
                  {done ? <Check size={16} aria-hidden="true" /> : pad(i)}
                </span>
                <span
                  className="hidden text-sm font-medium leading-snug transition-colors md:block"
                  style={{ color: isActive ? 'hsl(var(--silver))' : 'hsl(var(--silver) / 0.55)' }}
                >
                  {tr(s.title, language)}
                </span>
                {/* autoplay progress under the active step */}
                <span aria-hidden="true" className="h-[2px] w-12 overflow-hidden rounded-full" style={{ background: isActive && playing ? 'hsl(0 0% 88% / 0.12)' : 'transparent' }}>
                  {isActive && playing && (
                    <motion.span
                      key={`p-${active}`}
                      className="block h-full"
                      style={{ background: 'hsl(var(--accent-teal))' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-tab-${active}`}
        className="relative mt-8 overflow-hidden rounded-2xl"
        style={{ background: 'hsl(var(--bg-card))', border: '1px solid hsl(0 0% 88% / 0.08)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 select-none font-mono text-[9rem] font-bold leading-none md:text-[12rem]" style={{ color: 'hsl(var(--accent-teal) / 0.06)' }}>
          {pad(active)}
        </div>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={{ opacity: 0, x: reduced ? 0 : dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : dir * -40 }}
            transition={{ duration: 0.35, ease }}
            className="relative grid gap-8 p-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-10"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--accent-teal))' }}>
                {tr(PRICING_UI.step, language)} {pad(active)} / {pad(count - 1)}
              </div>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl" style={{ color: 'hsl(var(--silver))' }}>{tr(step.title, language)}</h3>
              <p className="mt-3 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{tr(step.desc, language)}</p>
            </div>
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'hsl(var(--silver) / 0.55)' }}>
                {tr(PRICING_UI.stepIncludes, language)}
              </div>
              <ul className="grid gap-3">
                {step.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 + i * 0.07, ease }}
                    className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                    style={{ background: 'hsl(var(--bg-dark))', border: '1px solid hsl(0 0% 88% / 0.06)', color: 'hsl(var(--silver) / 0.85)' }}
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                      <Check size={12} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                    </span>
                    {tr(d, language)}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative flex items-center justify-between border-t px-7 py-4 md:px-10" style={{ borderColor: 'hsl(0 0% 88% / 0.08)' }}>
          <button
            type="button"
            onClick={() => go(active - 1)}
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[hsl(var(--accent-teal))]"
            style={{ color: 'hsl(var(--silver) / 0.7)' }}
            aria-label={`${tr(PRICING_UI.step, language)} ${pad((active - 1 + count) % count)}`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {pad((active - 1 + count) % count)}
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:gap-3"
            style={{ background: 'hsl(var(--accent-teal) / 0.15)', color: 'hsl(var(--accent-teal))' }}
          >
            {tr(PROCESS_STEPS[(active + 1) % count].title, language)}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
