"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Restaurant01Icon,
  ScissorIcon,
  DrinkIcon,
  Dumbbell01Icon,
  Pizza01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

import portfolioAurora from "@/assets/portfolio-aurora.png";
import portfolioDuckeBarber from "@/assets/portfolio-ducke-barber.png";
import portfolioEclipse from "@/assets/portfolio-eclipse.png";
import portfolioFitnessSquad from "@/assets/portfolio-fitness-squad.png";
const portfolioTikobanAsset = { url: "/images/portfolio-tikoban.jpeg" };

const portfolioTikoban = portfolioTikobanAsset.url;

const FEATURES = [
  {
    id: "duck-barber",
    label: "Ducke Barber",
    sublabel: "Barbier",
    icon: ScissorIcon,
    image: portfolioDuckeBarber,
    description: "Identité web moderne et prise de RDV en ligne pour un barbier urbain.",
  },
  {
    id: "tikoban",
    label: "Ti Koban",
    sublabel: "Food truck",
    icon: Pizza01Icon,
    image: portfolioTikoban,
    description: "Site vitrine appétissant pour un food truck de pizzas artisanale en Bretagne.",
  },
  {
    id: "aurore",
    label: "Aurora",
    sublabel: "Restaurant Gastronomique",
    icon: Restaurant01Icon,
    image: portfolioAurora,
    description: "Site vitrine haut de gamme pour un restaurant gastronomique nantais.",
  },
  {
    id: "eclipse",
    label: "L'Éclipse",
    sublabel: "Bar",
    icon: DrinkIcon,
    image: portfolioEclipse,
    description: "Landing page immersive et événementielle pour un bar branché.",
  },
  {
    id: "fitness-squad",
    label: "Fitness Squad",
    sublabel: "Salle de sport",
    icon: Dumbbell01Icon,
    image: portfolioFitnessSquad,
    description: "Site dynamique avec offres d'abonnement et planning de cours en ligne.",
  },
];

const AUTO_PLAY_INTERVAL = 3500;

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full py-20 overflow-hidden" style={{ background: 'hsl(var(--bg-section))', borderTop: '1px solid hsl(0 0% 88% / 0.08)' }}>
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <span className="section-eyebrow">Réalisations</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(var(--silver))' }}>
          Ce que nous avons créé
        </h2>
        <p className="text-lg max-w-xl" style={{ color: 'hsl(var(--silver) / 0.5)' }}>
          Des sites web sur-mesure pour des entreprises locales ambitieuses.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="w-full lg:w-2/5 flex flex-col gap-3">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleChipClick(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  layout
                  className={cn(
                    "relative flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-700 text-left group border",
                    isActive
                      ? "z-10 shadow-lg"
                      : "bg-transparent hover:text-white"
                  )}
                  style={{
                    background: isActive ? 'hsl(var(--accent-teal))' : 'transparent',
                    color: isActive ? 'hsl(var(--bg-dark))' : 'hsl(var(--silver) / 0.5)',
                    borderColor: isActive ? 'hsl(var(--accent-teal))' : 'hsl(0 0% 88% / 0.1)',
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={feature.icon} size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm md:text-base">{feature.label}</span>
                    <span className="text-xs opacity-70">{feature.sublabel}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="w-full lg:w-3/5 relative h-[350px] md:h-[450px]">
            <AnimatePresence mode="wait">
              {FEATURES.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                if (!isActive) return null;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{ border: '1px solid hsl(0 0% 88% / 0.08)' }}
                  >
                    <img src={feature.image} alt={`${feature.label} - LocalWeb Partners`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-2"
                        style={{ background: 'hsl(var(--accent-teal) / 0.9)', color: 'hsl(var(--bg-dark))' }}>
                        {feature.sublabel}
                      </span>
                      <p className="text-sm md:text-base" style={{ color: 'hsl(var(--silver))' }}>{feature.description}</p>
                    </div>
                    <div className="absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1" style={{ background: 'hsl(0 0% 100% / 0.1)' }}>
                      <span className="text-xs font-medium" style={{ color: 'hsl(var(--silver))' }}>LocalWeb Partners</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
