import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/LanguageContext";

const HalideHero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-section {
          background-color: hsl(var(--bg-dark));
          overflow: hidden;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: 'Inter', sans-serif;
        }
        .halide-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 5;
          opacity: 0.12;
          filter: url(#grain-lw);
        }
        .lw-viewport {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .lw-canvas {
          position: relative;
          width: 900px;
          height: 560px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 768px) {
          .lw-canvas {
            width: 280px;
            height: 220px;
          }
        }
        .lw-layer {
          position: absolute;
          inset: 0;
          border: 1px solid hsl(var(--lw-border));
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }
        .lw-layer-1 {
          background-image: url('https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80');
          filter: grayscale(1) contrast(1.3) brightness(0.35);
        }
        .lw-layer-2 {
          background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80');
          filter: grayscale(1) contrast(1.1) brightness(0.5);
          opacity: 0.5;
          mix-blend-mode: screen;
        }
        .lw-layer-3 {
          background-image: url('https://images.unsplash.com/photo-1551288049-bbda38a10ad5?w=1200&q=80');
          filter: grayscale(1) contrast(1.4) brightness(0.6);
          opacity: 0.35;
          mix-blend-mode: overlay;
        }
        .lw-contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 45px,
            hsl(var(--accent-teal) / 0.06) 46px,
            transparent 47px
          );
          transform: translateZ(120px);
          pointer-events: none;
        }
        .lw-interface {
          position: absolute;
          inset: 0;
          padding: 7rem 3rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .lw-interface {
            padding: 4rem 1.5rem 1.5rem;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr auto;
            gap: 0;
          }
          .lw-eyebrow {
            display: none;
          }
        }
        .lw-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: hsl(var(--accent-teal));
          text-transform: uppercase;
        }
        .lw-coords {
          text-align: right;
          font-family: monospace;
          color: hsl(var(--silver) / 0.4);
          font-size: 0.65rem;
          line-height: 1.8;
        }
        @media (max-width: 768px) {
          .lw-coords { display: none; }
        }
        .lw-hero-title {
          grid-column: 1 / -1;
          align-self: end;
          font-size: clamp(2rem, 5vw, 5rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          font-weight: 800;
          color: hsl(var(--silver));
          mix-blend-mode: difference;
          text-transform: uppercase;
          opacity: 0.85;
        }
        @media (max-width: 768px) {
          .lw-hero-title {
            font-size: clamp(1.6rem, 10vw, 2.5rem);
            line-height: 1;
          }
        }
        .lw-bottom {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        @media (max-width: 768px) {
          .lw-bottom {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            padding-bottom: 1rem;
          }
        }
        .lw-tagline {
          font-size: 0.75rem;
          color: hsl(var(--silver) / 0.5);
          line-height: 1.8;
          font-family: monospace;
          letter-spacing: 0.05em;
        }
        .lw-cta {
          pointer-events: auto;
          background: hsl(var(--accent-teal));
          color: hsl(var(--bg-dark));
          padding: 1rem 2.2rem;
          text-decoration: none;
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%);
          transition: all 0.3s;
          display: inline-block;
        }
        .lw-cta:hover {
          background: hsl(var(--silver));
          transform: translateY(-4px);
        }
        .lw-cta-secondary {
          pointer-events: auto;
          color: hsl(var(--silver) / 0.6);
          border-bottom: 1px solid hsl(var(--silver) / 0.2);
          padding-bottom: 2px;
          text-decoration: none;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-right: 2rem;
          transition: color 0.3s, border-color 0.3s;
        }
        .lw-cta-secondary:hover {
          color: hsl(var(--accent-teal));
          border-color: hsl(var(--accent-teal));
        }
        .lw-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .lw-scroll-hint {
            display: none;
          }
        }
        .lw-scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, hsl(var(--accent-teal)), transparent);
          animation: lw-flow 2s infinite ease-in-out;
        }
        .lw-scroll-text {
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          color: hsl(var(--silver) / 0.3);
          text-transform: uppercase;
          font-family: monospace;
        }
        @keyframes lw-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          30% { opacity: 1; }
          70% { transform: scaleY(1); transform-origin: top; }
          71% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .lw-teal-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: hsl(var(--accent-teal));
          z-index: 20;
        }
      `}</style>

      <section className="halide-section" id="accueil">
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="grain-lw">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div className="halide-grain" />
        <div className="lw-teal-bar" />

        <div className="lw-viewport">
          <div className="lw-canvas" ref={canvasRef}>
            <div className="lw-layer lw-layer-1" ref={(el) => (layersRef.current[0] = el!)} />
            <div className="lw-layer lw-layer-2" ref={(el) => (layersRef.current[1] = el!)} />
            <div className="lw-layer lw-layer-3" ref={(el) => (layersRef.current[2] = el!)} />
            <div className="lw-contours" />
          </div>
        </div>

        <div className="lw-interface">
          <div className="lw-eyebrow">LocalWeb_Partners</div>
          <div className="lw-coords">
            <div>EXPERTISE: WEB DESIGN</div>
            <div>DÉLAI: 5–10 JOURS</div>
          </div>

          <h1 className="lw-hero-title">
            Agence<br />
            de Web<span style={{ color: "hsl(var(--accent-teal))" }}>.</span><br />
            Design
          </h1>

          <div className="lw-bottom">
            <div className="lw-tagline">
              <p>[ SITES SUR-MESURE ]</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Link to="/portfolio" className="lw-cta-secondary">Nos réalisations</Link>
              <Link to="/contact" className="lw-cta">Devis gratuit</Link>
            </div>
          </div>
        </div>

        <div className="lw-scroll-hint">
          <span className="lw-scroll-text">Scroll</span>
          <div className="lw-scroll-line" />
        </div>
      </section>
    </>
  );
};

export default HalideHero;
