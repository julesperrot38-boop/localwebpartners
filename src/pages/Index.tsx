import { Link } from 'react-router-dom';
import { Search, Smartphone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ServicesHero from '@/components/ServicesHero';
import { useTranslation } from '@/contexts/LanguageContext';
import benefitPersonnalisation from '@/assets/benefit-personnalisation.png';
import benefitMobile from '@/assets/benefit-mobile.jpg';
import benefitSeo from '@/assets/benefit-seo.webp';

const customEase = [0.16, 1, 0.3, 1] as const;

const assembleFromLeft = {
  hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: customEase as unknown as [number, number, number, number] } }
};

const assembleFromRight = {
  hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: customEase as unknown as [number, number, number, number] } }
};

const assembleFromBottom = {
  hidden: { opacity: 0, y: 60, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: customEase as unknown as [number, number, number, number] } }
};

const assembleScale = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: customEase as unknown as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const Index = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Search,
      title: t('home', 'personalization'),
      description: t('home', 'personalizationDesc'),
      image: benefitPersonnalisation,
    },
    {
      icon: Smartphone,
      title: t('home', 'optimizedSites'),
      description: t('home', 'optimizedSitesDesc'),
      image: benefitMobile,
    },
    {
      icon: MapPin,
      title: t('home', 'localSeo'),
      description: t('home', 'localSeoDesc'),
      image: benefitSeo,
    },
  ];

  const checklistItems = [
    t('home', 'modernWebDesign'),
    t('home', 'personalSupport'),
    t('home', 'measurableResults'),
  ];

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead 
        title="Localweb Partners | Agence Web Design Nantes"
        description="Agence web spécialisée création sites web entreprises locales. Site vitrine professionnel, e-commerce, SEO local. Devis gratuit 24h. Nantes, France."
        keywords="création site web Nantes, site entreprise locale France, agence web Nantes, site vitrine professionnel, SEO local, création site internet, web design Nantes, Loire-Atlantique 44"
        canonicalUrl="https://localweb-partners.com/"
      />
      <Navbar />
      
      <ServicesHero />

      {/* Benefits Section */}
      <section
        className="py-20"
        style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="benefits-heading"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span variants={assembleFromLeft} className="section-eyebrow block">Nos avantages</motion.span>
            <motion.h2 variants={assembleScale} id="benefits-heading" className="section-title">{t('home', 'benefitsTitle')}</motion.h2>
            <motion.p variants={assembleFromRight} className="section-subtitle">{t('home', 'benefitsSubtitle')}</motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.article
                key={index}
                variants={assembleFromBottom}
                className="dark-card rounded-2xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={`${benefit.title} - LocalWeb Partners`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                    <benefit.icon style={{ color: 'hsl(var(--accent-teal))' }} size={28} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'hsl(var(--silver))' }}>{benefit.title}</h3>
                  <p style={{ color: 'hsl(var(--silver) / 0.5)' }} className="leading-relaxed">{benefit.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section
        className="py-20"
        style={{ background: 'hsl(var(--bg-dark))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span variants={assembleFromRight} className="section-eyebrow block">À propos</motion.span>
            <motion.h2 variants={assembleScale} id="about-heading" className="section-title">{t('home', 'whyChooseUs')}</motion.h2>
            <motion.p variants={assembleFromLeft} className="text-lg mb-8 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
              {t('home', 'whyChooseUsDesc')}
            </motion.p>
            <motion.ul variants={staggerContainer} className="flex flex-wrap justify-center gap-6 mb-8">
              {checklistItems.map((item, i) => (
                <motion.li key={i} variants={assembleFromBottom} className="flex items-center gap-2">
                  <CheckCircle style={{ color: 'hsl(var(--accent-teal))' }} size={20} aria-hidden="true" />
                  <span className="font-medium" style={{ color: 'hsl(var(--silver))' }}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={assembleFromBottom}>
              <Link to="/equipe" className="btn-secondary inline-flex items-center gap-2">
                {t('home', 'discoverTeam')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="cta-heading"
      >
        <motion.div
          className="container mx-auto px-4 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.span variants={assembleFromLeft} className="section-eyebrow block">Passez à l'action</motion.span>
          <motion.h2 variants={assembleScale} id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>
            {t('home', 'readyToBoost')}
          </motion.h2>
          <motion.p variants={assembleFromRight} className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
            {t('home', 'getFreeQuote')}
          </motion.p>
          <motion.div variants={assembleFromBottom}>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg">
              {t('home', 'requestFreeQuote')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
