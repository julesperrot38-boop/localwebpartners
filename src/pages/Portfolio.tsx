import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';
import FeatureCarousel from '@/components/ui/feature-carousel';
import { ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead 
        title="Portfolio LocalWeb Partners - Nos Réalisations Sites Web"
        description="Découvrez nos réalisations : Aurora, Ducke Barber, Fitness Squad, L'Éclipse. Sites web professionnels entreprises locales."
        keywords="portfolio agence web, réalisations site web, exemples sites vitrine"
        canonicalUrl="https://localwebpartners.fr/portfolio"
      />
      <Navbar />
      
      {/* Hero */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-20" style={{ background: 'hsl(var(--bg-dark))' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow">Portfolio</span>
            <h1 className="section-title animate-fade-in-up">{t('portfolio', 'title')}</h1>
            <p className="section-subtitle animate-fade-in-up animation-delay-100">{t('portfolio', 'subtitle')}</p>
          </div>
        </div>
      </header>

      <FeatureCarousel />

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20"
        style={{ background: 'hsl(var(--bg-dark))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}
        aria-labelledby="cta-portfolio-heading"
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="section-eyebrow">Votre projet</span>
          <h2 id="cta-portfolio-heading" className="section-title">{t('portfolio', 'yourProjectAwaits')}</h2>
          <p className="section-subtitle mb-8">{t('portfolio', 'yourProjectAwaitsDesc')}</p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2 text-lg">
            {t('portfolio', 'startProject')}
            <ExternalLink size={20} aria-hidden="true" />
          </a>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Portfolio;
