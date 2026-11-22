import type { L10n } from '@/lib/pricing';
import { COUNTRY_SHAPES } from './worldMapData';

const l = (fr: string, en: string, es: string, de: string, mt: string): L10n => ({ fr, en, es, de, mt });

export interface Place {
  id: keyof typeof COUNTRY_SHAPES;
  flag: string;
  name: L10n;
  blurb: L10n;
  /** IANA time zone used for the live local clock. */
  timeZone: string;
  /** Width of the map (in map units) the camera shows when it lands here, on a wide screen. */
  zoom: number;
  photo: string;
  photoPlace: string;
  photoAlt: L10n;
}

/* Ordered as a route: France → Malte → Maurice → Indonésie. */
export const PLACES: Place[] = [
  {
    id: 'france',
    flag: '🇫🇷',
    name: l('France', 'France', 'Francia', 'Frankreich', 'Franza'),
    blurb: l(
      'Notre base, à Nantes. Des sites pour les commerçants, artisans et indépendants partout en France.',
      'Our home base, in Nantes. Websites for shops, craftspeople and freelancers all over France.',
      'Nuestra base, en Nantes. Sitios para comercios, artesanos e independientes en toda Francia.',
      'Unser Standort in Nantes. Websites für Händler, Handwerker und Selbstständige in ganz Frankreich.',
      'Il-bażi tagħna, f\'Nantes. Siti għal ħwienet, artiġjani u indipendenti madwar Franza kollha.',
    ),
    timeZone: 'Europe/Paris',
    zoom: 120,
    photo: '/images/places/france.webp',
    photoPlace: 'Paris',
    photoAlt: l('La tour Eiffel au coucher du soleil, Paris.', 'The Eiffel Tower at sunset, Paris.', 'La torre Eiffel al atardecer, París.', 'Der Eiffelturm bei Sonnenuntergang, Paris.', 'It-Torri Eiffel fil-nżul ix-xemx, Pariġi.'),
  },
  {
    id: 'malta',
    flag: '🇲🇹',
    name: l('Malte', 'Malta', 'Malta', 'Malta', 'Malta'),
    blurb: l(
      'Des sites bilingues pour les entreprises de l\'île, pensés pour les clients locaux comme pour les visiteurs.',
      'Bilingual websites for island businesses, built for locals and visitors alike.',
      'Sitios bilingües para las empresas de la isla, pensados para clientes locales y visitantes.',
      'Zweisprachige Websites für Unternehmen der Insel, für Einheimische wie für Besucher.',
      'Siti bilingwi għan-negozji tal-gżira, maħsuba kemm għall-klijenti lokali kif ukoll għall-viżitaturi.',
    ),
    timeZone: 'Europe/Malta',
    zoom: 16,
    photo: '/images/places/malta.webp',
    photoPlace: 'La Valette',
    photoAlt: l('La Valette vue depuis Senglea, Malte.', 'Valletta seen from Senglea, Malta.', 'La Valeta vista desde Senglea, Malta.', 'Valletta von Senglea aus gesehen, Malta.', 'Il-Belt Valletta minn L-Isla, Malta.'),
  },
  {
    id: 'mauritius',
    flag: '🇲🇺',
    name: l('Île Maurice', 'Mauritius', 'Mauricio', 'Mauritius', 'Mawrizju'),
    blurb: l(
      'Des sites en français et en anglais pour les entreprises mauriciennes, du commerce local au tourisme.',
      'French and English websites for Mauritian businesses, from local shops to tourism.',
      'Sitios en francés e inglés para empresas mauricianas, del comercio local al turismo.',
      'Websites auf Französisch und Englisch für mauritische Unternehmen, vom Laden bis zum Tourismus.',
      'Siti bil-Franċiż u bl-Ingliż għan-negozji Mawrizjani, mill-ħwienet lokali sat-turiżmu.',
    ),
    timeZone: 'Indian/Mauritius',
    zoom: 18,
    photo: '/images/places/mauritius.webp',
    photoPlace: 'Le Morne Brabant',
    photoAlt: l('Le Morne Brabant vu depuis l\'océan, île Maurice.', 'Le Morne Brabant seen from the ocean, Mauritius.', 'Le Morne Brabant visto desde el océano, Mauricio.', 'Le Morne Brabant vom Ozean aus, Mauritius.', 'Le Morne Brabant mill-oċean, Mawrizju.'),
  },
  {
    id: 'indonesia',
    flag: '🇮🇩',
    name: l('Indonésie', 'Indonesia', 'Indonesia', 'Indonesien', 'Indoneżja'),
    blurb: l(
      'Des sites sur-mesure pour les entreprises locales de l\'archipel, rapides même sur mobile.',
      'Custom websites for local businesses across the archipelago, fast even on mobile.',
      'Sitios a medida para empresas locales del archipiélago, rápidos incluso en el móvil.',
      'Individuelle Websites für lokale Unternehmen im Archipel, schnell auch auf dem Handy.',
      'Siti apposta għan-negozji lokali tal-arċipelagu, mgħaġġla anki fuq il-mobile.',
    ),
    timeZone: 'Asia/Makassar',
    zoom: 260,
    photo: '/images/places/indonesia.webp',
    photoPlace: 'Tanah Lot, Bali',
    photoAlt: l('Le temple de Tanah Lot au coucher du soleil, Bali.', 'Tanah Lot temple at sunset, Bali.', 'El templo de Tanah Lot al atardecer, Bali.', 'Der Tempel Tanah Lot bei Sonnenuntergang, Bali.', 'It-tempju ta\' Tanah Lot fil-nżul ix-xemx, Bali.'),
  },
];

export const WORLD_TEXT = {
  kicker: l('Où nous travaillons', 'Where we work', 'Dónde trabajamos', 'Wo wir arbeiten', 'Fejn naħdmu'),
  title: l('Un studio, quatre horizons.', 'One studio, four horizons.', 'Un estudio, cuatro horizontes.', 'Ein Studio, vier Horizonte.', 'Studio wieħed, erba\' orizzonti.'),
  intro: l(
    'De Nantes à Bali, nous créons des sites pour les entreprises locales. Faites défiler pour voyager avec nous.',
    'From Nantes to Bali, we build websites for local businesses. Scroll to travel with us.',
    'De Nantes a Bali, creamos sitios para empresas locales. Desplázate para viajar con nosotros.',
    'Von Nantes bis Bali gestalten wir Websites für lokale Unternehmen. Scrollen Sie und reisen Sie mit.',
    'Minn Nantes sa Bali, nibnu siti għan-negozji lokali. Agħmel scroll u ivvjaġġa magħna.',
  ),
  localTime: l('Heure locale', 'Local time', 'Hora local', 'Ortszeit', 'Ħin lokali'),
  cta: l('Lancer un projet ici', 'Start a project here', 'Empezar un proyecto aquí', 'Hier ein Projekt starten', 'Ibda proġett hawn'),
  places: l('Nos destinations', 'Our locations', 'Nuestros destinos', 'Unsere Standorte', 'Il-postijiet tagħna'),
  scroll: l('Défiler', 'Scroll', 'Desplazar', 'Scrollen', 'Scroll'),
};
