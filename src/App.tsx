import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorShowcase from './components/FlavorShowcase';
import LiveMojitoBar from './components/LiveMojitoBar';
import OrderEstimator from './components/OrderEstimator';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { useDocumentHead } from './hooks/useDocumentHead';

// Import our high-quality food photography assets as ES modules so they are bundled by Vite
import HERO_IMAGE_SRC from './assets/images/hero_ice_cream_1784002464557.jpg';
import MOJITO_IMAGE_SRC from './assets/images/mojito_service_1784002481635.jpg';
import FLAVORS_IMAGE_SRC from './assets/images/flavors_display_1784002495455.jpg';

interface QuoteData {
  packageId: string;
  guestCount: number;
  flavors: string[];
  mojitoEnabled: boolean;
  cost: number;
}

export default function App() {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [quoteDataForBooking, setQuoteDataForBooking] = useState<QuoteData | null>(null);

  // Dynamically update document title and meta tags for active section SEO performance
  useDocumentHead(activeSection);

  // Smooth scroll to a target section on the single-page application layout
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Callback to toggle flavor inclusion in estimator list
  const handleToggleFlavor = (flavorName: string) => {
    setSelectedFlavors(prev => {
      if (prev.includes(flavorName)) {
        return prev.filter(f => f !== flavorName);
      } else {
        return [...prev, flavorName];
      }
    });
  };

  // Synchronize active section based on scroll offset
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'flavors', 'mojito-bar', 'estimator', 'book-now'];
      const scrollPosition = window.scrollY + 200; // Offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pass active quote data from estimator component into booking form fields
  const handleOpenBookingFormWithData = (data: QuoteData) => {
    setQuoteDataForBooking(data);
    handleScrollToSection('book-now');
  };

  const handleClearInitialData = () => {
    setQuoteDataForBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#FF4FA3] text-white font-sans selection:bg-white selection:text-brand-pink relative overflow-x-hidden">
      
      {/* Frosted Mesh Gradient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-brand-orange rounded-full blur-[140px] opacity-75"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] sm:w-[1000px] h-[700px] sm:h-[1000px] bg-[#2EC4B6] rounded-full blur-[160px] opacity-60"></div>
        <div className="absolute top-[25%] right-[15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#FDFFB6] rounded-full blur-[120px] opacity-40"></div>
        {/* Modern floating backdrop bubbles */}
        <div className="absolute top-[15%] left-[20%] w-48 h-48 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"></div>
        <div className="absolute bottom-[25%] left-[10%] w-32 h-32 bg-white/10 rounded-full border border-white/10 backdrop-blur-md"></div>
        <div className="absolute top-[50%] right-[5%] w-64 h-64 bg-white/5 rounded-full border border-white/5 backdrop-blur-xs"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar with brand highlights and active status monitoring */}
        <Navbar 
          onScrollToSection={handleScrollToSection} 
          activeSection={activeSection} 
        />

        {/* Main Single Page Sections */}
        <main className="flex-grow">
          
          {/* Hero Banner Section */}
          <div id="hero">
            <Hero 
              onScrollToSection={handleScrollToSection} 
              heroImageSrc={HERO_IMAGE_SRC}
            />
          </div>

          {/* 13 Premium Flavors Grid Section */}
          <div id="flavors">
            <FlavorShowcase 
              onAddFlavorToQuote={handleToggleFlavor}
              selectedFlavorsInQuote={selectedFlavors}
              flavorsImageSrc={FLAVORS_IMAGE_SRC}
            />
          </div>

          {/* Live Mocktail bar Section */}
          <div id="mojito-bar">
            <LiveMojitoBar 
              mojitoImageSrc={MOJITO_IMAGE_SRC}
            />
          </div>

          {/* Interactive Pricing Estimator Section */}
          <div id="estimator">
            <OrderEstimator 
              selectedFlavors={selectedFlavors}
              onToggleFlavor={handleToggleFlavor}
              onOpenBookingFormWithData={handleOpenBookingFormWithData}
            />
          </div>

          {/* Lead Query Capture Booking Section */}
          <div id="book-now">
            <BookingForm 
              initialData={quoteDataForBooking}
              onClearInitialData={handleClearInitialData}
            />
          </div>

        </main>

        {/* Luxury Footer with Contact Hotline info */}
        <Footer onScrollToSection={handleScrollToSection} />
      </div>

    </div>
  );
}
