import React from 'react';
import { Phone, Mail, MapPin, Wine, IceCream, Star, Clock, Globe } from 'lucide-react';
import LOGO_IMAGE_SRC from '../assets/images/logo_1784004441387.jpg';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-neutral-950/40 backdrop-blur-md text-white/60 pt-16 pb-8 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Footer Brand columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-md shrink-0">
                <img 
                  src={LOGO_IMAGE_SRC} 
                  alt="Mother of Ice-cream Logo" 
                  className="w-full h-full object-cover scale-105" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight">Mother of Ice-cream</span>
            </div>
            <p className="text-xs text-white/40 uppercase tracking-widest font-display font-bold">Kolkata’s Premier Event Catering Service</p>
            <p className="text-sm text-white/70 leading-relaxed font-sans max-w-sm mx-auto sm:mx-0">
              Hand-churned, authentic 13 premium flavors paired with a grand live Gondhoraj Mojito and Mocktail service. Available for Weddings, Corporate Events, Birthdays, and private celebrations across Kolkata.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-brand-pink font-bold text-xs bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 w-fit mx-auto sm:mx-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2EC4B6] animate-pulse"></span>
              Catering Active in Salt Lake, New Town, Alipore & Greater Kolkata
            </div>
          </div>
 
          {/* Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest font-display border-l-2 border-[#FF4FA3] pl-2.5">
              Service Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onScrollToSection('flavors')}
                  className="hover:text-brand-pink transition-colors text-left flex items-center gap-1.5"
                >
                  <IceCream className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/80 hover:text-brand-pink transition-colors">13 Premium Flavors Showcase</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('mojito-bar')}
                  className="hover:text-brand-pink transition-colors text-left flex items-center gap-1.5"
                >
                  <Wine className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/80 hover:text-brand-pink transition-colors">Interactive Mojito Shaker Bar</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('estimator')}
                  className="hover:text-brand-pink transition-colors text-left flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/80 hover:text-brand-pink transition-colors">Instant Party Quote Estimator</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('book-now')}
                  className="hover:text-brand-pink transition-colors text-left flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/80 hover:text-brand-pink transition-colors">Schedule Private Tasting Meeting</span>
                </button>
              </li>
            </ul>
          </div>
 
          {/* Contact details Columns (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest font-display border-l-2 border-[#2EC4B6] pl-2.5">
              Let’s Connect
            </h4>
            
            <div className="space-y-3.5 text-sm">
              
              {/* Call */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-pink mt-0.5 shrink-0 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Catering Hotline Desk</p>
                  <a href="tel:+919007819261" className="text-white hover:text-brand-pink font-bold transition-colors">
                    +91 9007819261
                  </a>
                </div>
              </div>
 
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2EC4B6] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Business Email ID</p>
                  <a href="mailto:moficecream@gmail.com" className="text-white hover:text-brand-green font-medium transition-colors">
                    moficecream@gmail.com
                  </a>
                </div>
              </div>
 
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Central Kitchen & Tasting Lounge</p>
                  <p className="text-white/80">
                    Ballygunge, Salt Lake Sector V, New Town, Kolkata, West Bengal, India
                  </p>
                </div>
              </div>
 
            </div>
          </div>
 
        </div>
 
        {/* Bottom row: copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45 font-medium">
          <div className="text-center sm:text-left">
            <p>© 2026 Mother of Ice-cream Kolkata. All Rights Reserved.</p>
            <p className="mt-0.5 text-[10px] text-white/35">Catered meticulously for over 250+ luxurious weddings & corporate events.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white/40">
              <Globe className="w-3.5 h-3.5 text-white/40" />
              <span>West Bengal Event Service Registry</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/40">Created with Premium Ingredients</span>
          </div>
        </div>
 
      </div>
    </footer>
  );
}
