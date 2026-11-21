import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CGU = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--bg-dark))' }}>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="section-eyebrow">Juridique</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'hsl(var(--silver))' }}>
            Conditions Générales d'Utilisation (CGU)
          </h1>
          <p className="font-medium mb-8" style={{ color: 'hsl(var(--silver) / 0.6)' }}>LocalWeb Partners</p>
          <p className="text-sm mb-12" style={{ color: 'hsl(var(--silver) / 0.4)' }}>Dernière mise à jour : 1er février 2026</p>

          <div className="space-y-8 leading-relaxed" style={{ color: 'hsl(var(--silver) / 0.7)' }}>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>1. Objet</h2>
              <p>Les présentes Conditions Générales d'Utilisation (CGU) définissent les conditions d'accès et d'utilisation du site web accessible à l'adresse localwebpartners.com (ci-après le "Site"), édité par LocalWeb Partners. Toute utilisation du Site implique l'acceptation pleine et entière des CGU.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>2. Éditeur du Site</h2>
              <div className="dark-card rounded-lg p-4 space-y-2">
                <p><strong>LocalWeb Partners</strong></p>
                <p>Contact : <a href="mailto:contact.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">contact.localwebpartners@gmail.com</a></p>
                <p>Web Designer : <a href="tel:+33671002119" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">+33 6 71 00 21 19</a></p>
                <p>Business Developer : <a href="tel:+33765279248" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">+33 7 65 27 92 48</a></p>
                <p>Instagram : <a href="https://www.instagram.com/localwebpartners" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">@localwebpartners</a></p>
              </div>
              <p className="mt-3">Le Site est hébergé par un prestataire tiers conforme RGPD.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>3. Accès au Site</h2>
              <p>Le Site est accessible gratuitement depuis tout terminal connecté à Internet. LocalWeb Partners se réserve le droit de suspendre ou modifier l'accès sans préavis pour maintenance ou raisons techniques.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>4. Utilisation du Site</h2>
              <p className="mb-3">L'utilisateur s'engage à utiliser le Site de manière licite et loyale. Sont interdits :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Toute reproduction non autorisée de contenu</li>
                <li>Insertion de liens hypertextes sans accord préalable</li>
                <li>Activités contraires à la loi française (RGPD, LCEN)</li>
              </ul>
              <p className="mt-3">Violation entraîne cessation d'accès immédiate.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>5. Propriété Intellectuelle</h2>
              <p>Tous contenus (textes, logos, visuels, sites portfolio) sont propriété exclusive de LocalWeb Partners ou licenciés. Toute reproduction sans autorisation écrite est interdite (art. L.335-2 CPI).</p>
              <p className="mt-3">Les sites portfolio présentés (lasicilienne.lovable.app, duckebarber.lovable.app, etc.) sont propriétés de leurs clients respectifs.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>6. Données Personnelles</h2>
              <p className="mb-3">Les données collectées via formulaires respectent RGPD :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Finalité :</strong> Gestion demandes devis/contact</li>
                <li><strong>Conservation :</strong> 3 ans max</li>
                <li><strong>Droits :</strong> Accès, rectification, suppression via <a href="mailto:contact.localwebpartners@gmail.com" style={{ color: 'hsl(var(--accent-teal))' }} className="hover:underline">contact.localwebpartners@gmail.com</a></li>
              </ul>
              <p className="mt-3">Politique de confidentialité dédiée disponible.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>7. Responsabilité</h2>
              <p className="mb-3">LocalWeb Partners décline responsabilité pour :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Interruption technique</li>
                <li>Contenus tiers (liens externes, portfolio clients)</li>
                <li>Dommages indirects (perte données, chiffre d'affaires)</li>
              </ul>
              <p className="mt-3">Le Site est fourni "tel quel" sans garantie de disponibilité 100%.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>8. Prestations Commerciales</h2>
              <p>Les services (sites vitrine, logos, e-commerce) font l'objet de devis personnalisés et contrats spécifiques. Les CGU ne constituent pas une offre commerciale.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>9. Cookies</h2>
              <p>Le Site utilise cookies essentiels (navigation) et analytiques (Google Analytics anonymisé). Refus possible via navigateur, impactant fonctionnalités.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>10. Liens hypertextes</h2>
              <p>Les liens vers sites tiers (Instagram, portfolio) sont informatifs. LocalWeb Partners n'endosse pas leur contenu/responsabilité.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>11. Modification des CGU</h2>
              <p>LocalWeb Partners peut modifier les CGU. La version en vigueur est publiée sur le Site. L'utilisateur est réputé les accepter lors de chaque visite.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--silver))' }}>12. Droit applicable</h2>
              <p>Droit français exclusif. Litiges : Tribunal judiciaire compétent (Nantes, siège social présumé). Médiation CNIL/FEVAD recommandée.</p>
            </section>

            <div className="pt-8 mt-12" style={{ borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
              <p className="text-center" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
                En accédant au Site, vous reconnaissez avoir lu et accepté ces CGU intégralement.
              </p>
              <p className="text-center font-semibold mt-4" style={{ color: 'hsl(var(--accent-teal))' }}>
                LocalWeb Partners - Solutions digitales pour entreprises locales
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGU;
