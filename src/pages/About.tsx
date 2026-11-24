import { Link } from 'react-router-dom';
import { 
  Heart, Zap, Users, ArrowRight, CheckCircle,
  ClipboardList, Palette, Code, GraduationCap,
  Phone, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
const webDesignerAsset = { url: '/images/web-designer.webp' };
const webDesignerPhoto = webDesignerAsset.url;
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const About = () => {
  const { t } = useTranslation();

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/contact-localwebpartners/30min' });
    }
  };

  const team = [
    {
      name: 'Jules Perrot',
      role: t('team', 'webDesigner'),
      description: t('team', 'julesDesc'),
      photo: webDesignerPhoto,
      phone: '+33 6 71 00 21 19',
      skills: [
        t('team', 'uiuxDesign'),
        t('team', 'webDevelopment'),
        t('team', 'responsiveDesign'),
        t('team', 'seoOptimization'),
        t('team', 'customerRelations'),
        t('team', 'projectFollowUp'),
      ],
      hasCalendly: true,
    },
  ];

  const values = [
    { icon: Heart, title: t('team', 'simplicity'), desc: t('team', 'simplicityDesc') },
    { icon: Zap, title: t('team', 'performance'), desc: t('team', 'performanceDesc') },
    { icon: Users, title: t('team', 'proximity'), desc: t('team', 'proximityDesc') },
  ];

  const process = [
    { step: 1, title: t('team', 'audit'), desc: t('team', 'auditDesc'), icon: ClipboardList },
    { step: 2, title: t('team', 'design'), desc: t('team', 'designDesc'), icon: Palette },
    { step: 3, title: t('team', 'development'), desc: t('team', 'developmentDesc'), icon: Code },
    { step: 4, title: t('team', 'delivery'), desc: t('team', 'deliveryDesc'), icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead 
        title="Équipe LocalWeb Partners - Experts Création Site Web"
        description="Rencontrez Jules Perrot, fondateur de LocalWeb Partners : design, développement, relation client et suivi de votre projet de site web."
        keywords="équipe agence web, web designer français, business developer, création site web"
        canonicalUrl="https://localwebpartners.fr/equipe"
      />
      <Navbar />
      
      {/* Hero */}
      <header className="pt-24 pb-16 md:pt-32 md:pb-20" style={{ background: 'hsl(var(--bg-dark))' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow">L'équipe</span>
            <h1 className="section-title animate-fade-in-up">{t('team', 'title')}</h1>
            <p className="section-subtitle animate-fade-in-up animation-delay-100">{t('team', 'subtitle')}</p>
          </div>
        </div>
      </header>

      {/* Team */}
      <main className="py-20" style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 max-w-xl mx-auto">
            {team.map((member, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                id={member.name.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                className="dark-card rounded-2xl p-8 text-center"
              >
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>{member.name}</h2>
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 mx-auto">
                  <img src={member.photo} alt={`${member.name} - ${member.role}`} className="w-full h-full object-cover" loading="lazy" width="96" height="96" />
                </div>
                <p className="text-lg font-semibold mb-1" style={{ color: 'hsl(var(--silver))' }}>{member.role}</p>
                <p className="font-medium mb-6" style={{ color: 'hsl(var(--accent-teal))' }}>{member.description}</p>
                <ul className="space-y-3 inline-block text-left mb-6">
                  {member.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-3" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
                      <CheckCircle style={{ color: 'hsl(var(--accent-teal))' }} size={18} aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="block mt-4">
                  <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 transition-colors" style={{ color: 'hsl(var(--silver) / 0.6)' }}>
                    <Phone size={16} style={{ color: 'hsl(var(--accent-teal))' }} aria-hidden="true" />
                    {member.phone}
                  </a>
                </div>
                {member.hasCalendly && (
                  <div className="mt-6">
                    <Button
                      onClick={openCalendlyPopup}
                      className="font-medium px-6 py-3 rounded-xl inline-flex items-center gap-2"
                      style={{ background: 'hsl(var(--accent-teal))', color: 'hsl(var(--bg-dark))' }}
                    >
                      <Calendar size={18} />
                      {t('team', 'bookAppointment')}
                    </Button>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

        </div>
      </main>

      {/* Values */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-20" style={{ background: 'hsl(var(--bg-dark))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }} aria-labelledby="values-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-eyebrow">Nos valeurs</span>
            <h2 id="values-heading" className="section-title">{t('team', 'ourValues')}</h2>
            <p className="section-subtitle">{t('team', 'valuesSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.article key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center dark-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                  <value.icon style={{ color: 'hsl(var(--accent-teal))' }} size={28} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>{value.title}</h3>
                <p style={{ color: 'hsl(var(--silver) / 0.5)' }}>{value.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-20" style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }} aria-labelledby="process-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-eyebrow">Processus</span>
            <h2 id="process-heading" className="section-title">{t('team', 'ourCreationProcess')}</h2>
            <p className="section-subtitle">{t('team', 'processSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.article key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300"
                    style={{ background: 'hsl(var(--accent-teal) / 0.15)', border: '1px solid hsl(0 0% 88% / 0.08)' }}>
                    <item.icon style={{ color: 'hsl(var(--accent-teal))' }} size={32} aria-hidden="true" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--bg-card))', border: '1px solid hsl(0 0% 88% / 0.08)' }}>
                    <span className="font-bold" style={{ color: 'hsl(var(--accent-teal))' }}>{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>{item.title}</h3>
                <p style={{ color: 'hsl(var(--silver) / 0.5)' }}>{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-20" style={{ background: 'hsl(var(--bg-dark))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }} aria-labelledby="cta-about-heading">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="section-eyebrow">Collaboration</span>
          <h2 id="cta-about-heading" className="section-title">{t('team', 'workTogether')}</h2>
          <p className="section-subtitle mb-8">{t('team', 'workTogetherDesc')}</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg">
            {t('team', 'contactUs')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;
