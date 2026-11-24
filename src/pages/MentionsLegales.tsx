import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="section-eyebrow">Juridique</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>
            Mentions Légales
          </h1>
          <p className="font-medium mb-8" style={{ color: 'hsl(var(--silver) / 0.6)' }}>LocalWeb Partners</p>
          <p className="text-sm mb-12" style={{ color: 'hsl(var(--silver) / 0.4)' }}>Dernière mise à jour : 24 novembre 2026</p>

          <div className="space-y-8 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Éditeur du site</h2>
              <p className="mb-3"><strong>Local Web Partners</strong> est une enseigne exploitée par un entrepreneur indépendant :</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Jules Perrot, web designer — SIRET : 10139190200018</li>
              </ul>
              <p>Contact : <a href="mailto:info.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">info.localwebpartners@gmail.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Hébergement</h2>
              <p className="mb-2">Le site est hébergé par <strong>Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">vercel.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Directeur de la publication</h2>
              <p>Jules Perrot, en tant qu'exploitant indépendant de l'enseigne Local Web Partners.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Activité</h2>
              <p>Local Web Partners propose des sites web personnalisés pour les professionnels locaux.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Données personnelles (RGPD)</h2>
              <p className="mb-3">Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), nous collectons et traitons vos données personnelles de manière sécurisée et limitée à la fourniture de nos services.</p>
              <p className="mb-3">Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux traitements de vos données. Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:info.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">info.localwebpartners@gmail.com</a>.
              </p>
              <p>Aucune donnée n'est transmise à des tiers sans votre consentement explicite. Consultez notre{' '}
                <Link to="/confidentialite" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">Politique de Confidentialité</Link>{' '}
                pour plus de détails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Propriété intellectuelle</h2>
              <p>L'ensemble du contenu du site (textes, graphismes, logos) est protégé par les lois françaises et européennes sur le droit d'auteur. Toute reproduction ou utilisation non autorisée est interdite.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>Litiges</h2>
              <p>Les litiges relèvent de la compétence exclusive des tribunaux de France.</p>
            </section>

            <div className="pt-8 mt-12" style={{ borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
              <p className="text-center font-semibold" style={{ color: 'hsl(var(--accent-teal))' }}>
                Local Web Partners — Solutions digitales pour les professionnels locaux
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
