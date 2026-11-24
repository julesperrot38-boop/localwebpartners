/*
 * "Where we work": a sticky world map that a scroll-scrubbed camera flies across,
 * landing on each country while the highlighted outline hands over to the next one.
 * Adapted from the "Origins" section of the Alto Coffee template by Kedhareswer Naidu (MIT),
 * restyled for LocalWeb Partners: dotted land, teal glow, flight arcs, live local time, photos.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Globe2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { tr } from '@/lib/pricing';
import { COUNTRY_SHAPES, LAND, LAND_DETAIL, MAP_H, MAP_W } from './worldMapData';
import { PLACES, WORLD_TEXT } from './places';

gsap.registerPlugin(ScrollTrigger);

type Box = [number, number, number, number];
const SHAPES = PLACES.map((p) => COUNTRY_SHAPES[p.id]);
const centerOf = (b: Box): [number, number] => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
const CENTERS = SHAPES.map((s) => centerOf(s.box));
const REDUCE = '(prefers-reduced-motion: reduce)';


/** Curved flight path between two map points, bowing "north". */
function arc(a: [number, number], b: [number, number]) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - dist * 0.28;
  return { d: `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, at: (t: number) => [(1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2] as [number, number] };
}
const ARCS = CENTERS.slice(1).map((c, i) => arc(CENTERS[i], c));

/** Where a map point lands on screen for a viewBox drawn with preserveAspectRatio "xMidYMid slice". */
function toScreen(px: number, py: number, vb: number[], sw: number, sh: number) {
  const s = Math.max(sw / vb[2], sh / vb[3]);
  return [(sw - vb[2] * s) / 2 + (px - vb[0]) * s, (sh - vb[3] * s) / 2 + (py - vb[1]) * s];
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const LOCALES = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES', de: 'de-DE', mt: 'en-MT' } as const;

export default function WorldPresence() {
  const { language } = useTranslation();
  const now = useClock();
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(-1);
  const [intro, setIntro] = useState(true);
  const stepRef = useRef(-1);
  const introRef = useRef(true);
  const nav = useRef<((i: number) => void) | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s: string) => root.querySelector(s);
    const svg = q('.wp-map') as SVGSVGElement | null;
    const countries = Array.from(root.querySelectorAll('.wp-country')) as SVGGElement[];
    const routes = q('.wp-routes') as SVGGElement | null;
    const tabs = q('.wp-tabs') as HTMLElement | null;
    const pin = q('.wp-pin') as HTMLElement | null;
    const stage = q('.wp-stage') as HTMLElement | null;
    const plane = q('.wp-plane') as SVGCircleElement | null;
    const arcEls = Array.from(root.querySelectorAll('.wp-arc-live')) as SVGPathElement[];
    const markers = Array.from(root.querySelectorAll('.wp-marker')) as SVGGElement[];
    if (!svg || !stage || countries.length !== SHAPES.length) return;

    const cam = { x: 0, y: 0, w: MAP_W, h: MAP_H };
    const planeState = { i: -1, t: 0 };
    const aspect = () => stage.clientWidth / Math.max(1, stage.clientHeight);
    const wide = () => stage.clientWidth >= 1024;

    const camAt = (i: number) => {
      const a = aspect();
      if (i < 0) {
        const w = a < 1 ? 620 : 980;
        const h = w / a;
        return [MAP_W / 2 - w / 2, MAP_H * 0.47 - h / 2, w, h];
      }
      if (i >= PLACES.length) {
        // the whole world, lifted a little so the closing caption sits below it
        const w = a < 1 ? 1000 : 1000;
        const h = w / a;
        // portrait: the whole world sits in the top third; wide: just above centre
        return [MAP_W / 2 - w / 2, a < 1 ? MAP_H * 0.5 - h * 0.3 : MAP_H * 0.5 - h / 2 + h * 0.24, w, h];
      }
      const [cx, cy] = CENTERS[i];
      const box = SHAPES[i].box;
      const w = a < 1 ? Math.max(PLACES[i].zoom * 0.6, (box[2] - box[0]) * 1.3) : PLACES[i].zoom;
      const h = w / a;
      // leave room for the caption: country above centre (and a bit right on wide screens)
      return [cx - w * (wide() ? 0.42 : 0.5), cy - h * (wide() ? 0.46 : 0.3), w, h];
    };

    const apply = () => {
      const vb = [cam.x, cam.y, cam.w, cam.h];
      svg.setAttribute('viewBox', vb.map((v) => v.toFixed(3)).join(' '));
      // finale markers keep the same size on screen
      const unit = cam.w / Math.max(1, stage.clientWidth);
      markers.forEach((m) => m.setAttribute('transform', `translate(${m.dataset.x} ${m.dataset.y}) scale(${unit.toFixed(5)})`));
      if (routes) routes.style.opacity = Math.max(0, Math.min(1, (cam.w - 140) / 420)).toFixed(3);
      if (plane) {
        if (planeState.i >= 0 && planeState.t > 0.001 && planeState.t < 0.999) {
          const [x, y] = ARCS[planeState.i].at(planeState.t);
          plane.setAttribute('cx', x.toFixed(3));
          plane.setAttribute('cy', y.toFixed(3));
          plane.setAttribute('r', (cam.w / 260).toFixed(3));
          plane.style.opacity = '1';
        } else plane.style.opacity = '0';
      }
      if (pin && stepRef.current < PLACES.length) {
        const i = Math.max(0, stepRef.current);
        const [sx, sy] = toScreen(CENTERS[i][0], CENTERS[i][1], vb, stage.clientWidth, stage.clientHeight);
        pin.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
      }
    };
    // tweens only mark the map dirty; it is redrawn once per frame, after GSAP has rendered
    let dirty = true;
    const mark = () => {
      dirty = true;
    };
    const flush = () => {
      if (!dirty) return;
      dirty = false;
      apply();
    };
    gsap.ticker.add(flush);
    const setCam = (c: number[]) => {
      cam.x = c[0];
      cam.y = c[1];
      cam.w = c[2];
      cam.h = c[3];
      apply();
    };
    const show = (i: number) => {
      if (i !== stepRef.current) {
        stepRef.current = i;
        setStep(i);
        const btn = tabs?.children[Math.max(0, Math.min(i, tabs.children.length - 1))] as HTMLElement | undefined;
        if (tabs && btn && tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: btn.offsetLeft - (tabs.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
      }
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(REDUCE, () => {
        // still map: tabs just jump the camera
        countries.forEach((c, k) => gsap.set(c, { autoAlpha: k === 0 ? 1 : 0, scale: 1 }));
        arcEls.forEach((p) => gsap.set(p, { opacity: 0 }));
        show(0);
        introRef.current = false;
        setIntro(false);
        setCam(camAt(0));
        nav.current = (i) => {
          countries.forEach((c, k) => gsap.set(c, { autoAlpha: k === i || i >= PLACES.length ? 1 : 0 }));
          show(i);
          setCam(camAt(i));
        };
        const onResize = () => setCam(camAt(Math.max(0, stepRef.current)));
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      });

      mm.add(`not ${REDUCE}`, () => {
        gsap.set(countries, { scale: 0.6, autoAlpha: 0, transformOrigin: '50% 50%' });
        arcEls.forEach((p) => gsap.set(p, { strokeDashoffset: 1, opacity: 0 }));
        setCam(camAt(-1));
        show(-1);
        introRef.current = true;
        setIntro(true);

        const arrivals: number[] = [];
        const mt = gsap.timeline({ defaults: { ease: 'power2.inOut' }, onUpdate: () => sync() });
        mt.to({}, { duration: 0.7 });
        for (let i = 0; i < SHAPES.length; i++) {
          if (i === 0) {
            mt.to(cam, { x: () => camAt(0)[0], y: () => camAt(0)[1], w: () => camAt(0)[2], h: () => camAt(0)[3], duration: 1.5, ease: 'sine.inOut', onUpdate: mark });
            mt.to(countries[0], { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.6');
          } else {
            const at = mt.duration();
            const mid = () => {
              const a = camAt(i - 1);
              const b = camAt(i);
              const w = Math.min(MAP_W * 1.05, Math.max(a[2], b[2], Math.abs(CENTERS[i][0] - CENTERS[i - 1][0]) * 1.6, Math.abs(CENTERS[i][1] - CENTERS[i - 1][1]) * 1.6 * aspect()));
              const h = w / aspect();
              const cx = (CENTERS[i - 1][0] + CENTERS[i][0]) / 2;
              const cy = (CENTERS[i - 1][1] + CENTERS[i][1]) / 2 - h * 0.08;
              return [cx - w / 2, cy - h / 2, w, h];
            };
            mt.to(cam, { x: () => mid()[0], y: () => mid()[1], w: () => mid()[2], h: () => mid()[3], duration: 0.9, ease: 'sine.inOut', onUpdate: mark }, at);
            mt.to(cam, { x: () => camAt(i)[0], y: () => camAt(i)[1], w: () => camAt(i)[2], h: () => camAt(i)[3], duration: 1.1, ease: 'sine.inOut', onUpdate: mark });
            mt.set(arcEls[i - 1], { opacity: 1 }, at + 0.1);
            mt.to(arcEls[i - 1], { strokeDashoffset: 0, duration: 1.5, ease: 'sine.inOut' }, at + 0.2);
            mt.to(arcEls[i - 1], { opacity: 0, duration: 0.5, ease: 'power1.out' }, at + 1.85);
            mt.fromTo(planeState, { i: i - 1, t: 0 }, { i: i - 1, t: 1, duration: 1.5, ease: 'sine.inOut', onUpdate: mark, immediateRender: false }, at + 0.2);
            mt.to(countries[i - 1], { autoAlpha: 0, scale: 0.85, duration: 0.6, ease: 'power1.in' }, at + 0.05);
            mt.to(countries[i], { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, at + 1.25);
          }
          arrivals.push(mt.duration());
          mt.to({}, { duration: 1.6 });
        }

        // finale: pull back to the whole world with every country lit
        const fin = mt.duration();
        mt.to(cam, { x: () => camAt(PLACES.length)[0], y: () => camAt(PLACES.length)[1], w: () => camAt(PLACES.length)[2], h: () => camAt(PLACES.length)[3], duration: 2, ease: 'sine.inOut', onUpdate: mark }, fin);
        mt.to(countries.slice(0, -1), { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)', stagger: 0.15 }, fin + 0.9);
        arrivals.push(mt.duration());
        mt.to({}, { duration: 1.8 });

        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          animation: mt,
          scrub: 1.6,
          invalidateOnRefresh: true,
        });

        function sync() {
          const t = mt.time();
          let i = -1;
          for (let k = 0; k < arrivals.length; k++) if (t >= arrivals[k] - (k === 0 ? 0.9 : 0.8)) i = k;
          const lead = t < 0.75;
          if (lead !== introRef.current) {
            introRef.current = lead;
            setIntro(lead);
          }
          show(i);
          mark();
        }

        nav.current = (i) => {
          const progress = arrivals[i] / mt.duration();
          const y = st.start + (st.end - st.start) * progress;
          window.scrollTo({ top: y, behavior: 'smooth' });
        };

        const onResize = () => mark();
        window.addEventListener('resize', onResize);
        // the section is lazy-loaded below the hero: measure again once everything has settled
        const r = window.setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => {
          window.clearTimeout(r);
          window.removeEventListener('resize', onResize);
        };
      });
    }, root);

    return () => {
      gsap.ticker.remove(flush);
      ctx.revert();
    };
  }, []);

  // gentle 3D tilt of the photo card under the pointer
  const onTilt = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg)`;
  };
  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  const cur = step >= 0 ? PLACES[step] : null;
  const timeFmt = useMemo(
    () => PLACES.map((p) => new Intl.DateTimeFormat(LOCALES[language], { hour: '2-digit', minute: '2-digit', timeZone: p.timeZone })),
    [language],
  );
  const offsetFmt = useMemo(() => PLACES.map((p) => new Intl.DateTimeFormat('en-GB', { timeZone: p.timeZone, timeZoneName: 'shortOffset' })), []);
  const offset = (i: number) => offsetFmt[i].formatToParts(now).find((x) => x.type === 'timeZoneName')?.value.replace('GMT', 'UTC') || '';

  return (
    <section
      ref={rootRef}
      className="wp-root"
      style={{ '--steps': PLACES.length } as CSSProperties}
      aria-label={tr(WORLD_TEXT.kicker, language)}
    >
      <style>{CSS}</style>
      <div className="wp-stage">
        <svg className="wp-map" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="wp-land" d={LAND} />
          <path className="wp-land" d={LAND_DETAIL} />
          {SHAPES.map((s, i) => (
            <path key={PLACES[i].id} className={'wp-ghost' + (i === step ? ' is-on' : '')} d={s.d} />
          ))}
          <g className="wp-routes">
            {ARCS.map((a, i) => (
              <path key={'r' + i} className="wp-arc" d={a.d} />
            ))}
          </g>
          {ARCS.map((a, i) => (
            <path key={'l' + i} className="wp-arc-live" d={a.d} pathLength={1} />
          ))}
          {SHAPES.map((s, i) => (
            <g key={'c' + i} className="wp-country">
              <path className="wp-halo wp-halo-1" d={s.d} />
              <path className="wp-halo wp-halo-2" d={s.d} />
              <path className="wp-fill" d={s.d} />
            </g>
          ))}
          <circle className="wp-plane" r="1" />
          <g className={'wp-markers' + (step === PLACES.length ? ' is-on' : '')}>
            {CENTERS.map(([x, y], i) => (
              <g key={'m' + i} className="wp-marker" data-x={x.toFixed(2)} data-y={y.toFixed(2)}>
                <circle className="wp-marker-ring" r="14" />
                <circle className="wp-marker-dot" r="4.5" />
              </g>
            ))}
          </g>
        </svg>

        <div className="wp-pin" aria-hidden="true" style={{ opacity: step >= 0 && step < PLACES.length ? 1 : 0 }}>
          <i />
          <i />
          <b />
        </div>
        <div className="wp-shade" />

        {/* intro */}
        <div className={'wp-intro' + (intro ? ' is-on' : '')}>
          <p className="wp-kicker">// {tr(WORLD_TEXT.kicker, language)}</p>
          <h2>{tr(WORLD_TEXT.title, language)}</h2>
          <p>{tr(WORLD_TEXT.intro, language)}</p>
        </div>

        {/* destinations */}
        <div className="wp-tabs" role="tablist" aria-label={tr(WORLD_TEXT.places, language)}>
          {PLACES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === step}
              className={i === step ? 'is-on' : undefined}
              onClick={() => nav.current?.(i)}
            >
              <span className="wp-tab-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="wp-tab-name">{tr(p.name, language)}</span>
            </button>
          ))}
          <button
            type="button"
            role="tab"
            aria-selected={step === PLACES.length}
            className={step === PLACES.length ? 'is-on' : undefined}
            onClick={() => nav.current?.(PLACES.length)}
          >
            <Globe2 size={14} aria-hidden="true" />
            <span className="wp-tab-name">{tr(WORLD_TEXT.overview, language)}</span>
          </button>
        </div>

        {/* finale: the whole world */}
        <div className={'wp-outro' + (step === PLACES.length ? ' is-on' : '')} aria-hidden={step !== PLACES.length}>
          <p className="wp-kicker">// {tr(WORLD_TEXT.kicker, language)}</p>
          <h2>{tr(WORLD_TEXT.outroTitle, language)}</h2>
          <ul>
            {PLACES.map((p) => (
              <li key={p.id}>
                <span aria-hidden="true">{p.flag}</span> {tr(p.name, language)}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="wp-cta" tabIndex={step === PLACES.length ? 0 : -1}>
            {tr(WORLD_TEXT.cta, language)}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* captions */}
        {PLACES.map((p, i) => (
          <article key={p.id} className={'wp-cap' + (i === step ? ' is-on' : '')} aria-hidden={i !== step}>
            <p className="wp-cap-num">
              {String(i + 1).padStart(2, '0')} / {String(PLACES.length).padStart(2, '0')}
            </p>
            <h3>
              <span aria-hidden="true">{p.flag}</span> {tr(p.name, language)}
            </h3>
            <p className="wp-cap-time">
              <Clock size={14} aria-hidden="true" />
              {tr(WORLD_TEXT.localTime, language)} · <strong>{timeFmt[i].format(now)}</strong> <span>({offset(i)})</span>
            </p>
            <p className="wp-cap-blurb">{tr(p.blurb, language)}</p>
            <Link to="/contact" className="wp-cta" tabIndex={i === step ? 0 : -1}>
              {tr(WORLD_TEXT.cta, language)}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}

        {/* photo of the place */}
        <div className="wp-photo-wrap" onMouseMove={onTilt} onMouseLeave={resetTilt} aria-hidden={!cur}>
          <div className="wp-photo" ref={cardRef}>
            {PLACES.map((p, i) => (
              <figure key={p.id} className={i === step ? 'is-on' : undefined}>
                <img src={p.photo} alt={tr(p.photoAlt, language)} loading="lazy" decoding="async" />
                <figcaption>{p.photoPlace}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {cur ? `${tr(cur.name, language)}. ${tr(cur.blurb, language)}` : ''}
        </p>
      </div>
    </section>
  );
}

const CSS = `
.wp-root{position:relative;height:calc(100svh * (var(--steps) * 2 + 4));background:hsl(var(--bg-dark));border-top:1px solid hsl(0 0% 88% / .08)}
.wp-stage{position:sticky;top:0;height:100svh;min-height:560px;overflow:hidden;font-family:Inter,system-ui,sans-serif}
.wp-map{position:absolute;inset:0;width:100%;height:100%;max-width:none}
.wp-land{fill:#1c1d1d;stroke:hsl(0 0% 88% / .16);stroke-width:.7;vector-effect:non-scaling-stroke;stroke-linejoin:round}
.wp-ghost{fill:hsl(var(--accent-teal));opacity:.35;transition:opacity .5s}
.wp-ghost.is-on{opacity:0}
.wp-arc{fill:none;stroke:hsl(var(--accent-teal) / .22);stroke-width:1;stroke-dasharray:3 5;vector-effect:non-scaling-stroke}
.wp-arc-live{fill:none;stroke:hsl(var(--accent-teal));stroke-width:2;stroke-linecap:round;stroke-dasharray:1;vector-effect:non-scaling-stroke}
.wp-country{opacity:0;visibility:hidden}
.wp-fill{fill:hsl(var(--accent-teal));stroke:hsl(168 70% 70%);stroke-width:1;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.wp-halo{fill:none;stroke:hsl(var(--accent-teal));stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.wp-halo-1{stroke-width:26px;opacity:.10}
.wp-halo-2{stroke-width:10px;opacity:.22}
.wp-markers{opacity:0;transition:opacity .6s}
.wp-markers.is-on{opacity:1}
.wp-marker-ring{fill:hsl(var(--accent-teal) / .18);stroke:hsl(var(--accent-teal));stroke-width:1.5;animation:wp-mark 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.wp-marker-dot{fill:#fff;stroke:hsl(var(--accent-teal));stroke-width:2}
@keyframes wp-mark{0%,100%{transform:scale(.8);opacity:.9}50%{transform:scale(1.15);opacity:.5}}
.wp-plane{fill:#fff;opacity:0;filter:drop-shadow(0 0 4px hsl(var(--accent-teal)))}
.wp-pin{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;transition:opacity .5s;z-index:2}
.wp-pin i{position:absolute;left:-56px;top:-56px;width:112px;height:112px;border-radius:50%;border:1.5px solid hsl(var(--accent-teal));animation:wp-ping 2.8s cubic-bezier(.2,.6,.3,1) infinite}
.wp-pin i+i{animation-delay:1.4s}
.wp-pin b{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px hsl(var(--accent-teal) / .45),0 0 18px hsl(var(--accent-teal))}
@keyframes wp-ping{0%{transform:scale(.15);opacity:1}100%{transform:scale(1);opacity:0}}
.wp-shade{position:absolute;inset:0;pointer-events:none;background:
  radial-gradient(120% 90% at 50% 45%,transparent 55%,hsl(var(--bg-dark) / .85) 100%),
  linear-gradient(0deg,hsl(var(--bg-dark)) 0%,hsl(var(--bg-dark) / .55) 22%,transparent 45%),
  linear-gradient(180deg,hsl(var(--bg-dark)) 0%,transparent 18%)}
.wp-intro{position:absolute;left:16px;right:16px;top:50%;text-align:center;opacity:0;transform:translateY(-44%);transition:opacity .6s,transform .8s cubic-bezier(.2,.8,.2,1);pointer-events:none;z-index:3}
.wp-intro.is-on{opacity:1;transform:translateY(-50%)}
.wp-kicker{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:hsl(var(--accent-teal))}
.wp-intro h2{margin:18px auto 18px;max-width:14ch;font-size:clamp(40px,6.4vw,96px);font-weight:800;line-height:.95;letter-spacing:-.04em;color:hsl(var(--silver))}
.wp-intro>p:not(.wp-kicker){max-width:440px;margin:0 auto;font-size:16px;line-height:1.65;color:hsl(var(--silver) / .72)}
.wp-tabs{position:absolute;z-index:4;left:50%;top:clamp(84px,12vh,120px);transform:translateX(-50%);display:flex;gap:4px;padding:5px;border-radius:999px;background:hsl(var(--bg-dark) / .6);border:1px solid hsl(0 0% 88% / .1);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);max-width:calc(100% - 24px);overflow-x:auto;scrollbar-width:none}
.wp-tabs::-webkit-scrollbar{display:none}
.wp-tabs button{display:flex;align-items:center;gap:8px;white-space:nowrap;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:500;color:hsl(var(--silver) / .65);transition:background .3s,color .3s}
.wp-tabs button:hover{color:hsl(var(--silver))}
.wp-tabs button.is-on{background:hsl(var(--accent-teal));color:hsl(var(--bg-dark))}
.wp-tabs button:focus-visible{outline:2px solid hsl(var(--accent-teal));outline-offset:2px}
.wp-outro{position:absolute;z-index:3;left:16px;right:16px;bottom:clamp(28px,7vh,72px);text-align:center;opacity:0;transform:translateY(24px);transition:opacity .6s,transform .8s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.wp-outro.is-on{opacity:1;transform:none;pointer-events:auto}
.wp-outro h2{margin:12px auto 16px;max-width:18ch;font-size:clamp(32px,4.6vw,68px);font-weight:800;line-height:1;letter-spacing:-.04em;color:hsl(var(--silver))}
.wp-outro ul{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.wp-outro li{padding:7px 14px;border-radius:999px;font-size:13px;font-weight:600;color:hsl(var(--silver));background:hsl(var(--accent-teal) / .12);border:1px solid hsl(var(--accent-teal) / .4)}
.wp-tabs button svg{opacity:.8}
.wp-tab-num{font-family:ui-monospace,monospace;font-size:10px;opacity:.7}
.wp-cap{position:absolute;z-index:3;left:clamp(16px,5vw,80px);right:16px;bottom:clamp(28px,7vh,72px);max-width:520px;visibility:hidden;transition:visibility 0s .6s}
.wp-cap.is-on{visibility:visible;transition:none}
.wp-cap>*{opacity:0;transform:translateY(22px);transition:opacity .45s,transform .7s cubic-bezier(.2,.8,.2,1)}
.wp-cap.is-on>*{opacity:1;transform:none}
.wp-cap.is-on>:nth-child(2){transition-delay:.05s}
.wp-cap.is-on>:nth-child(3){transition-delay:.1s}
.wp-cap.is-on>:nth-child(4){transition-delay:.15s}
.wp-cap.is-on>:nth-child(5){transition-delay:.2s}
.wp-cap-num{font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.25em;color:hsl(var(--accent-teal))}
.wp-cap h3{margin:6px 0 10px;font-size:clamp(42px,6.6vw,104px);font-weight:800;line-height:.92;letter-spacing:-.045em;color:#fff}
.wp-cap h3 span{font-size:.5em;vertical-align:.35em;margin-right:.1em}
.wp-cap-time{display:flex;align-items:center;gap:6px;font-size:14px;color:hsl(var(--silver) / .7)}
.wp-cap-time strong{color:hsl(var(--silver));font-variant-numeric:tabular-nums;font-weight:600}
.wp-cap-time span{color:hsl(var(--silver) / .5)}
.wp-cap-blurb{margin-top:10px;font-size:15px;line-height:1.6;color:hsl(var(--silver) / .78);max-width:46ch}
.wp-cta{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:10px 18px;border-radius:999px;font-size:13px;font-weight:600;color:hsl(var(--accent-teal));background:hsl(var(--accent-teal) / .14);border:1px solid hsl(var(--accent-teal) / .35);transition:gap .3s,background .3s}
.wp-cta:hover{gap:12px;background:hsl(var(--accent-teal) / .22)}
.wp-photo-wrap{position:absolute;z-index:3;right:clamp(16px,5vw,80px);bottom:clamp(28px,8vh,84px);width:clamp(220px,22vw,330px);display:none}
.wp-photo{position:relative;aspect-ratio:4/5;border-radius:18px;overflow:hidden;border:1px solid hsl(0 0% 88% / .14);background:hsl(var(--bg-card));box-shadow:0 30px 80px -20px #000,0 0 0 1px hsl(var(--accent-teal) / .08);transition:transform .25s ease-out}
.wp-photo figure{position:absolute;inset:0;margin:0;opacity:0;transform:scale(1.08);transition:opacity .7s,transform 1.2s cubic-bezier(.2,.8,.2,1)}
.wp-photo figure.is-on{opacity:1;transform:none}
.wp-photo img{width:100%;height:100%;object-fit:cover}
.wp-photo figcaption{position:absolute;left:12px;bottom:12px;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:500;color:#fff;background:hsl(var(--bg-dark) / .55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
@media (min-width:1024px){
  .wp-photo-wrap{display:block}
  .wp-photo-wrap[aria-hidden=true]{opacity:0;transform:translateY(20px);transition:opacity .5s,transform .6s}
  .wp-photo-wrap{transition:opacity .5s,transform .6s}
}
@media (max-width:640px){
  .wp-cap{left:16px}
  .wp-cap-blurb{font-size:14px}
  .wp-pin i{left:-40px;top:-40px;width:80px;height:80px}
}
@media (prefers-reduced-motion: reduce){
  .wp-root{height:auto}
  .wp-stage{position:relative}
  .wp-pin i,.wp-marker-ring{animation:none}
}
`;
