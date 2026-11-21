import type { Language } from '@/lib/translations';

/** A text in the five site languages. */
export type L10n = Record<Language, string>;

export interface Offer {
  id: string;
  /** Price in euros, TTC. */
  price: number;
  /** Shown as "from" (à partir de) instead of a fixed price. */
  from?: boolean;
  name: L10n;
  tagline: L10n;
  features: L10n[];
  popular?: boolean;
}

const l = (fr: string, en: string, es: string, de: string, mt: string): L10n => ({ fr, en, es, de, mt });

/* ------------------------------------------------------------------ */
/* Offres (grille tarifaire 2026)                                      */
/* ------------------------------------------------------------------ */

export const VITRINE_OFFERS: Offer[] = [
  {
    id: 'vitrine-essentiel',
    price: 599,
    name: l('Essentiel', 'Essential', 'Esencial', 'Essenziell', 'Essenzjali'),
    tagline: l(
      'Pour exister en ligne rapidement et proprement.',
      'To get online quickly and cleanly.',
      'Para estar en línea de forma rápida y cuidada.',
      'Schnell und sauber online präsent sein.',
      'Biex tkun online malajr u b\'mod nadif.',
    ),
    features: [
      l('1 à 3 pages', '1 to 3 pages', '1 a 3 páginas', '1 bis 3 Seiten', '1 sa 3 paġni'),
      l('Design sur-mesure', 'Custom design', 'Diseño a medida', 'Individuelles Design', 'Disinn apposta'),
      l('Responsive mobile', 'Mobile responsive', 'Adaptado a móviles', 'Mobiloptimiert', 'Adattat għall-mobile'),
      l('Formulaire de contact', 'Contact form', 'Formulario de contacto', 'Kontaktformular', 'Formola ta\' kuntatt'),
      l('Optimisation SEO de base', 'Basic SEO optimisation', 'Optimización SEO básica', 'SEO-Grundoptimierung', 'Ottimizzazzjoni SEO bażika'),
    ],
  },
  {
    id: 'vitrine-pro',
    price: 799,
    popular: true,
    name: l('Pro', 'Pro', 'Pro', 'Pro', 'Pro'),
    tagline: l(
      'Pour attirer les clients du quartier sur Google.',
      'To bring local customers to you through Google.',
      'Para atraer a los clientes de tu zona desde Google.',
      'Damit Kunden aus der Umgebung Sie bei Google finden.',
      'Biex tattira klijenti tal-inħawi permezz ta\' Google.',
    ),
    features: [
      l('Jusqu\'à 6 pages', 'Up to 6 pages', 'Hasta 6 páginas', 'Bis zu 6 Seiten', 'Sa 6 paġni'),
      l('Tout l\'offre Essentiel', 'Everything in Essential', 'Todo lo de Esencial', 'Alles aus Essenziell', 'Kollox mill-offerta Essenzjali'),
      l('SEO local + fiche Google Business', 'Local SEO + Google Business profile', 'SEO local + ficha de Google Business', 'Lokales SEO + Google-Unternehmensprofil', 'SEO lokali + profil Google Business'),
      l('Prise de rendez-vous en ligne', 'Online booking', 'Reservas en línea', 'Online-Terminbuchung', 'Bookings online'),
      l('Animations cinématiques basiques', 'Basic cinematic animations', 'Animaciones cinematográficas básicas', 'Einfache filmische Animationen', 'Animazzjonijiet ċinematiċi bażiċi'),
      l('Audit général du site à la livraison', 'Full site audit at delivery', 'Auditoría completa del sitio en la entrega', 'Gesamtaudit der Website bei Übergabe', 'Verifika ġenerali tas-sit mal-kunsinna'),
    ],
  },
  {
    id: 'vitrine-premium',
    price: 1499,
    name: l('Premium', 'Premium', 'Premium', 'Premium', 'Premium'),
    tagline: l(
      'Pour une image haut de gamme qui marque.',
      'For a high-end image that stands out.',
      'Para una imagen de alta gama que deja huella.',
      'Für einen hochwertigen Auftritt, der im Gedächtnis bleibt.',
      'Għal immaġni ta\' livell għoli li tħalli impressjoni.',
    ),
    features: [
      l('Jusqu\'à 10 pages', 'Up to 10 pages', 'Hasta 10 páginas', 'Bis zu 10 Seiten', 'Sa 10 paġni'),
      l('Tout l\'offre Pro', 'Everything in Pro', 'Todo lo de Pro', 'Alles aus Pro', 'Kollox mill-offerta Pro'),
      l('Animations cinématiques au scroll', 'Cinematic scroll animations', 'Animaciones cinematográficas al desplazarse', 'Filmische Scroll-Animationen', 'Animazzjonijiet ċinematiċi mal-iscroll'),
      l('Blog SEO intégré', 'Built-in SEO blog', 'Blog SEO integrado', 'Integrierter SEO-Blog', 'Blog SEO integrat'),
      l('Site multilingue', 'Multilingual website', 'Sitio multilingüe', 'Mehrsprachige Website', 'Sit multilingwi'),
    ],
  },
];

export const ECOMMERCE_OFFER: Offer = {
  id: 'ecommerce',
  price: 1999,
  name: l('Site e-commerce', 'E-commerce website', 'Tienda online', 'Onlineshop', 'Sit e-commerce'),
  tagline: l('Vendez vos produits 24h/24.', 'Sell your products 24/7.', 'Vende tus productos 24 h al día.', 'Verkaufen Sie Ihre Produkte rund um die Uhr.', 'Biegħ il-prodotti tiegħek 24 siegħa kuljum.'),
  features: [
    l('Jusqu\'à 50 produits', 'Up to 50 products', 'Hasta 50 productos', 'Bis zu 50 Produkte', 'Sa 50 prodott'),
    l('Paiement sécurisé', 'Secure payment', 'Pago seguro', 'Sichere Zahlung', 'Ħlas sigur'),
    l('Gestion des stocks', 'Stock management', 'Gestión de stock', 'Lagerverwaltung', 'Ġestjoni tal-istokk'),
    l('Tableau de bord', 'Dashboard', 'Panel de control', 'Dashboard', 'Dashboard'),
    l('Emails de commande', 'Order emails', 'Correos de pedido', 'Bestell-E-Mails', 'Emails tal-ordnijiet'),
    l('Formation à la gestion', 'Management training', 'Formación en la gestión', 'Schulung zur Verwaltung', 'Taħriġ fil-ġestjoni'),
  ],
};

export const APPLICATION_OFFER: Offer = {
  id: 'application',
  price: 2999,
  from: true,
  name: l('Application', 'App', 'Aplicación', 'App', 'Applikazzjoni'),
  tagline: l('Web ou mobile, sur devis.', 'Web or mobile, quote-based.', 'Web o móvil, bajo presupuesto.', 'Web oder mobil, nach Angebot.', 'Web jew mobile, fuq kwotazzjoni.'),
  features: [
    l('Atelier de cadrage', 'Scoping workshop', 'Taller de definición', 'Konzept-Workshop', 'Workshop tal-ippjanar'),
    l('Maquettes UX/UI', 'UX/UI mockups', 'Maquetas UX/UI', 'UX/UI-Entwürfe', 'Mockups UX/UI'),
    l('Réservation, fidélité…', 'Booking, loyalty…', 'Reservas, fidelización…', 'Buchung, Kundenbindung…', 'Bookings, lealtà…'),
    l('Espace client', 'Customer area', 'Área de clientes', 'Kundenbereich', 'Żona tal-klijenti'),
    l('iOS, Android ou web', 'iOS, Android or web', 'iOS, Android o web', 'iOS, Android oder Web', 'iOS, Android jew web'),
    l('Publication sur les stores', 'App store publishing', 'Publicación en las tiendas', 'Veröffentlichung in den Stores', 'Pubblikazzjoni fl-istores'),
    l('Base de données incluse', 'Database included', 'Base de datos incluida', 'Datenbank inklusive', 'Database inkluża'),
  ],
};

export const LOGO_OFFERS: Offer[] = [
  {
    id: 'logo',
    price: 30,
    name: l('Création de logo', 'Logo design', 'Creación de logo', 'Logo-Design', 'Ħolqien ta\' logo'),
    tagline: l('Un logo simple et efficace.', 'A simple, effective logo.', 'Un logo sencillo y eficaz.', 'Ein einfaches, wirkungsvolles Logo.', 'Logo sempliċi u effettiv.'),
    features: [
      l('3 propositions', '3 proposals', '3 propuestas', '3 Entwürfe', '3 proposti'),
      l('2 allers-retours inclus', '2 rounds of revisions included', '2 rondas de cambios incluidas', '2 Korrekturschleifen inklusive', '2 reviżjonijiet inklużi'),
      l('Fichiers HD + vectoriels', 'HD + vector files', 'Archivos HD + vectoriales', 'HD- und Vektordateien', 'Fajls HD + vettorjali'),
      l('Déclinaisons couleurs', 'Colour variations', 'Variaciones de color', 'Farbvarianten', 'Varjazzjonijiet tal-kuluri'),
    ],
  },
  {
    id: 'identite-visuelle',
    price: 199,
    name: l('Identité visuelle complète', 'Full visual identity', 'Identidad visual completa', 'Komplette visuelle Identität', 'Identità viżwali sħiħa'),
    tagline: l('Une image de marque cohérente partout.', 'A consistent brand image everywhere.', 'Una imagen de marca coherente en todas partes.', 'Ein einheitliches Markenbild überall.', 'Immaġni tal-marka konsistenti kullimkien.'),
    features: [
      l('Logo complet', 'Complete logo', 'Logo completo', 'Komplettes Logo', 'Logo sħiħ'),
      l('Charte graphique', 'Brand guidelines', 'Guía de estilo', 'Styleguide', 'Linji gwida grafiċi'),
      l('Cartes de visite', 'Business cards', 'Tarjetas de visita', 'Visitenkarten', 'Business cards'),
      l('Kit réseaux sociaux', 'Social media kit', 'Kit para redes sociales', 'Social-Media-Kit', 'Kit għall-midja soċjali'),
    ],
  },
];

export const MAINTENANCE = {
  id: 'maintenance',
  pricePerMonth: 15,
  name: l('Maintenance & hébergement', 'Maintenance & hosting', 'Mantenimiento y alojamiento', 'Wartung & Hosting', 'Manutenzjoni u hosting'),
  tagline: l(
    'Votre site reste rapide, sécurisé et à jour, sans y penser.',
    'Your site stays fast, secure and up to date, without you thinking about it.',
    'Tu sitio sigue rápido, seguro y actualizado, sin que tengas que pensar en ello.',
    'Ihre Website bleibt schnell, sicher und aktuell, ohne dass Sie daran denken müssen.',
    'Is-sit tiegħek jibqa\' mgħaġġel, sigur u aġġornat, mingħajr ma taħseb fih.',
  ),
  features: [
    l('Hébergement', 'Hosting', 'Alojamiento', 'Hosting', 'Hosting'),
    l('Nom de domaine', 'Domain name', 'Nombre de dominio', 'Domainname', 'Isem tad-dominju'),
    l('Mises à jour régulières', 'Regular updates', 'Actualizaciones periódicas', 'Regelmäßige Updates', 'Aġġornamenti regolari'),
    l('Sauvegardes', 'Backups', 'Copias de seguridad', 'Backups', 'Backups'),
    l('Support technique', 'Technical support', 'Soporte técnico', 'Technischer Support', 'Appoġġ tekniku'),
    l('Petites modifications', 'Small changes', 'Pequeñas modificaciones', 'Kleine Änderungen', 'Bidliet żgħar'),
  ],
};

/* ------------------------------------------------------------------ */
/* Textes de la page                                                   */
/* ------------------------------------------------------------------ */

export const PRICING_UI = {
  eyebrow: l('Nos offres', 'Our offers', 'Nuestras ofertas', 'Unsere Angebote', 'L-offerti tagħna'),
  heroTitle: l(
    'Des prix clairs, pour des sites qui font venir des clients.',
    'Clear prices, for websites that bring in customers.',
    'Precios claros, para sitios que atraen clientes.',
    'Klare Preise für Websites, die Kunden bringen.',
    'Prezzijiet ċari, għal siti li jġibu l-klijenti.',
  ),
  heroSubtitle: l(
    'Design sur-mesure, pensé mobile et optimisé pour le référencement local. Chaque projet commence par un appel gratuit de 30 minutes pour cadrer vos besoins.',
    'Custom design, mobile-first and optimised for local search. Every project starts with a free 30-minute call to scope your needs.',
    'Diseño a medida, pensado para móviles y optimizado para el posicionamiento local. Cada proyecto empieza con una llamada gratuita de 30 minutos para definir tus necesidades.',
    'Individuelles Design, mobil gedacht und für die lokale Suche optimiert. Jedes Projekt beginnt mit einem kostenlosen 30-minütigen Gespräch, um Ihren Bedarf zu klären.',
    'Disinn apposta, maħsub għall-mobile u ottimizzat għat-tfittxija lokali. Kull proġett jibda b\'sejħa b\'xejn ta\' 30 minuta biex nifhmu l-ħtiġijiet tiegħek.',
  ),
  sectionVitrine: l('Site vitrine', 'Showcase website', 'Sitio web corporativo', 'Unternehmenswebsite', 'Sit ta\' preżentazzjoni'),
  sectionShop: l('Boutique en ligne & application', 'Online shop & app', 'Tienda online y aplicación', 'Onlineshop & App', 'Ħanut online u applikazzjoni'),
  sectionLogo: l('Logo & identité visuelle', 'Logo & visual identity', 'Logo e identidad visual', 'Logo & visuelle Identität', 'Logo u identità viżwali'),
  sectionMaintenance: l('Maintenance & hébergement', 'Maintenance & hosting', 'Mantenimiento y alojamiento', 'Wartung & Hosting', 'Manutenzjoni u hosting'),
  sectionEstimator: l('Estimez votre projet', 'Estimate your project', 'Calcula tu proyecto', 'Ihr Projekt kalkulieren', 'Ikkalkula l-proġett tiegħek'),
  sectionProcess: l('Comment ça se passe', 'How it works', 'Cómo funciona', 'So läuft es ab', 'Kif jaħdem'),
  popular: l('Le plus choisi', 'Most popular', 'El más elegido', 'Am beliebtesten', 'L-iktar magħżul'),
  ttc: l('TTC', 'incl. VAT', 'IVA incl.', 'inkl. MwSt.', 'VAT inkluża'),
  perMonth: l('/ mois', '/ month', '/ mes', '/ Monat', '/ xahar'),
  from: l('À partir de', 'From', 'Desde', 'Ab', 'Minn'),
  choose: l('Estimer avec cette offre', 'Estimate with this offer', 'Calcular con esta oferta', 'Mit diesem Angebot kalkulieren', 'Ikkalkula b\'din l-offerta'),
  optional: l('Facultatif', 'Optional', 'Opcional', 'Optional', 'Fakultattiv'),
  optionalNote: l(
    'La maintenance et l\'hébergement mensuels ne sont pas obligatoires : vous pouvez gérer votre site vous-même ou le confier au prestataire de votre choix. Sans engagement de durée.',
    'Monthly maintenance and hosting are not mandatory: you can manage your website yourself or entrust it to the provider of your choice. No minimum term.',
    'El mantenimiento y el alojamiento mensuales no son obligatorios: puedes gestionar tu sitio tú mismo o confiarlo al proveedor que prefieras. Sin permanencia.',
    'Monatliche Wartung und Hosting sind nicht verpflichtend: Sie können Ihre Website selbst betreuen oder einem Anbieter Ihrer Wahl anvertrauen. Ohne Mindestlaufzeit.',
    'Il-manutenzjoni u l-hosting kull xahar mhumiex obbligatorji: tista\' tieħu ħsieb is-sit int stess jew tafdah lil fornitur tal-għażla tiegħek. Mingħajr impenn.',
  ),
  estimatorSubtitle: l(
    'Composez votre projet et voyez le prix s\'ajuster en direct.',
    'Build your project and watch the price update live.',
    'Arma tu proyecto y mira cómo se ajusta el precio en directo.',
    'Stellen Sie Ihr Projekt zusammen und sehen Sie den Preis live.',
    'Ibni l-proġett tiegħek u ara l-prezz jinbidel live.',
  ),
  stepProject: l('1. Votre site ou application', '1. Your website or app', '1. Tu sitio o aplicación', '1. Ihre Website oder App', '1. Is-sit jew l-applikazzjoni tiegħek'),
  stepBrand: l('2. Votre logo', '2. Your logo', '2. Tu logo', '2. Ihr Logo', '2. Il-logo tiegħek'),
  stepCare: l('3. Maintenance & hébergement', '3. Maintenance & hosting', '3. Mantenimiento y alojamiento', '3. Wartung & Hosting', '3. Manutenzjoni u hosting'),
  none: l('Aucun', 'None', 'Ninguno', 'Keins', 'Xejn'),
  noneProject: l('Pas de site pour l\'instant', 'No website for now', 'Sin sitio por ahora', 'Vorerst keine Website', 'L-ebda sit għalissa'),
  haveLogo: l('J\'ai déjà un logo', 'I already have a logo', 'Ya tengo un logo', 'Ich habe bereits ein Logo', 'Diġà għandi logo'),
  careOn: l('Oui, je veux être tranquille', 'Yes, I want peace of mind', 'Sí, quiero estar tranquilo', 'Ja, ich will mich um nichts kümmern', 'Iva, irrid inkun kwiet'),
  careOff: l('Non merci, je gère moi-même', 'No thanks, I\'ll handle it', 'No, gracias, lo gestiono yo', 'Nein danke, ich kümmere mich selbst', 'Le grazzi, nieħu ħsiebu jien'),
  summary: l('Votre estimation', 'Your estimate', 'Tu estimación', 'Ihre Schätzung', 'L-istima tiegħek'),
  oneOff: l('À la création', 'One-off', 'Pago único', 'Einmalig', 'Darba biss'),
  monthly: l('Ensuite, par mois', 'Then, per month', 'Después, al mes', 'Danach, pro Monat', 'Imbagħad, kull xahar'),
  deposit: l('dont acompte de 40 % à la signature', 'incl. 40% deposit on signing', 'incl. anticipo del 40 % a la firma', 'davon 40 % Anzahlung bei Unterzeichnung', 'inkluż depożitu ta\' 40 % mal-firma'),
  fromNote: l(
    'Prix de départ : l\'application est chiffrée précisément après l\'atelier de cadrage.',
    'Starting price: the app is priced precisely after the scoping workshop.',
    'Precio de partida: la aplicación se presupuesta con precisión tras el taller de definición.',
    'Einstiegspreis: Die App wird nach dem Konzept-Workshop genau kalkuliert.',
    'Prezz tal-bidu: l-applikazzjoni tiġi pprezzata b\'mod preċiż wara l-workshop.',
  ),
  emptyNote: l('Choisissez au moins un élément pour voir votre estimation.', 'Pick at least one item to see your estimate.', 'Elige al menos un elemento para ver tu estimación.', 'Wählen Sie mindestens ein Element für Ihre Schätzung.', 'Agħżel mill-inqas element wieħed biex tara l-istima.'),
  book: l('Réserver mon appel gratuit', 'Book my free call', 'Reservar mi llamada gratuita', 'Kostenloses Gespräch buchen', 'Ibbukkja s-sejħa b\'xejn'),
  quote: l('Demander un devis', 'Request a quote', 'Pedir presupuesto', 'Angebot anfordern', 'Itlob kwotazzjoni'),
  legal: l(
    'Tous les prix sont indiqués TTC · Devis gratuit, réponse sous 24 h · Acompte de 40 % à la signature, solde à la livraison.',
    'All prices include VAT · Free quote, reply within 24 h · 40% deposit on signing, balance on delivery.',
    'Todos los precios incluyen IVA · Presupuesto gratuito, respuesta en 24 h · Anticipo del 40 % a la firma, resto a la entrega.',
    'Alle Preise inkl. MwSt. · Kostenloses Angebot, Antwort innerhalb von 24 Std. · 40 % Anzahlung bei Unterzeichnung, Rest bei Übergabe.',
    'Il-prezzijiet kollha jinkludu l-VAT · Kwotazzjoni b\'xejn, tweġiba fi 24 siegħa · Depożitu ta\' 40 % mal-firma, il-bqija mal-kunsinna.',
  ),
  ctaTitle: l('Un projet ? Parlons-en.', 'Got a project? Let\'s talk.', '¿Tienes un proyecto? Hablemos.', 'Ein Projekt? Lassen Sie uns sprechen.', 'Għandek proġett? Ejja nitkellmu.'),
};

export const PROCESS_STEPS: { title: L10n; desc: L10n }[] = [
  {
    title: l('Premier rendez-vous', 'First meeting', 'Primera cita', 'Erstes Gespräch', 'L-ewwel laqgħa'),
    desc: l('On échange sur votre activité, vos objectifs et vos envies.', 'We talk about your business, your goals and what you want.', 'Hablamos de tu actividad, tus objetivos y tus ideas.', 'Wir sprechen über Ihr Unternehmen, Ihre Ziele und Wünsche.', 'Nitkellmu dwar in-negozju, l-għanijiet u x\'tixtieq.'),
  },
  {
    title: l('Présentation de la maquette et du devis', 'Mockup and quote', 'Presentación de la maqueta y del presupuesto', 'Entwurf und Angebot', 'Preżentazzjoni tal-mockup u l-kwotazzjoni'),
    desc: l('Vous découvrez la maquette de votre projet et un devis clair, sans surprise.', 'You see the mockup of your project and a clear quote, with no surprises.', 'Descubres la maqueta de tu proyecto y un presupuesto claro, sin sorpresas.', 'Sie sehen den Entwurf Ihres Projekts und ein klares Angebot ohne Überraschungen.', 'Tara l-mockup tal-proġett u kwotazzjoni ċara, mingħajr sorpriżi.'),
  },
  {
    title: l('Signature du contrat', 'Contract signing', 'Firma del contrato', 'Vertragsunterzeichnung', 'Iffirmar tal-kuntratt'),
    desc: l('On valide ensemble le cadre du projet avant de lancer la création.', 'We agree on the project scope together before starting.', 'Validamos juntos el alcance del proyecto antes de empezar.', 'Wir legen gemeinsam den Rahmen fest, bevor wir starten.', 'Naqblu flimkien fuq il-proġett qabel nibdew.'),
  },
  {
    title: l('Création & feedbacks réguliers', 'Build & regular feedback', 'Creación y feedback regular', 'Umsetzung & regelmäßiges Feedback', 'Ħolqien u feedback regolari'),
    desc: l('Des points réguliers pour que le résultat corresponde parfaitement à vos attentes.', 'Regular check-ins so the result matches exactly what you expect.', 'Puntos regulares para que el resultado se ajuste a lo que esperas.', 'Regelmäßige Abstimmungen, damit das Ergebnis genau Ihren Erwartungen entspricht.', 'Laqgħat regolari biex ir-riżultat ikun eżatt kif tistenna.'),
  },
  {
    title: l('Mise en ligne', 'Go live', 'Puesta en línea', 'Livegang', 'Tnedija online'),
    desc: l('Votre site est en ligne, prêt à accueillir vos clients.', 'Your website is live, ready to welcome your customers.', 'Tu sitio está en línea, listo para recibir a tus clientes.', 'Ihre Website ist online und bereit für Ihre Kunden.', 'Is-sit tiegħek huwa online, lest għall-klijenti.'),
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const LOCALES: Record<Language, string> = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES', de: 'de-DE', mt: 'en-MT' };

export function formatEuro(value: number, lang: Language): string {
  return new Intl.NumberFormat(LOCALES[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

export const tr = (text: L10n, lang: Language) => text[lang] || text.fr;

/** Every one-off offer the estimator can pick as "the project". */
export const PROJECT_OFFERS: Offer[] = [...VITRINE_OFFERS, ECOMMERCE_OFFER, APPLICATION_OFFER];

/** Lowest price per category, for cards and the home carousel. */
export const STARTING_PRICES = {
  vitrine: VITRINE_OFFERS[0].price,
  ecommerce: ECOMMERCE_OFFER.price,
  application: APPLICATION_OFFER.price,
  logo: LOGO_OFFERS[0].price,
};
