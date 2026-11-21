import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  VITRINE_OFFERS,
  ECOMMERCE_OFFER,
  APPLICATION_OFFER,
  LOGO_OFFERS,
  MAINTENANCE,
  PRICING_UI,
  PROCESS_STEPS,
  tr,
} from '@/lib/pricing';
import { AnimatedPrice, ChooseButton, FeatureList, PriceLine, SectionHeading, SpotlightCard } from '@/components/pricing/PricingParts';
import Estimator, { type EstimatorState } from '@/components/pricing/Estimator';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const CALENDLY_URL = 'https://calendly.com/localwebpartners-jeansamuel/30min';

const Services = () => {
  const { language } = useTranslation();
  const [estimate, setEstimate] = useState<EstimatorState>({ project: 'vitrine-pro', brand: null, care: false });

  const goEstimate = (patch: Partial<EstimatorState>) => {
    setEstimate((s) => ({ ...s, ...patch }));
    document.getElementById('estimateur')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openCalendly = (summary: string) => {
    const url = `${CALENDLY_URL}?a1=${encodeURIComponent(summary)}`;
    if (window.Calendly) window.Calendly.initPopupWidget({ url });
    else window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead
        title="Prestations & tarifs | LocalWeb Partners"
        description="Site vitrine dès 599 €, e-commerce 1 999 €, application dès 2 999 €, logo dès 30 €. Prix TTC clairs, devis gratuit sous 24 h. Maintenance facultative à 15 €/mois."
        keywords="prix site vitrine, tarif création site web Nantes, site e-commerce prix, création application, création logo, maintenance site web, agence web Nantes"
        canonicalUrl="https://localwebpartners.fr/prestations"
      />
      <Navbar />

      {/* Hero */}
      <header className="relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 50% at 85% 0%, hsl(var(--accent-teal) / 0.12), transparent 70%)' }}
        />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--accent-teal))' }}>
              // {tr(PRICING_UI.eyebrow, language)}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl" style={{ color: 'hsl(var(--silver))' }}>
              {tr(PRICING_UI.heroTitle, language)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
              {tr(PRICING_UI.heroSubtitle, language)}
            </p>
          </motion.div>
        </div>
      </header>

      <main className="pb-10">
        <div className="container mx-auto space-y-24 px-4 lg:px-8">
          {/* 01 Site vitrine */}
          <section aria-labelledby="sec-vitrine">
            <SectionHeading id="sec-vitrine" num="01" title={tr(PRICING_UI.sectionVitrine, language)} />
            <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
              {VITRINE_OFFERS.map((o, i) => (
                <motion.div key={o.id} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }} className="relative pt-3">
                  {o.popular && (
                    <span
                      className="absolute left-1/2 top-0 z-10 -translate-x-1/2 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em]"
                      style={{ background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))', clipPath: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)' }}
                    >
                      {tr(PRICING_UI.popular, language)}
                    </span>
                  )}
                  <SpotlightCard highlight={o.popular}>
                    <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: o.popular ? 'hsl(var(--accent-teal))' : 'hsl(var(--silver) / 0.6)' }}>
                      {tr(o.name, language)}
                    </div>
                    <PriceLine offer={o} />
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(o.tagline, language)}</p>
                    <div className="my-6 h-px" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
                    <div className="mb-8"><FeatureList items={o.features} /></div>
                    <ChooseButton primary={o.popular} onClick={() => goEstimate({ project: o.id })} />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 02 Boutique en ligne & application */}
          <section aria-labelledby="sec-shop">
            <SectionHeading id="sec-shop" num="02" title={tr(PRICING_UI.sectionShop, language)} />
            <div className="grid gap-6 md:grid-cols-2">
              {[ECOMMERCE_OFFER, APPLICATION_OFFER].map((o, i) => (
                <motion.div key={o.id} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }}>
                  <SpotlightCard>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--silver))' }}>{tr(o.name, language)}</h3>
                        <p className="mt-1 text-sm" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(o.tagline, language)}</p>
                      </div>
                      <div className="text-right"><PriceLine offer={o} size="md" accent /></div>
                    </div>
                    <div className="my-6 h-px" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
                    <div className="mb-8"><FeatureList items={o.features} columns={2} /></div>
                    <ChooseButton onClick={() => goEstimate({ project: o.id })} />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 03 Logo & identité visuelle */}
          <section aria-labelledby="sec-logo">
            <SectionHeading id="sec-logo" num="03" title={tr(PRICING_UI.sectionLogo, language)} />
            <div className="grid gap-6 md:grid-cols-2">
              {LOGO_OFFERS.map((o, i) => (
                <motion.div key={o.id} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }}>
                  <SpotlightCard>
                    <h3 className="mb-3 text-lg font-bold" style={{ color: 'hsl(var(--silver))' }}>{tr(o.name, language)}</h3>
                    <PriceLine offer={o} size="md" />
                    <p className="mt-3 text-sm" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(o.tagline, language)}</p>
                    <div className="my-6 h-px" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
                    <div className="mb-8"><FeatureList items={o.features} columns={2} /></div>
                    <ChooseButton onClick={() => goEstimate({ brand: o.id })} />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 04 Maintenance & hébergement (facultatif) */}
          <section aria-labelledby="sec-care">
            <SectionHeading id="sec-care" num="04" title={tr(PRICING_UI.sectionMaintenance, language)} badge={tr(PRICING_UI.optional, language)} />
            <motion.div {...reveal} transition={{ duration: 0.6, ease }}>
              <SpotlightCard>
                <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
                  <div className="md:border-r md:pr-8" style={{ borderColor: 'hsl(0 0% 88% / 0.1)' }}>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                      <Server size={22} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedPrice value={MAINTENANCE.pricePerMonth} className="text-5xl font-extrabold" style={{ color: 'hsl(var(--accent-teal))' }} />
                      <span className="text-sm" style={{ color: 'hsl(var(--silver) / 0.6)' }}>
                        {tr(PRICING_UI.ttc, language)} {tr(PRICING_UI.perMonth, language)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(MAINTENANCE.tagline, language)}</p>
                  </div>
                  <div>
                    <FeatureList items={MAINTENANCE.features} columns={2} />
                    <p
                      className="mt-6 rounded-xl p-4 text-sm leading-relaxed"
                      style={{ background: 'hsl(var(--bg-dark))', border: '1px dashed hsl(var(--accent-teal) / 0.4)', color: 'hsl(var(--silver) / 0.8)' }}
                    >
                      <strong style={{ color: 'hsl(var(--accent-teal))' }}>{tr(PRICING_UI.optional, language)} · </strong>
                      {tr(PRICING_UI.optionalNote, language)}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </section>

          {/* 05 Estimateur */}
          <section aria-labelledby="sec-estimate" id="estimateur" className="scroll-mt-28">
            <SectionHeading id="sec-estimate" num="05" title={tr(PRICING_UI.sectionEstimator, language)} />
            <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{tr(PRICING_UI.estimatorSubtitle, language)}</p>
            <Estimator state={estimate} onChange={setEstimate} onBook={openCalendly} />
          </section>

          {/* 06 Comment ça se passe */}
          <section aria-labelledby="sec-process">
            <SectionHeading id="sec-process" num="06" title={tr(PRICING_UI.sectionProcess, language)} />
            <ol className="grid gap-6 md:grid-cols-5">
              {PROCESS_STEPS.map((s, i) => (
                <motion.li key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.08, ease }} className="relative">
                  {i < PROCESS_STEPS.length - 1 && (
                    <span aria-hidden="true" className="absolute left-12 right-0 top-5 hidden h-px md:block" style={{ background: 'hsl(var(--accent-teal) / 0.3)' }} />
                  )}
                  <span
                    className="relative flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs"
                    style={
                      i === 0
                        ? { background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))' }
                        : { border: '1px solid hsl(var(--accent-teal) / 0.6)', color: 'hsl(var(--accent-teal))', background: 'hsl(var(--bg-dark))' }
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-semibold" style={{ color: 'hsl(var(--silver))' }}>{tr(s.title, language)}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(s.desc, language)}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          <p className="border-t pt-6 text-center text-xs" style={{ borderColor: 'hsl(0 0% 88% / 0.1)', color: 'hsl(var(--silver) / 0.55)' }}>
            {tr(PRICING_UI.legal, language)}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
