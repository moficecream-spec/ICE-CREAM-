import React, { useState } from 'react';
import { Phone, Wine, IceCream, MessageSquare, Calendar, Star } from 'lucide-react';
import LOGO_IMAGE_SRC from '../assets/images/logo_1784004441387.jpg';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollToSection, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'flavors', label: '13 Premium Flavors', icon: IceCream },
    { id: 'mojito-bar', label: 'Live Mojito Bar', icon: Wine },
    { id: 'estimator', label: 'Party Quote Estimator', icon: Star },
    { id: 'book-now', label: 'Book Event', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/15 shadow-lg text-white">
      {/* Top Banner with high attention Call action */}
      <div className="bg-white/15 border-b border-white/10 text-white text-xs sm:text-sm py-2 px-4 text-center font-semibold tracking-wide flex justify-center items-center gap-2 backdrop-blur-md">
        <span className="inline-block animate-pulse w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>🎉 Live Mojito Service & Premium Ice Cream Catering in Kolkata!</span>
        <a 
          href="tel:+919007819261" 
          className="underline hover:text-brand-yellow transition-colors font-bold ml-1 flex items-center gap-1"
        >
          <Phone className="w-3 h-3 inline animate-bounce" /> Call +91 9007819261
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollToSection('hero')}>
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full overflow-hidden bg-white/10 border-2 border-white/30 shadow-lg shrink-0">
              <img 
                src={LOGO_IMAGE_SRC} 
                alt="Mother of Ice-cream Logo" 
                className="w-full h-full object-cover scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-white">Mother</span>
                <span className="font-serif text-sm italic text-white/70 font-medium lowercase">of</span>
                <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-brand-yellow">Ice-cream</span>
              </div>
              <p className="text-[10px] tracking-widest font-bold text-white/60 uppercase font-display">Kolkata Events & Catering</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onScrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 border border-white/30 text-white shadow-md backdrop-blur-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Contact Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://wa.me/919007819261?text=Hi%20Mother%20of%20Ice-cream%2C%20I%20would%20like%20to%20inquire%20about%20party%20orders%20and%20mojito%20service%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full bg-brand-green/80 hover:bg-brand-green border border-white/20 text-white transition-all shadow-md shadow-emerald-950/20"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="tel:+919007819261"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call +91 9007819261
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:+919007819261"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 text-white transition-all"
              title="Call us now"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white/85 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900/60 backdrop-blur-xl border-b border-white/15 py-4 px-6 space-y-3 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onScrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all ${
                  isActive 
                    ? 'bg-white/25 border border-white/30 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://wa.me/919007819261?text=Hi%20Mother%20of%20Ice-cream%2C%20I%20would%20like%20to%20inquire%20about%20party%20orders%20and%20mojito%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-green/80 hover:bg-brand-green text-white font-bold text-center text-sm shadow-sm"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp Inquiry
            </a>
            <a
              href="tel:+919007819261"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold text-center text-sm shadow-sm"
            >
              <Phone className="w-5 h-5" />
              Call +91 9007819261
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
