import { useState } from 'react';
import { motion } from 'framer-motion';
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
  tr,
} from '@/lib/pricing';
import { AnimatedPrice, IncludedToggle, OfferCard, SectionHeading, SpotlightCard } from '@/components/pricing/PricingParts';
import Estimator, { type EstimatorState } from '@/components/pricing/Estimator';
import ProcessSteps from '@/components/pricing/ProcessSteps';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const CALENDLY_URL = 'https://calendly.com/contact-localwebpartners/30min';

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
                  <OfferCard offer={o} onChoose={() => goEstimate({ project: o.id })} />
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
                  <OfferCard offer={o} wide onChoose={() => goEstimate({ project: o.id })} />
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
                  <OfferCard offer={o} wide onChoose={() => goEstimate({ brand: o.id })} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* 04 Maintenance & hébergement (facultatif) */}
          <section aria-labelledby="sec-care">
            <SectionHeading id="sec-care" num="04" title={tr(PRICING_UI.sectionMaintenance, language)} badge={tr(PRICING_UI.optional, language)} />
            <motion.div {...reveal} transition={{ duration: 0.6, ease }}>
              <SpotlightCard className="!p-0">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                    <img src={MAINTENANCE.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div aria-hidden="true" className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, transparent 55%, hsl(var(--bg-card)) 100%)' }} />
                    <div aria-hidden="true" className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, transparent 45%, hsl(var(--bg-card)) 100%)' }} />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <div className="flex items-baseline gap-2">
                      <AnimatedPrice value={MAINTENANCE.pricePerMonth} className="text-5xl font-extrabold" style={{ color: 'hsl(var(--accent-teal))' }} />
                      <span className="text-sm" style={{ color: 'hsl(var(--silver) / 0.6)' }}>
                        {tr(PRICING_UI.ttc, language)} {tr(PRICING_UI.perMonth, language)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{tr(MAINTENANCE.tagline, language)}</p>
                    <p
                      className="mt-5 rounded-xl p-4 text-sm leading-relaxed"
                      style={{ background: 'hsl(var(--bg-dark))', border: '1px dashed hsl(var(--accent-teal) / 0.4)', color: 'hsl(var(--silver) / 0.8)' }}
                    >
                      <strong style={{ color: 'hsl(var(--accent-teal))' }}>{tr(PRICING_UI.optional, language)} · </strong>
                      {tr(PRICING_UI.optionalNote, language)}
                    </p>
                    <div className="my-5 h-px" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
                    <IncludedToggle items={MAINTENANCE.features} columns={2} />
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
            <ProcessSteps />
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
