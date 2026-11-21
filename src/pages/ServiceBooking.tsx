import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

import serviceSiteVitrine from '@/assets/service-site-vitrine.jpg';
import serviceCreationLogo from '@/assets/service-creation-logo.webp';
import serviceBlog from '@/assets/service-blog.jpg';
import servicePortfolio from '@/assets/service-portfolio.jpeg';
import serviceEcommerce from '@/assets/service-ecommerce.webp';
import serviceMaintenance from '@/assets/service-maintenance.jpeg';

const servicesData: Record<string, {
  image: string; title: string; description: string; features: string[];
  seoTitle: string; seoDescription: string;
}> = {
  'site-vitrine': { image: serviceSiteVitrine, title: 'Site Vitrine 1-6 Pages', description: 'Présentation professionnelle de votre activité avec page contact, galerie et informations clés.', features: ['Design sur-mesure', 'Responsive mobile', 'Formulaire contact', 'Optimisation SEO'], seoTitle: 'Site Vitrine Professionnel | LocalWeb Partners', seoDescription: 'Création site vitrine professionnel 1-6 pages.' },
  'creation-logo': { image: serviceCreationLogo, title: 'Création Logo Moderne', description: 'Identité visuelle moderne et mémorable.', features: ['3 propositions', 'Fichiers HD', 'Charte graphique', 'Déclinaisons couleurs'], seoTitle: 'Création Logo Moderne | LocalWeb Partners', seoDescription: 'Création logo professionnel et moderne.' },
  'blog': { image: serviceBlog, title: 'Blog Professionnel SEO', description: 'Plateforme de contenu optimisée SEO.', features: ['CMS facile', 'Articles optimisés', 'Partage réseaux', 'Analytics intégrés'], seoTitle: 'Blog Professionnel SEO | LocalWeb Partners', seoDescription: 'Création blog professionnel optimisé SEO.' },
  'portfolio': { image: servicePortfolio, title: 'Portfolio Interactif', description: 'Mise en valeur élégante de vos réalisations.', features: ['Galerie moderne', 'Filtres catégories', 'Zoom haute qualité', 'Animations fluides'], seoTitle: 'Portfolio Interactif | LocalWeb Partners', seoDescription: 'Création portfolio interactif professionnel.' },
  'ecommerce': { image: serviceEcommerce, title: 'E-commerce Complet', description: 'Boutique en ligne sécurisée.', features: ['Paiement sécurisé', 'Gestion stocks', 'Tableau de bord'], seoTitle: 'E-commerce Complet | LocalWeb Partners', seoDescription: 'Création boutique e-commerce complète.' },
  'services-complementaires': { image: serviceMaintenance, title: 'Maintenance & Support', description: 'Maintenance et mises à jour.', features: ['Maintenance annuelle', 'Nom de domaine', 'Mises à jour régulières', 'Support technique'], seoTitle: 'Maintenance Site Web | LocalWeb Partners', seoDescription: 'Services de maintenance site web.' },
};

const ServiceBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
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

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead title={service.seoTitle} description={service.seoDescription} canonicalUrl={`https://localwebpartners.fr/prestations/${serviceId}`} />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/prestations" className="inline-flex items-center gap-2 transition-colors mb-8" style={{ color: 'hsl(var(--silver) / 0.6)' }}>
            <ArrowLeft size={20} aria-hidden="true" />
            Retour aux prestations
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <article className="animate-fade-in-up">
              <div className="dark-card rounded-2xl overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src={service.image} alt={`${service.title} - LocalWeb Partners`}
                    className={`w-full h-full ${serviceId === 'creation-logo' ? 'object-contain' : 'object-cover'}`}
                    style={{ background: serviceId === 'creation-logo' ? 'hsl(var(--bg-section))' : undefined }}
                    loading="lazy" width="600" height="256" />
                </div>
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>{service.title}</h1>
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{service.description}</p>
                  <div className="space-y-3">
                    <h2 className="font-semibold" style={{ color: 'hsl(var(--silver))' }}>Ce qui est inclus :</h2>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3" style={{ color: 'hsl(var(--silver) / 0.6)' }}>
                          <Check style={{ color: 'hsl(var(--accent-teal))' }} className="flex-shrink-0" size={18} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <aside className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="dark-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: 'hsl(var(--silver))' }}>Réservez votre rendez-vous</h2>
                <p className="text-center mb-6" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                  Choisissez un créneau pour discuter de votre projet
                </p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid hsl(0 0% 88% / 0.08)' }}>
                  <iframe
                    src={`https://calendly.com/contact-localwebpartners/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e0e0e0&primary_color=14b8a6&timezone=Europe/Paris&a1=${encodeURIComponent(service.title)}`}
                    width="100%" height="700" frameBorder="0"
                    title={`Calendrier de réservation - ${service.title}`}
                    className="w-full" loading="lazy" />
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
