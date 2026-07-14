import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle, Star, Sparkles, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import HERO_IMAGE_SRC from '../assets/images/hero_ice_cream_1784002464557.jpg';
import MOJITO_IMAGE_SRC from '../assets/images/mojito_service_1784002481635.jpg';
import FLAVORS_IMAGE_SRC from '../assets/images/flavors_display_1784002495455.jpg';
import LOGO_IMAGE_SRC from '../assets/images/logo_1784004441387.jpg';

const CATERING_GALLERY = [
  {
    src: HERO_IMAGE_SRC,
    alt: 'Premium Live Ice Cream Cups with Wafer Sticks',
    title: 'Signature Event Sundaes',
    tag: 'Live Presentation Table'
  },
  {
    src: MOJITO_IMAGE_SRC,
    alt: 'Professional Bartender Setting Up Fresh Fruits and Waffle Cones',
    title: 'Gourmet Sourcing Station',
    tag: 'Fresh Fruit & Cones'
  },
  {
    src: FLAVORS_IMAGE_SRC,
    alt: 'Premium Catering Dessert Cups close up',
    title: 'Deluxe Party Portions',
    tag: 'Kolkata Reception Setup'
  }
];

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  heroImageSrc: string;
}

export default function Hero({ onScrollToSection, heroImageSrc }: HeroProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % CATERING_GALLERY.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + CATERING_GALLERY.length) % CATERING_GALLERY.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % CATERING_GALLERY.length);
  };
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 text-white z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Grid (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-brand-yellow" />
              <span>Premium Event Ice Cream & Mocktail Catering</span>
            </motion.div>
 
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
            >
              Making Kolkata’s <br />
              <span className="font-serif italic font-normal text-brand-yellow">Grandest Celebrations</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-yellow to-brand-green-light">Unforgettably Sweet!</span>
            </motion.h1>
 
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Treat your guests to <strong className="text-white font-extrabold">13 premium handcrafted ice cream flavors</strong> featuring Bengali culinary wonders like Nolen Gur & Gondhoraj Lime, coupled with a <strong className="text-white font-extrabold">Live Mojito & Mocktail Bar</strong>. Catering setups for Weddings, Birthdays, and Corporate Galas across Kolkata.
            </motion.p>
 
            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-w-lg mx-auto lg:mx-0 text-left"
            >
              {[
                '13 Exquisite Flavors',
                'Live Mojito Station',
                'Professional Servers',
                'Eco-friendly Setup',
                'Weddings & Parties',
                'Customized Platters'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span className="font-semibold">{benefit}</span>
                </div>
              ))}
            </motion.div>
 
            {/* Main Conversion CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Call directly */}
              <a
                href="tel:+919007819261"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-white/20 hover:bg-white/35 border border-white/30 backdrop-blur-md rounded-full transition-all duration-300 shadow-xl hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>Call +91 9007819261</span>
              </a>
 
              {/* Estimate Tool button */}
              <button
                onClick={() => onScrollToSection('estimator')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 border border-white/20 hover:-translate-y-0.5 shadow-md"
              >
                <span>Generate Party Quote</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow" />
              </button>
            </motion.div>
 
            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/15 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <img
                    key={n}
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30"
                    src={`https://images.unsplash.com/photo-${n === 1 ? '1494790108377-be9c29b29330' : n === 2 ? '1507003211169-0a1dd7228f2d' : n === 3 ? '1438761681033-6461ffad8d80' : '1472099645785-5658abf4ff4e'}?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80`}
                    alt="Customer Avatar"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-left text-xs sm:text-sm">
                <div className="flex items-center gap-0.5 text-brand-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-1 text-white font-extrabold">4.9/5 Rating</span>
                </div>
                <p className="text-white/70 font-semibold">Over 250+ events successfully catered in Kolkata</p>
              </div>
            </motion.div>
 
          </div>
 
          {/* Asymmetric Graphic Grid (5 cols on large screens) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              {/* Main premium border glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-white via-brand-yellow to-brand-green rounded-[32px] blur-md opacity-45"></div>
              
              {/* Hero Image Container with Slideshow */}
              <div className="relative bg-white/10 rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3] sm:aspect-square lg:aspect-[4/5] backdrop-blur-md group">
                
                {/* Sliding Image with AnimatePresence */}
                <div className="w-full h-full relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={CATERING_GALLERY[activeImageIdx].src}
                      alt={CATERING_GALLERY[activeImageIdx].alt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>

                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

                {/* Manual Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot indicators and photo context */}
                <div className="absolute bottom-24 inset-x-4 flex items-center justify-between bg-black/50 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-white text-xs z-10">
                  <div className="min-w-0 pr-2">
                    <p className="font-extrabold truncate text-brand-yellow text-xs sm:text-sm">{CATERING_GALLERY[activeImageIdx].title}</p>
                    <p className="text-[10px] text-white/75 truncate">{CATERING_GALLERY[activeImageIdx].tag}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {CATERING_GALLERY.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveImageIdx(dotIdx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          dotIdx === activeImageIdx ? 'bg-brand-yellow w-3.5' : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Highlight Box: Booking Call-to-Action */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/25 flex items-center gap-3 shadow-2xl text-white z-10">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/30 shrink-0 bg-white/10">
                    <img 
                      src={LOGO_IMAGE_SRC} 
                      alt="Mother of Ice-cream miniature logo" 
                      className="w-full h-full object-cover scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-brand-yellow uppercase font-display tracking-widest">Real Events Gallery</p>
                    <p className="text-xs font-black text-white truncate">See our genuine Kolkata setups!</p>
                  </div>
                  <button 
                    onClick={() => onScrollToSection('book-now')}
                    className="p-2 rounded-full bg-brand-green hover:bg-brand-green/90 text-white transition-colors shrink-0 border border-white/20 shadow-md"
                    title="Go to book form"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
 
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-brand-green/85 border border-white/25 text-white font-display text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1 z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  Kolkata Live Setup
                </div>
              </div>
            </motion.div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
