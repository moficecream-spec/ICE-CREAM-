import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Heart, Sparkles, X, Check, HelpCircle, Utensils } from 'lucide-react';
import { ICE_CREAM_FLAVORS } from '../data/flavors';
import { IceCreamFlavor } from '../types';

interface FlavorShowcaseProps {
  onAddFlavorToQuote?: (flavorName: string) => void;
  selectedFlavorsInQuote?: string[];
  flavorsImageSrc: string; // The generated flavors display image
}

export default function FlavorShowcase({ onAddFlavorToQuote, selectedFlavorsInQuote = [], flavorsImageSrc }: FlavorShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalFlavor, setActiveModalFlavor] = useState<IceCreamFlavor | null>(null);
  
  // Track state for simulated hearts/likes
  const [likesState, setLikesState] = useState<Record<string, { count: number; loved: boolean }>>(() => {
    const initialLikes: Record<string, { count: number; loved: boolean }> = {};
    ICE_CREAM_FLAVORS.forEach(flavor => {
      initialLikes[flavor.id] = { count: flavor.votes, loved: false };
    });
    return initialLikes;
  });

  // Categories
  const categories = [
    { id: 'all', label: 'All 13 Flavors' },
    { id: 'traditional', label: 'Bengali Heritage' },
    { id: 'chocolate', label: 'Rich Chocolates' },
    { id: 'fruity', label: 'Fresh Fruits' },
    { id: 'royal', label: 'Shahi Royal Treats' },
  ];

  // Filtering Logic
  const filteredFlavors = ICE_CREAM_FLAVORS.filter(flavor => {
    const matchesSearch = flavor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          flavor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          flavor.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'traditional') {
      return matchesSearch && (flavor.id === 'nolen-gur' || flavor.id === 'gondhoraj-lime' || flavor.id === 'paan-shots' || flavor.id === 'alphonso-mango');
    }
    if (selectedCategory === 'chocolate') {
      return matchesSearch && (flavor.tags.includes('Chocolate') || flavor.tags.includes('Premium Chocolate') || flavor.id === 'belgian-fudge' || flavor.id === 'hazelnut-nutella' || flavor.id === 'mocha-coffee');
    }
    if (selectedCategory === 'fruity') {
      return matchesSearch && (flavor.tags.includes('Fruit') || flavor.tags.includes('Fruity') || flavor.tags.includes('Summer Special') || flavor.id === 'gondhoraj-lime' || flavor.id === 'banana-split' || flavor.id === 'alphonso-mango' || flavor.id === 'berry-mascarpone');
    }
    if (selectedCategory === 'royal') {
      return matchesSearch && (flavor.tags.includes('Royal') || flavor.tags.includes('Exotic') || flavor.id === 'rose-gulkand' || flavor.id === 'alphonso-mango' || flavor.id === 'paan-shots');
    }
    return matchesSearch;
  });

  // Toggle Love function
  const handleToggleLove = (flavorId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal
    setLikesState(prev => {
      const isLoved = prev[flavorId]?.loved;
      const currentCount = prev[flavorId]?.count || 0;
      return {
        ...prev,
        [flavorId]: {
          count: isLoved ? currentCount - 1 : currentCount + 1,
          loved: !isLoved
        }
      };
    });
  };

  return (
    <section id="flavors" className="py-20 text-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            13 Premium Artisanal Masterpieces
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            The Golden Grid of <span className="font-serif italic font-normal text-brand-yellow">13 Exquisite Flavors</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Lovingly designed for majestic catering menus. Click on any flavor card to explore raw ingredients, culinary history, and handpicked local stories.
          </p>
        </div>
 
        {/* Brand Banner showcasing gourmet ingredient source with our generated photo */}
        <div className="mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl text-white">
          <div className="md:col-span-4 h-48 rounded-2xl overflow-hidden shadow-inner border border-white/10">
            <img 
              src={flavorsImageSrc} 
              alt="Assortment of ice cream flavors" 
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">Premium Local Ingredient Sourcing</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              From organic full-cream milk to fresh Gondhoraj lemons and pure Joynagar Nolen Gur, we work directly with Bengal’s farmers and suppliers to ensure every spoonful is a masterpiece of pure taste. No artificial colors, no hydrogenated oils. Just premium, dense artisanal cream.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3.5 py-1 text-xs font-bold text-white bg-white/10 border border-white/15 rounded-full">🥛 100% Full Cream Milk</span>
              <span className="px-3.5 py-1 text-xs font-bold text-white bg-white/10 border border-white/15 rounded-full">🍯 Joynagar Nolen Gur</span>
              <span className="px-3.5 py-1 text-xs font-bold text-white bg-white/10 border border-white/15 rounded-full">🍋 Organic Gondhoraj Lime</span>
              <span className="px-3.5 py-1 text-xs font-bold text-white bg-white/10 border border-white/15 rounded-full">🥜 Slow-Roasted Dry Fruits</span>
            </div>
          </div>
        </div>
 
        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Categories list */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-brand-pink border border-white shadow-xl scale-[1.03]'
                    : 'bg-white/10 border border-white/10 text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
 
          {/* Search box */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/50 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search flavors/ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-white/35 rounded-full outline-none transition-all placeholder:text-white/50 text-white"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
 
        </div>
 
        {/* Empty State */}
        {searchTerm && filteredFlavors.length === 0 && (
          <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-[32px] border border-dashed border-white/25 p-8">
            <div className="text-5xl mb-4">🍨🕵️</div>
            <p className="text-lg font-bold text-white">No flavors match your search</p>
            <p className="text-sm text-white/70 mt-1 max-w-sm mx-auto">Try typing another ingredient, like "Gur", "Paan", "Fudge" or choosing a different filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
              className="mt-4 px-5 py-2 bg-white text-brand-pink rounded-full text-xs font-bold hover:bg-white/90 transition-all border border-white"
            >
              Reset Filters
            </button>
          </div>
        )}
 
        {/* Flavors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlavors.map((flavor, index) => {
            const isKolkataSpecial = flavor.id === 'nolen-gur' || flavor.id === 'gondhoraj-lime' || flavor.id === 'paan-shots';
            const likes = likesState[flavor.id] || { count: flavor.votes, loved: false };
            const isAddedToQuote = selectedFlavorsInQuote.includes(flavor.name);
 
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                key={flavor.id}
                onClick={() => setActiveModalFlavor(flavor)}
                className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md bg-white/10 hover:bg-white/15 ${
                  isKolkataSpecial 
                    ? 'border-[#2EC4B6]/55 shadow-2xl ring-2 ring-[#2EC4B6]/20' 
                    : 'border-white/15 shadow-xl hover:border-white/25'
                }`}
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-neutral-900/35">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[80%]">
                    {flavor.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="bg-black/40 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase px-2 py-1 rounded-full shadow-sm border border-white/15">
                        {tag}
                      </span>
                    ))}
                  </div>
 
                  {/* Kolkata Special Badge */}
                  {isKolkataSpecial && (
                    <div className="absolute top-3 right-3 bg-[#2EC4B6]/95 border border-white/20 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Bengal Special
                    </div>
                  )}
 
                  {/* Love Button overlay */}
                  <button
                    onClick={(e) => handleToggleLove(flavor.id, e)}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md border transition-all ${
                      likes.loved 
                        ? 'bg-[#FF4FA3] border-white/45 text-white scale-110' 
                        : 'bg-black/30 hover:bg-black/50 border-white/15 text-white hover:text-brand-yellow hover:scale-105'
                    }`}
                    title={likes.loved ? "Loved!" : "Love this flavor"}
                  >
                    <Heart className={`w-4 h-4 ${likes.loved ? 'fill-current text-white' : ''}`} />
                  </button>
                </div>
 
                {/* Info details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-brand-orange gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-white">{flavor.rating}</span>
                      <span className="text-white/60 text-[10px] font-medium">({likes.count})</span>
                    </div>
                    <span className="text-[10px] text-brand-yellow font-bold tracking-wider font-display uppercase">Artisanal Scoop</span>
                  </div>
 
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-white group-hover:text-brand-yellow transition-colors font-display line-clamp-1">{flavor.name}</h4>
                    <p className="text-xs text-white/85 leading-relaxed line-clamp-2">{flavor.description}</p>
                  </div>
 
                  {/* Highlights of raw ingredients */}
                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-white/10">
                    {flavor.ingredients.slice(0, 2).map((ing, iIdx) => (
                      <span key={iIdx} className="text-[10px] text-white/90 font-medium bg-white/10 px-2 py-0.5 rounded-md border border-white/5">
                        🌱 {ing}
                      </span>
                    ))}
                    {flavor.ingredients.length > 2 && (
                      <span className="text-[10px] text-white/60 font-semibold px-1 py-0.5">
                        +{flavor.ingredients.length - 2} more
                      </span>
                    )}
                  </div>
 
                  {/* Event Estimator Selection Actions */}
                  {onAddFlavorToQuote && (
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddFlavorToQuote(flavor.name);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 border ${
                          isAddedToQuote
                            ? 'bg-[#2EC4B6]/20 border-[#2EC4B6]/50 text-white hover:bg-[#2EC4B6]/30'
                            : 'bg-white/5 border-white/15 text-white hover:border-white/35 hover:bg-white/10'
                        }`}
                      >
                        {isAddedToQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#2EC4B6] stroke-[3]" />
                            Selected in Catering Quote
                          </>
                        ) : (
                          <>
                            <span>Add to Party Estimator</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
 
                </div>
              </motion.div>
            );
          })}
        </div>
 
        {/* Detailed Modal Popup for Story/Ingredients */}
        <AnimatePresence>
          {activeModalFlavor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalFlavor(null)}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
              ></motion.div>
 
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-neutral-950/85 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20 text-white"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalFlavor(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/15 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
 
                {/* Cover Image */}
                <div className="relative h-56 bg-neutral-900/40">
                  <img
                    src={activeModalFlavor.image}
                    alt={activeModalFlavor.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
                  
                  {/* Category Tags in Modal header */}
                  <div className="absolute bottom-4 left-6 flex flex-wrap gap-1.5">
                    {activeModalFlavor.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-[#FF4FA3] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
 
                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6 text-white">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{activeModalFlavor.rating} Rating (Based on real feedback)</span>
                    </div>
                    <h3 className="text-2xl font-black text-white font-display leading-tight">{activeModalFlavor.name}</h3>
                  </div>
 
                  <p className="text-sm text-white/95 leading-relaxed italic border-l-4 border-brand-yellow pl-4 font-serif">
                    "{activeModalFlavor.description}"
                  </p>
 
                  {/* Story section */}
                  {activeModalFlavor.originalStory && (
                    <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 space-y-1.5">
                      <h5 className="text-xs font-bold text-brand-yellow uppercase tracking-widest font-display flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                        Our Culinary Story
                      </h5>
                      <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-serif">
                        {activeModalFlavor.originalStory}
                      </p>
                    </div>
                  )}
 
                  {/* Ingredients Checklist */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-white/60 uppercase tracking-widest font-display flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-brand-yellow" />
                      Pure Premium Ingredients list
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalFlavor.ingredients.map((ing, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-xs font-semibold text-white bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                          <span className="text-brand-yellow shrink-0">✔</span>
                          <span className="truncate">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
 
                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center gap-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        if (onAddFlavorToQuote) {
                          onAddFlavorToQuote(activeModalFlavor.name);
                        }
                        setActiveModalFlavor(null);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all text-center ${
                        selectedFlavorsInQuote.includes(activeModalFlavor.name)
                          ? 'bg-[#2EC4B6] hover:bg-[#208B81] text-white border border-white/20'
                          : 'bg-[#FF4FA3] hover:bg-[#E22B80] text-white border border-white/20'
                      }`}
                    >
                      {selectedFlavorsInQuote.includes(activeModalFlavor.name) 
                        ? 'Remove from catering quote' 
                        : 'Select this flavor for Party Quote'}
                    </button>
                    
                    <button
                      onClick={() => setActiveModalFlavor(null)}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-sm font-bold transition-all"
                    >
                      Close
                    </button>
                  </div>
 
                </div>
 
              </motion.div>
            </div>
          )}
        </AnimatePresence>
 
      </div>
    </section>
  );
}
