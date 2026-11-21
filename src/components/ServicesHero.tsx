import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WarpCarousel, type WarpCard } from "@/components/ui/warp-carousel";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/translations";
import { tr, type L10n } from "@/lib/pricing";

const TEAL = "#30b59b";
const NUMERAL: [string, string] = ["#30b59b", "#a6f2e2"];
const l = (fr: string, en: string, es: string, de: string, mt: string): L10n => ({ fr, en, es, de, mt });

/* ------------------------------------------------------------------ */
/* Textes                                                              */
/* ------------------------------------------------------------------ */

/** Title on three lines; the line ending with "." gets a teal full stop. */
const TITLE: Record<Language, [string, string, string]> = {
  fr: ["Agence", "de Web.", "Design"],
  en: ["Web", "Design.", "Agency"],
  es: ["Agencia", "de Diseño.", "Web"],
  de: ["Agentur", "für Web.", "Design"],
  mt: ["Aġenzija", "tal-Web.", "Design"],
};

const TEXT = {
  tagline: l(
    "Sites vitrines, boutiques en ligne, applications et identités visuelles sur-mesure pour les entreprises locales. Conçus pour être beaux, rapides et trouvés sur Google.",
    "Custom showcase websites, online shops, apps and visual identities for local businesses. Built to look great, load fast and get found on Google.",
    "Sitios web, tiendas online, aplicaciones e identidades visuales a medida para negocios locales. Diseñados para ser bonitos, rápidos y aparecer en Google.",
    "Individuelle Websites, Onlineshops, Apps und visuelle Identitäten für lokale Unternehmen. Schön, schnell und bei Google gut auffindbar.",
    "Siti, ħwienet online, applikazzjonijiet u identitajiet viżwali apposta għan-negozji lokali. Sbieħ, mgħaġġla u jinstabu fuq Google.",
  ),
  cta: l("Devis gratuit", "Free quote", "Presupuesto gratis", "Kostenloses Angebot", "Kwotazzjoni b'xejn"),
  work: l("Nos réalisations", "Our work", "Nuestros trabajos", "Unsere Projekte", "Ix-xogħol tagħna"),
  delayLabel: l("Délai", "Delivery", "Plazo", "Lieferzeit", "Żmien"),
  delayValue: l("5 jours à 6 semaines", "5 days to 6 weeks", "5 días a 6 semanas", "5 Tage bis 6 Wochen", "5 ijiem sa 6 ġimgħat"),
  quoteLabel: l("Devis", "Quote", "Presupuesto", "Angebot", "Kwotazzjoni"),
  quoteValue: l("Sous 24 h", "Within 24 h", "En 24 h", "Innerhalb von 24 Std.", "Fi 24 siegħa"),
  carousel: l("Nos prestations", "Our services", "Nuestros servicios", "Unsere Leistungen", "Is-servizzi tagħna"),
  avgDelivery: l("Délai moyen de livraison", "Average delivery time", "Plazo medio de entrega", "Durchschnittliche Lieferzeit", "Żmien medju ta' kunsinna"),
  days: l("jours", "days", "días", "Tage", "ijiem"),
  weeks: l("semaines", "weeks", "semanas", "Wochen", "ġimgħat"),
};

interface Slide {
  id: string;
  name: L10n;
  subtitle: L10n;
  value: string;
  unit: "days" | "weeks";
  image: string;
  alt: L10n;
}

/* Une carte par prestation, avec le délai moyen de livraison. */
const SLIDES: Slide[] = [
  {
    id: "site-vitrine",
    name: l("Site vitrine", "Showcase website", "Sitio web", "Website", "Sit web"),
    subtitle: l("1 à 10 pages", "1 to 10 pages", "1 a 10 páginas", "1 bis 10 Seiten", "1 sa 10 paġni"),
    value: "7",
    unit: "days",
    image: "/images/hero/vitrine.webp",
    alt: l(
      "Site vitrine d'un barbier affiché sur un ordinateur portable.",
      "A barbershop showcase website on a laptop.",
      "Sitio web de una barbería en un portátil.",
      "Website eines Barbershops auf einem Laptop.",
      "Sit ta' barbier fuq laptop.",
    ),
  },
  {
    id: "ecommerce",
    name: l("E-commerce", "E-commerce", "E-commerce", "E-Commerce", "E-commerce"),
    subtitle: l("boutique en ligne", "online shop", "tienda online", "Onlineshop", "ħanut online"),
    value: "21",
    unit: "days",
    image: "/images/hero/ecommerce.webp",
    alt: l(
      "Sacs de shopping turquoise et noirs sur fond sombre.",
      "Teal and black shopping bags on a dark background.",
      "Bolsas de compra turquesa y negras sobre fondo oscuro.",
      "Türkise und schwarze Einkaufstüten auf dunklem Hintergrund.",
      "Basktijiet tax-xiri turkważ u suwed fuq sfond skur.",
    ),
  },
  {
    id: "application",
    name: l("Application", "App", "Aplicación", "App", "Applikazzjoni"),
    subtitle: l("web ou mobile", "web or mobile", "web o móvil", "Web oder mobil", "web jew mobile"),
    value: "6",
    unit: "weeks",
    image: "/images/hero/application.webp",
    alt: l(
      "Main tenant un smartphone qui affiche une application.",
      "A hand holding a smartphone showing an app.",
      "Una mano sujeta un smartphone con una aplicación.",
      "Eine Hand hält ein Smartphone mit einer App.",
      "Id iżżomm smartphone b'applikazzjoni.",
    ),
  },
  {
    id: "creation-logo",
    name: l("Identité visuelle", "Visual identity", "Identidad visual", "Visuelle Identität", "Identità viżwali"),
    subtitle: l("logo & charte", "logo & guidelines", "logo y guía de estilo", "Logo & Styleguide", "logo u linji gwida"),
    value: "5",
    unit: "days",
    image: "/images/hero/identite.webp",
    alt: l(
      "Identité visuelle turquoise sur cartes de visite et papeterie.",
      "Teal visual identity on business cards and stationery.",
      "Identidad visual turquesa en tarjetas y papelería.",
      "Türkise Markenidentität auf Visitenkarten und Briefpapier.",
      "Identità viżwali turkważ fuq business cards u kartoleria.",
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* Soft fade on every side so the 3D ring melts into the page instead of sitting in a box. */
const EDGE_FADE =
  "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)";

const ServicesHero = () => {
  const { language } = useTranslation();
  const [active, setActive] = useState(0);
  const slide = SLIDES[active] ?? SLIDES[0];
  const title = TITLE[language] ?? TITLE.fr;

  const cards: WarpCard[] = useMemo(
    () =>
      SLIDES.map((s) => ({
        title: `${tr(s.name, language)}\n${tr(s.subtitle, language)}`,
        value: s.value,
        unit: tr(TEXT[s.unit], language),
        footer: tr(TEXT.avgDelivery, language),
        image: s.image,
        alt: tr(s.alt, language),
        numeral: NUMERAL,
        glow: TEAL,
      })),
    [language],
  );

  return (
    <section id="accueil" className="relative overflow-hidden" style={{ background: "hsl(var(--bg-dark))" }} aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 z-20 h-[2px]" style={{ background: "hsl(var(--accent-teal))" }} />

      <div className="container relative mx-auto grid min-h-[100svh] grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 pb-12 pt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6 lg:px-8 lg:pt-20">
        {/* Texte */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="relative z-10">
          <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.25em]" style={{ color: "hsl(var(--accent-teal))" }}>
            LocalWeb_Partners
          </p>
          <h1
            id="hero-title"
            className="font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
            style={{ color: "hsl(var(--silver))", fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            {title.map((line, i) => (
              <span key={i} className="block">
                {line.endsWith(".") ? (
                  <>
                    {line.slice(0, -1)}
                    <span style={{ color: "hsl(var(--accent-teal))" }}>.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed md:text-lg" style={{ color: "hsl(var(--silver) / 0.72)" }}>
            {tr(TEXT.tagline, language)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              to="/contact"
              className="inline-block px-9 py-4 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-1"
              style={{ background: "hsl(var(--accent-teal))", color: "hsl(var(--bg-dark))", clipPath: "polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%)" }}
            >
              {tr(TEXT.cta, language)}
            </Link>
            <Link
              to="/portfolio"
              className="border-b pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:text-[hsl(var(--accent-teal))]"
              style={{ color: "hsl(var(--silver) / 0.75)", borderColor: "hsl(var(--silver) / 0.25)" }}
            >
              {tr(TEXT.work, language)}
            </Link>
          </div>

          <dl className="mt-12 flex gap-10 font-mono text-[0.7rem] uppercase tracking-wider">
            <div>
              <dt style={{ color: "hsl(var(--silver) / 0.55)" }}>{tr(TEXT.delayLabel, language)}</dt>
              <dd className="mt-1" style={{ color: "hsl(var(--silver))" }}>{tr(TEXT.delayValue, language)}</dd>
            </div>
            <div>
              <dt style={{ color: "hsl(var(--silver) / 0.55)" }}>{tr(TEXT.quoteLabel, language)}</dt>
              <dd className="mt-1" style={{ color: "hsl(var(--silver))" }}>{tr(TEXT.quoteValue, language)}</dd>
            </div>
          </dl>
        </motion.div>

        {/* Carrousel des prestations */}
        <div className="relative">
          {/* The ring is drawn on pure black and blended with "lighten": black disappears into the page,
              only the cards and their glow show. The mask fades every edge so there is no visible box. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="relative"
            style={{
              mixBlendMode: "lighten",
              WebkitMaskImage: EDGE_FADE,
              maskImage: EDGE_FADE,
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          >
            <WarpCarousel
              cards={cards}
              step={1}
              interval={4}
              background="#000000"
              glow="#000000"
              warp={0.6}
              ariaLabel={tr(TEXT.carousel, language)}
              onIndexChange={setActive}
              style={{ minHeight: 360, background: "transparent" }}
            />
          </motion.div>
          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="flex gap-1.5" aria-hidden="true">
              {SLIDES.map((s, i) => (
                <span
                  key={s.id}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{ width: i === active ? 28 : 10, background: i === active ? "hsl(var(--accent-teal))" : "hsl(var(--silver) / 0.25)" }}
                />
              ))}
            </div>
            <Link
              to={`/prestations/${slide.id}`}
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--accent-teal))]"
              style={{ color: "hsl(var(--silver))" }}
            >
              {tr(slide.name, language)}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
