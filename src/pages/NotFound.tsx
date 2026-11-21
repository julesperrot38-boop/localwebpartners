import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'hsl(var(--bg-dark))' }}>
      <div className="text-center">
        <span className="section-eyebrow">Erreur</span>
        <h1 className="mb-4 text-4xl font-bold" style={{ color: 'hsl(var(--silver))' }}>404</h1>
        <p className="mb-4 text-xl" style={{ color: 'hsl(var(--silver) / 0.5)' }}>Oops! Page introuvable</p>
        <a href="/" style={{ color: 'hsl(var(--accent-teal))' }} className="underline hover:opacity-80">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
