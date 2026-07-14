import { useEffect } from 'react';

export interface SEOMetadata {
  title: string;
  description: string;
}

const SECTION_SEO_MAP: Record<string, SEOMetadata> = {
  hero: {
    title: "Mother of Ice-cream | Kolkata's Premier Live Ice Cream Catering",
    description: "Book Mother of Ice-cream for luxury live ice cream stalls and premium mocktail bars at weddings, birthdays, and corporate events in Kolkata.",
  },
  flavors: {
    title: "Gourmet Ice Cream Flavors | Mother of Ice-cream Kolkata",
    description: "Explore our collection of 13+ luxury, premium handcrafted ice cream flavors. From traditional Gondhoraj Lemon to classic chocolates, styled with fresh premium ingredients.",
  },
  'mojito-bar': {
    title: "Live Mojito & Mocktail Bar Catering | Mother of Ice-cream",
    description: "Refresh your guests with our premium live mocktail and mojito bar services in Kolkata. Fresh mint leaves, lime squeezes, and exotic fruit infusions curated live.",
  },
  estimator: {
    title: "Calculate Catering Quote | Mother of Ice-cream Price Estimator",
    description: "Estimate custom packages and budgets for your upcoming events in Kolkata. Customize guest count, flavors, and live mocktail bars for instant pricing.",
  },
  'book-now': {
    title: "Book Live Stall Catering | Mother of Ice-cream Kolkata",
    description: "Send us an inquiry to book your premium live ice cream stall and professional mocktail bar in Kolkata. Quick response and high-end dessert catering.",
  },
};

/**
 * Custom hook to dynamically update document <head> elements (Title & Meta Description)
 * based on the active viewport section of our single-page application.
 */
export function useDocumentHead(activeSection: string) {
  useEffect(() => {
    const seo = SECTION_SEO_MAP[activeSection] || SECTION_SEO_MAP.hero;

    // Update the document title
    document.title = seo.title;

    // Update or create the meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Update OpenGraph tags for better social sharing SEO as well!
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seo.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', seo.description);

  }, [activeSection]);
}
