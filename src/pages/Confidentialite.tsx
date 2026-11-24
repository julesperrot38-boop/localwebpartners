import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Confidentialite = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="section-eyebrow">Juridique</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>
            Politique de Confidentialité
          </h1>
          <p className="font-medium mb-8" style={{ color: 'hsl(var(--silver) / 0.6)' }}>LocalWeb Partners</p>
          <p className="text-sm mb-12" style={{ color: 'hsl(var(--silver) / 0.4)' }}>Dernière mise à jour : 1er février 2026</p>

          <p className="leading-relaxed mb-8" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
            Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679) et à la Loi Informatique et Libertés modifiée, LocalWeb Partners s'engage à protéger vos données personnelles.
          </p>

          <div className="space-y-8 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>1. Responsable du traitement</h2>
              <div className="dark-card rounded-lg p-4 space-y-2">
                <p><strong>LocalWeb Partners</strong></p>
                <p>Contact : <a href="mailto:contact.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">contact.localwebpartners@gmail.com</a></p>
                <p>Web Designer : <a href="tel:+33671002119" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">+33 6 71 00 21 19</a></p>
                <p>Instagram : <a href="https://www.instagram.com/localwebpartners" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">@localwebpartners</a></p>
              </div>
              <p className="mt-3">Délégué à la Protection des Données (DPO) : <a href="mailto:contact.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">contact.localwebpartners@gmail.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>2. Données collectées</h2>
              <p className="mb-3">Nous collectons uniquement les données nécessaires :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Formulaire contact :</strong> Nom, prénom, email, téléphone, entreprise, message</li>
                <li><strong>Cookies :</strong> Navigation anonymisée (Google Analytics)</li>
                <li><strong>Portfolio :</strong> Aucun traitement (liens externes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>3. Finalités du traitement</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Répondre à vos demandes de contact et devis</li>
                <li>Améliorer nos services et l'expérience utilisateur</li>
                <li>Analyse statistique anonymisée du trafic</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>4. Durée de conservation</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Formulaires :</strong> 3 ans maximum à compter de dernière interaction</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
              <p className="mt-3">Suppression automatique ou sur demande.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>5. Destinataires des données</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Équipe interne LocalWeb Partners (web designer, business developer)</li>
                <li>Hébergeur tiers (Lovable/Supabase) sous contrat DPA RGPD</li>
              </ul>
              <p className="mt-3 font-medium">Aucun transfert hors UE.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>6. Vos droits RGPD</h2>
              <p className="mb-3">
                Exercez vos droits (accès, rectification, opposition, portabilité, oubli) via{' '}
                <a href="mailto:contact.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">contact.localwebpartners@gmail.com</a> :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Réponse sous 1 mois (prolongeable 2 mois)</li>
                <li>Preuve identité requise</li>
                <li>Réclamation CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">www.cnil.fr</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>7. Cookies et traceurs</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Cookies essentiels (navigation) :</strong> Automatiques, non désactivables</li>
                <li><strong>Cookies analytiques (Google Analytics anonymisé) :</strong> Consentement via bannière</li>
                <li><strong>Refus :</strong> Paramètres navigateur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>8. Sécurité des données</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chiffrement HTTPS/TLS</li>
                <li>Sauvegardes sécurisées</li>
                <li>Accès restreint (double authentification)</li>
                <li>Audit annuel sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>9. Sites tiers (Portfolio)</h2>
              <p className="mb-3">Les sites présentés restent notre propriété :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>lasicilienne.lovable.app</li>
                <li>duckebarber.lovable.app</li>
                <li>fitnesssquad.lovable.app</li>
                <li>eclipsee.lovable.app</li>
              </ul>
              <p className="mt-3">LocalWeb Partners n'est pas responsable de leurs politiques de confidentialité.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>10. Mineurs</h2>
              <p>Le Site n'est pas destiné aux moins de 15 ans. Aucune donnée intentionnellement collectée.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>11. Modification</h2>
              <p>Nous pouvons mettre à jour cette politique. Version en vigueur publiée sur le site.</p>
            </section>

            <div className="pt-8 mt-12" style={{ borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
              <p className="text-center" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                LocalWeb Partners protège vos données comme ses propres codes sources. 🔒
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confidentialite;
