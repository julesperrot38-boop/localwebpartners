import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WarpCarousel, type WarpCard } from "@/components/ui/warp-carousel";

const TEAL = "#30b59b";
const NUMERAL: [string, string] = ["#30b59b", "#a6f2e2"];

interface ServiceSlide {
  id: string;
  name: string;
  card: WarpCard;
}

/* Une carte par prestation. Délais indicatifs : à ajuster si besoin. */
const SERVICES: ServiceSlide[] = [
  {
    id: "site-vitrine",
    name: "Site vitrine",
    card: {
      title: "Site vitrine\n1 à 6 pages",
      value: "7",
      unit: "jours",
      footer: "Délai moyen de livraison",
      image: "/images/hero/vitrine.webp",
      alt: "Rendu d'un site vitrine pour un barbier affiché sur un ordinateur portable.",
      numeral: NUMERAL,
      glow: TEAL,
    },
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    card: {
      title: "E-commerce\nboutique en ligne",
      value: "21",
      unit: "jours",
      footer: "Délai moyen de livraison",
      image: "/images/hero/ecommerce.webp",
      alt: "Rendu d'une application e-commerce de montres de luxe sur un smartphone.",
      numeral: NUMERAL,
      glow: TEAL,
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    card: {
      title: "Portfolio\ninteractif",
      value: "7",
      unit: "jours",
      footer: "Délai moyen de livraison",
      image: "/images/hero/portfolio.webp",
      alt: "Rendu d'un portfolio d'architecture affiché sur un ordinateur et une tablette.",
      numeral: NUMERAL,
      glow: TEAL,
    },
  },
  {
    id: "blog",
    name: "Blog SEO",
    card: {
      title: "Blog\noptimisé SEO",
      value: "10",
      unit: "jours",
      footer: "Délai moyen de livraison",
      image: "/images/hero/blog.webp",
      alt: "Rendu d'un blog éditorial affiché sur un ordinateur portable dans un café.",
      numeral: NUMERAL,
      glow: TEAL,
    },
  },
];

const CARDS = SERVICES.map((s) => s.card);
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ServicesHero = () => {
  const [active, setActive] = useState(0);
  const service = SERVICES[active] ?? SERVICES[0];

  return (
    <section
      id="accueil"
      className="relative overflow-hidden"
      style={{ background: "hsl(var(--bg-dark))" }}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] z-20" style={{ background: "hsl(var(--accent-teal))" }} />

      <div className="container relative mx-auto grid min-h-[100svh] grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 pb-12 pt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6 lg:px-8 lg:pt-20">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-10"
        >
          <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.25em]" style={{ color: "hsl(var(--accent-teal))" }}>
            LocalWeb_Partners
          </p>
          <h1
            id="hero-title"
            className="font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
            style={{ color: "hsl(var(--silver))", fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            Agence
            <br />
            de Web<span style={{ color: "hsl(var(--accent-teal))" }}>.</span>
            <br />
            Design
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed md:text-lg" style={{ color: "hsl(var(--silver) / 0.72)" }}>
            Sites vitrines, boutiques en ligne, portfolios et blogs sur-mesure pour les entreprises locales. Conçus pour être beaux, rapides et
            trouvés sur Google.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              to="/contact"
              className="inline-block px-9 py-4 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "hsl(var(--accent-teal))",
                color: "hsl(var(--bg-dark))",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%)",
              }}
            >
              Devis gratuit
            </Link>
            <Link
              to="/portfolio"
              className="border-b pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:text-[hsl(var(--accent-teal))]"
              style={{ color: "hsl(var(--silver) / 0.75)", borderColor: "hsl(var(--silver) / 0.25)" }}
            >
              Nos réalisations
            </Link>
          </div>

          <dl className="mt-12 flex gap-10 font-mono text-[0.7rem] uppercase tracking-wider" style={{ color: "hsl(var(--silver) / 0.6)" }}>
            <div>
              <dt style={{ color: "hsl(var(--silver) / 0.45)" }}>Délai</dt>
              <dd className="mt-1" style={{ color: "hsl(var(--silver))" }}>5 à 21 jours</dd>
            </div>
            <div>
              <dt style={{ color: "hsl(var(--silver) / 0.45)" }}>Devis</dt>
              <dd className="mt-1" style={{ color: "hsl(var(--silver))" }}>Sous 24 h</dd>
            </div>
          </dl>
        </motion.div>

        {/* Carrousel des prestations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="relative"
        >
          <WarpCarousel
            cards={CARDS}
            step={1}
            interval={4}
            background="#0a0a0a"
            glow={TEAL}
            ariaLabel="Nos prestations"
            onIndexChange={setActive}
            style={{ minHeight: 360 }}
          />
          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="flex gap-1.5" aria-hidden="true">
              {SERVICES.map((s, i) => (
                <span
                  key={s.id}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 28 : 10,
                    background: i === active ? "hsl(var(--accent-teal))" : "hsl(var(--silver) / 0.25)",
                  }}
                />
              ))}
            </div>
            <Link
              to={`/prestations/${service.id}`}
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--accent-teal))]"
              style={{ color: "hsl(var(--silver))" }}
            >
              {service.name}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
