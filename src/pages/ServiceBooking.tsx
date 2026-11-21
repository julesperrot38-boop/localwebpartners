import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';
import { AnimatedPrice, FeatureList, PriceLine } from '@/components/pricing/PricingParts';
import {
  VITRINE_OFFERS,
  ECOMMERCE_OFFER,
  APPLICATION_OFFER,
  LOGO_OFFERS,
  MAINTENANCE,
  PRICING_UI,
  tr,
  type L10n,
  type Offer,
} from '@/lib/pricing';

import serviceSiteVitrine from '@/assets/service-site-vitrine.jpg';
import serviceCreationLogo from '@/assets/service-creation-logo.webp';
import serviceEcommerce from '@/assets/service-ecommerce.webp';
import serviceMaintenance from '@/assets/service-maintenance.jpeg';

interface Detail {
  image: string;
  title: L10n;
  offers: Offer[];
  monthly?: boolean;
  seoTitle: string;
  seoDescription: string;
}

const DETAILS: Record<string, Detail> = {
  'site-vitrine': {
    image: serviceSiteVitrine,
    title: PRICING_UI.sectionVitrine,
    offers: VITRINE_OFFERS,
    seoTitle: 'Site vitrine dès 599 € | LocalWeb Partners',
    seoDescription: 'Création de site vitrine professionnel : Essentiel 599 €, Pro 799 €, Premium 1 499 € TTC. Design sur-mesure, mobile et SEO local.',
  },
  ecommerce: {
    image: serviceEcommerce,
    title: ECOMMERCE_OFFER.name,
    offers: [ECOMMERCE_OFFER],
    seoTitle: 'Site e-commerce 1 999 € | LocalWeb Partners',
    seoDescription: 'Boutique en ligne complète à 1 999 € TTC : jusqu\'à 50 produits, paiement sécurisé, gestion des stocks et formation.',
  },
  application: {
    image: '/images/hero/application.webp',
    title: APPLICATION_OFFER.name,
    offers: [APPLICATION_OFFER],
    seoTitle: 'Création d\'application dès 2 999 € | LocalWeb Partners',
    seoDescription: 'Application web ou mobile sur devis, à partir de 2 999 € TTC : maquettes UX/UI, réservation, fidélité, espace client.',
  },
  'creation-logo': {
    image: serviceCreationLogo,
    title: PRICING_UI.sectionLogo,
    offers: LOGO_OFFERS,
    seoTitle: 'Création de logo dès 30 € | LocalWeb Partners',
    seoDescription: 'Création de logo à 30 € TTC ou identité visuelle complète à 199 € TTC : charte graphique, cartes de visite, kit réseaux sociaux.',
  },
  'services-complementaires': {
    image: serviceMaintenance,
    title: MAINTENANCE.name,
    offers: [{ id: MAINTENANCE.id, price: MAINTENANCE.pricePerMonth, name: MAINTENANCE.name, tagline: MAINTENANCE.tagline, features: MAINTENANCE.features }],
    monthly: true,
    seoTitle: 'Maintenance & hébergement 15 €/mois | LocalWeb Partners',
    seoDescription: 'Maintenance et hébergement facultatifs à 15 € TTC/mois : nom de domaine, sauvegardes, mises à jour et support technique.',
  },
};

/** Old service pages that no longer exist. */
const RETIRED = ['blog', 'portfolio'];

const ServiceBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { language } = useTranslation();
  const detail = serviceId ? DETAILS[serviceId] : null;

  if (serviceId && RETIRED.includes(serviceId)) return <Navigate to="/prestations" replace />;

  if (!detail) {
    return (
      <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
        <SEOHead title="Service non trouvé | LocalWeb Partners" description="La page demandée n'existe pas." />
        <Navbar />
        <main className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>Service non trouvé</h1>
          <Link to="/prestations" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">Retour aux prestations</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const title = tr(detail.title, language);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead title={detail.seoTitle} description={detail.seoDescription} canonicalUrl={`https://localwebpartners.fr/prestations/${serviceId}`} />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/prestations" className="inline-flex items-center gap-2 transition-colors mb-8 hover:text-[hsl(var(--accent-teal))]" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
            <ArrowLeft size={20} aria-hidden="true" />
            Retour aux prestations
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <article className="animate-fade-in-up space-y-6">
              <div className="dark-card rounded-2xl overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={detail.image}
                    alt={`${title} - LocalWeb Partners`}
                    className={`w-full h-full ${serviceId === 'creation-logo' ? 'object-contain' : 'object-cover'}`}
                    style={{ background: serviceId === 'creation-logo' ? 'hsl(var(--bg-section))' : undefined }}
                    loading="lazy"
                    width="600"
                    height="256"
                  />
                </div>
                <div className="p-8">
                  <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--silver))' }}>{title}</h1>
                  {detail.monthly && (
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.75)' }}>
                      <strong style={{ color: 'hsl(var(--accent-teal))' }}>{tr(PRICING_UI.optional, language)} · </strong>
                      {tr(PRICING_UI.optionalNote, language)}
                    </p>
                  )}
                </div>
              </div>

              {detail.offers.map((o) => (
                <div
                  key={o.id}
                  className="rounded-2xl p-7"
                  style={{
                    background: o.popular ? 'linear-gradient(180deg, hsl(var(--accent-teal) / 0.10), hsl(var(--bg-card)) 45%)' : 'hsl(var(--bg-card))',
                    border: o.popular ? '1px solid hsl(var(--accent-teal) / 0.7)' : '1px solid hsl(0 0% 88% / 0.08)',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold" style={{ color: 'hsl(var(--silver))' }}>
                        {tr(o.name, language)}
                        {o.popular && (
                          <span className="ml-2 align-middle rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider" style={{ background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))' }}>
                            {tr(PRICING_UI.popular, language)}
                          </span>
                        )}
                      </h2>
                      <p className="mt-1 text-sm" style={{ color: 'hsl(var(--silver) / 0.65)' }}>{tr(o.tagline, language)}</p>
                    </div>
                    {detail.monthly ? (
                      <div className="flex items-baseline gap-2">
                        <AnimatedPrice value={o.price} className="text-4xl font-extrabold" style={{ color: 'hsl(var(--accent-teal))' }} />
                        <span className="text-xs" style={{ color: 'hsl(var(--silver) / 0.6)' }}>{tr(PRICING_UI.ttc, language)} {tr(PRICING_UI.perMonth, language)}</span>
                      </div>
                    ) : (
                      <PriceLine offer={o} size="md" accent />
                    )}
                  </div>
                  <div className="my-5 h-px" style={{ background: 'hsl(0 0% 88% / 0.1)' }} />
                  <FeatureList items={o.features} columns={2} />
                </div>
              ))}
              <p className="text-xs" style={{ color: 'hsl(var(--silver) / 0.55)' }}>{tr(PRICING_UI.legal, language)}</p>
            </article>

            <aside className="animate-fade-in-up lg:sticky lg:top-28" style={{ animationDelay: '0.2s' }}>
              <div className="dark-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: 'hsl(var(--silver))' }}>Réservez votre rendez-vous</h2>
                <p className="text-center mb-6" style={{ color: 'hsl(var(--silver) / 0.65)' }}>
                  Choisissez un créneau pour discuter de votre projet
                </p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid hsl(0 0% 88% / 0.08)' }}>
                  <iframe
                    src={`https://calendly.com/contact-localwebpartners/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e0e0e0&primary_color=14b8a6&timezone=Europe/Paris&a1=${encodeURIComponent(title)}`}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title={`Calendrier de réservation - ${title}`}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceBooking;
