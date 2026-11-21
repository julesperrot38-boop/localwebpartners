import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';

import serviceSiteVitrine from '@/assets/service-site-vitrine.jpg';
import serviceCreationLogo from '@/assets/service-creation-logo.webp';
import serviceBlog from '@/assets/service-blog.jpg';
import servicePortfolio from '@/assets/service-portfolio.jpeg';
import serviceEcommerce from '@/assets/service-ecommerce.webp';
import serviceMaintenance from '@/assets/service-maintenance.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const Services = () => {
  const { t } = useTranslation();

  const openCalendlyPopup = (serviceTitle?: string) => {
    if (window.Calendly) {
      const baseUrl = 'https://calendly.com/localwebpartners-jeansamuel/30min';
      const url = serviceTitle ? `${baseUrl}?a1=${encodeURIComponent(serviceTitle)}` : baseUrl;
      window.Calendly.initPopupWidget({ url });
    }
  };

  const services = [
    {
      id: 'site-vitrine',
      image: serviceSiteVitrine,
      title: t('services', 'showcaseSite'),
      description: t('services', 'showcaseSiteDesc'),
      features: [t('services', 'customDesign'), t('services', 'responsiveMobile'), t('services', 'contactForm'), t('services', 'seoOptimization')],
    },
    {
      id: 'creation-logo',
      image: serviceCreationLogo,
      title: t('services', 'modernLogo'),
      description: t('services', 'modernLogoDesc'),
      features: [t('services', 'threeProposals'), t('services', 'hdFiles'), t('services', 'brandGuidelines'), t('services', 'colorVariations')],
    },
    {
      id: 'blog',
      image: serviceBlog,
      title: t('services', 'seoBlog'),
      description: t('services', 'seoBlogDesc'),
      features: [t('services', 'easyCms'), t('services', 'optimizedArticles'), t('services', 'socialSharing'), t('services', 'integratedAnalytics')],
    },
    {
      id: 'portfolio',
      image: servicePortfolio,
      title: t('services', 'interactivePortfolio'),
      description: t('services', 'interactivePortfolioDesc'),
      features: [t('services', 'modernGallery'), t('services', 'categoryFilters'), t('services', 'highQualityZoom'), t('services', 'smoothAnimations')],
    },
    {
      id: 'ecommerce',
      image: serviceEcommerce,
      title: t('services', 'completeEcommerce'),
      description: t('services', 'completeEcommerceDesc'),
      features: [t('services', 'securePayment'), t('services', 'stockManagement'), t('services', 'dashboard')],
    },
    {
      id: 'services-complementaires',
      image: serviceMaintenance,
      title: t('services', 'maintenanceSupport'),
      description: t('services', 'maintenanceSupportDesc'),
      features: [t('services', 'annualMaintenance'), t('services', 'domainName'), t('services', 'regularUpdates'), t('services', 'technicalSupport')],
    },
  ];

  const processSteps = [
    { step: '01', title: t('services', 'audit'), desc: t('services', 'auditDesc') },
    { step: '02', title: t('services', 'design'), desc: t('services', 'designDesc') },
    { step: '03', title: t('services', 'development'), desc: t('services', 'developmentDesc') },
    { step: '04', title: t('services', 'delivery'), desc: t('services', 'deliveryDesc') },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead 
        title="Nos Prestations Web Professionnelles | LocalWeb Partners"
        description="Découvrez nos prestations web : site vitrine, création logo, blog SEO, portfolio interactif, e-commerce. Devis gratuit sous 24h."
        keywords="site vitrine professionnel, création logo entreprise, blog professionnel SEO, portfolio interactif, e-commerce, agence web Nantes"
        canonicalUrl="https://localwebpartners.fr/prestations"
      />
      <Navbar />
      
      {/* Hero */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-20" style={{ background: 'hsl(var(--bg-dark))' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow">Prestations</span>
            <h1 className="section-title animate-fade-in-up">{t('services', 'title')}</h1>
            <p className="section-subtitle animate-fade-in-up animation-delay-100">{t('services', 'subtitle')}</p>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <main className="py-20" style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openCalendlyPopup(service.title)}
                className="dark-card rounded-2xl p-8 cursor-pointer group"
              >
                <div className="w-full h-40 rounded-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image} 
                    alt={`${service.title} - LocalWeb Partners`}
                    className={`w-full h-full ${service.id === 'creation-logo' ? 'object-contain' : 'object-cover'}`}
                    style={{ background: service.id === 'creation-logo' ? 'hsl(var(--bg-section))' : undefined }}
                    loading="lazy"
                    width="400"
                    height="160"
                  />
                </div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'hsl(var(--silver))' }}>{service.title}</h2>
                <p className="mb-6 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
                      <Check style={{ color: 'hsl(var(--accent-teal))' }} size={16} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 font-medium group-hover:gap-3 transition-all" style={{ color: 'hsl(var(--accent-teal))' }}>
                  {t('services', 'bookAppointment')}
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      {/* Process */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20"
        style={{ background: 'hsl(var(--bg-dark))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="process-heading"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-eyebrow">Notre méthode</span>
            <h2 id="process-heading" className="section-title">{t('services', 'ourProcess')}</h2>
            <p className="section-subtitle">{t('services', 'ourProcessSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(var(--bg-card))', border: '1px solid hsl(0 0% 88% / 0.08)' }}>
                  <span className="text-2xl font-bold" style={{ color: 'hsl(var(--accent-teal))' }}>{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>{item.title}</h3>
                <p style={{ color: 'hsl(var(--silver) / 0.5)' }}>{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20"
        style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="cta-services-heading"
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="section-eyebrow">Passez à l'action</span>
          <h2 id="cta-services-heading" className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>
            {t('services', 'readyToStart')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
            {t('services', 'contactForQuote')}
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg">
            {t('services', 'chooseService')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Services;
