import { useState } from 'react';
import { Mail, Phone, Instagram, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';
const webDesignerAsset = { url: '/images/web-designer.webp' };
const webDesignerPhoto = webDesignerAsset.url;
import businessDevPhoto from '@/assets/business-developer.png';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    t('contact', 'showcaseSite'), t('contact', 'logoCreation'), t('contact', 'professionalBlog'),
    t('contact', 'interactivePortfolio'), t('contact', 'completeEcommerce'),
    t('contact', 'maintenanceServices'), t('contact', 'otherRequest'),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande de devis - ${formData.service}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nEntreprise: ${formData.company}\nService demandé: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:contact.localwebpartners@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const inputStyle = {
    background: 'hsl(var(--bg-dark))',
    border: '1px solid hsl(0 0% 88% / 0.1)',
    color: 'hsl(var(--silver))',
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <SEOHead 
        title="Contact LocalWeb Partners - Devis Gratuit Création Site Web"
        description="Contactez LocalWeb Partners pour un devis gratuit sous 24h. Création site web entreprise locale."
        keywords="contact agence web, devis site web gratuit"
        canonicalUrl="https://localwebpartners.fr/contact"
      />
      <Navbar />
      
      <header className="pt-24 pb-16 md:pt-32 md:pb-20" style={{ background: 'hsl(var(--bg-dark))' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow">Contact</span>
            <h1 className="section-title animate-fade-in-up">{t('contact', 'title')}</h1>
            <p className="section-subtitle animate-fade-in-up animation-delay-100">{t('contact', 'subtitle')}</p>
          </div>
        </div>
      </header>

      <main className="py-20" style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="dark-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'requestQuote')}</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                    <CheckCircle style={{ color: 'hsl(var(--accent-teal))' }} size={40} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'messageReady')}</h3>
                  <p style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('contact', 'emailClientOpen')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'fullName')}</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any} placeholder="Jean Dupont" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'email')}</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any} placeholder="jean@exemple.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'phone')}</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any} placeholder="06 12 34 56 78" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'company')}</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any} placeholder="Nom de votre entreprise" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'desiredService')}</label>
                    <select id="service" name="service" required value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any}>
                      <option value="">{t('contact', 'selectService')}</option>
                      {services.map((service, index) => (<option key={index} value={service}>{service}</option>))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--silver) / 0.7)' }}>{t('contact', 'yourMessage')}</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none" style={{ ...inputStyle, '--tw-ring-color': 'hsl(var(--accent-teal))' } as any}
                      placeholder={t('contact', 'messagePlaceholder')} />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send size={18} aria-hidden="true" />
                    {t('contact', 'requestFreeQuote')}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <aside className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'ourContact')}</h2>
                <p className="mb-8 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('contact', 'ourContactDesc')}</p>
              </div>

              <div className="space-y-6">
                <article className="dark-card rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--accent-teal) / 0.15)' }}>
                      <Mail style={{ color: 'hsl(var(--accent-teal))' }} size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'hsl(var(--silver))' }}>Email</h3>
                      <a href="mailto:contact.localwebpartners@gmail.com" className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                        contact.localwebpartners@gmail.com
                      </a>
                    </div>
                  </div>
                </article>

                <a href="/equipe#jules-perrot" className="block">
                  <article className="dark-card rounded-xl p-6 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <img src={webDesignerPhoto} alt="Jules Perrot" className="w-14 h-14 rounded-full object-cover" loading="lazy" width="56" height="56" />
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'webDesigner')}</h3>
                        <a href="tel:+33671002119" onClick={(e) => e.stopPropagation()} className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                          +33 6 71 00 21 19
                        </a>
                      </div>
                    </div>
                  </article>
                </a>

                <a href="/equipe#jean-samuel-chassany" className="block">
                  <article className="dark-card rounded-xl p-6 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <img src={businessDevPhoto} alt="Jean-Samuel Chassany" className="w-14 h-14 rounded-full object-cover" loading="lazy" width="56" height="56" />
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'businessDev')}</h3>
                        <a href="tel:+33765279248" onClick={(e) => e.stopPropagation()} className="transition-colors hover:text-[hsl(168,58%,45%)]" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                          +33 7 65 27 92 48
                        </a>
                      </div>
                    </div>
                  </article>
                </a>

                <a href="https://www.instagram.com/localwebpartners" target="_blank" rel="noopener noreferrer" className="block">
                  <article className="dark-card rounded-xl p-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Instagram className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: 'hsl(var(--silver))' }}>Instagram</h3>
                        <p className="text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>@localwebpartners</p>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="dark-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'hsl(var(--accent-teal))' }}></div>
                  <span className="font-semibold" style={{ color: 'hsl(var(--silver))' }}>{t('contact', 'fastResponse')}</span>
                </div>
                <p className="text-sm" style={{ color: 'hsl(var(--silver) / 0.5)' }}>{t('contact', 'fastResponseDesc')}</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
