import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "création site web, entreprise locale, agence web, site vitrine, SEO local, Nantes, France",
  canonicalUrl,
  ogImage = "/og-image.png"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');
    setMetaTag('author', 'LocalWeb Partners');

    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:locale', 'fr_FR', true);
    setMetaTag('og:site_name', 'LocalWeb Partners', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Schema.org LocalBusiness (inject if not exists)
    const schemaId = 'schema-localbusiness';
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "LocalWeb Partners",
        "description": "Création sites web entreprises locales - Agence web basée à Nantes, France",
        "url": "https://localwebpartners.fr",
        "telephone": "+33671002119",
        "email": "info.localwebpartners@gmail.com",
        "logo": "https://localwebpartners.fr/logo-localweb.png",
        "image": "https://localwebpartners.fr/og-image.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nantes",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates"
        },
        "sameAs": [
          "https://www.instagram.com/localwebpartners"
        ],
        "priceRange": "€€",
        "openingHours": "Mo-Fr 09:00-18:00",
        "areaServed": ["France", "Nantes"],
        "serviceType": ["Création site web", "Site vitrine", "E-commerce", "SEO local", "Création logo"]
      });
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
};

export default SEOHead;
