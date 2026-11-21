"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import portfolioAurora from "@/assets/portfolio-aurora.png";
import portfolioDuckeBarber from "@/assets/portfolio-ducke-barber.png";
import portfolioEclipse from "@/assets/portfolio-eclipse.png";
import portfolioFitnessSquad from "@/assets/portfolio-fitness-squad.png";
import logoLw from "@/assets/logo-lw.png";


const SITES = [
  {
    id: "duck-barber",
    url: "duck-barber-nantes.fr",
    label: "Duck Barber — Barbier",
    favicon: "✂️",
    image: portfolioDuckeBarber,
    accent: "#1e3a8a",
  },
  {
    id: "aurore",
    url: "aurore-restaurant.fr",
    label: "Aurore — Restaurant Gastronomique",
    favicon: "🍽️",
    image: portfolioAurora,
    accent: "#c8a96e",
  },
  {
    id: "eclipse",
    url: "leclipse-bar.fr",
    label: "L'Eclipse — Bar & Cocktails",
    favicon: "🌑",
    image: portfolioEclipse,
    accent: "#7c3aed",
  },
  {
    id: "fitness-squad",
    url: "fitnesssquad-nantes.fr",
    label: "Fitness Squad — Salle de Sport",
    favicon: "💪",
    image: portfolioFitnessSquad,
    accent: "#14b8a6",
  },
];

const INTERVAL = 3000;

export function AnimatedBrowser() {
  const [current, setCurrent] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedUrl, setDisplayedUrl] = useState(SITES[0].url);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % SITES.length;

      setIsTyping(true);
      setDisplayedUrl("");

      const targetUrl = SITES[next].url;
      let i = 0;
      const typeInterval = setInterval(() => {
        i++;
        setDisplayedUrl(targetUrl.slice(0, i));
        if (i >= targetUrl.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 40);

      setCurrent(next);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [current]);

  const site = SITES[current];

  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-[#e8eaed] shadow-lg">

      {/* Barre de titre */}
      <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 pt-1.5 md:pt-2 pb-0 bg-[#dee1e6]">
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Onglets */}
      <div className="flex items-end gap-0.5 px-1 md:px-2 pt-1 bg-[#dee1e6] overflow-x-auto scrollbar-hide">
        {SITES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`
              flex items-center gap-1 md:gap-1.5 px-1.5 md:px-3 py-1 md:py-1.5 rounded-t-md text-[10px] md:text-xs font-medium
              max-w-[70px] md:max-w-[120px] truncate transition-all duration-200 border-t border-x shrink-0
              ${i === current
                ? "bg-[#f0f2f5] border-black/10 text-gray-800 shadow-sm"
                : "bg-[#c8cbd0] border-transparent text-gray-500 hover:bg-[#d5d8dc]"
              }
            `}
          >
            <span className="text-[10px] md:text-xs">{s.favicon}</span>
            <span className="hidden md:inline">{s.label.split("—")[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Barre de navigation */}
      <div className="flex items-center gap-1 md:gap-2 px-1.5 md:px-3 py-1 md:py-1.5 bg-[#f0f2f5] border-b border-black/5">
        {/* Boutons nav - cachés sur mobile */}
        <div className="hidden md:flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
        </div>

        {/* Barre URL */}
        <div className="flex-1 flex items-center gap-1.5 md:gap-2 bg-white rounded-full px-2 md:px-3 py-0.5 md:py-1 border border-black/10 text-sm">
          <svg className="text-green-600 shrink-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="text-gray-700 font-mono text-[9px] md:text-xs truncate">
            {displayedUrl}
            {isTyping && (
              <span className="inline-block w-0.5 h-3 md:h-3.5 bg-gray-800 ml-0.5 animate-pulse align-middle" />
            )}
          </span>
        </div>

        {/* Logo LW */}
        <img src={logoLw} alt="LocalWeb Partners" className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover shrink-0" />
      </div>

      {/* Contenu */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={site.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img
              src={site.image}
              alt={site.label}
              className="w-full h-full object-cover object-top"
              style={{ imageRendering: "auto" }}
              loading="eager"
            />

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnimatedBrowser;
