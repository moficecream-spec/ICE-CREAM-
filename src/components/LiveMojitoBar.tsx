import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, Sparkles, RefreshCw, MessageSquare, Plus, Check, Play, Info } from 'lucide-react';
import { MOJITO_INGREDIENTS } from '../data/flavors';
import { MojitoIngredient } from '../types';

interface LiveMojitoBarProps {
  mojitoImageSrc: string;
}

export default function LiveMojitoBar({ mojitoImageSrc }: LiveMojitoBarProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<MojitoIngredient[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [drinkCreated, setDrinkCreated] = useState<boolean>(false);
  const [customDrinkName, setCustomDrinkName] = useState('');
  const [customDrinkDesc, setCustomDrinkDesc] = useState('');

  // Handle adding/removing ingredient
  const handleToggleIngredient = (ingredient: MojitoIngredient) => {
    if (drinkCreated) {
      // Reset if a drink was already created to start fresh
      setDrinkCreated(false);
    }

    if (selectedIngredients.some(i => i.id === ingredient.id)) {
      setSelectedIngredients(prev => prev.filter(i => i.id !== ingredient.id));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  // Generate dynamic color based on selected ingredients mix
  const getGlassColor = () => {
    if (selectedIngredients.length === 0) return 'rgba(255, 255, 255, 0.15)';
    
    // Look for fruits or sweeteners which have strong pigmentation
    const hasBlueberry = selectedIngredients.some(i => i.id === 'blueberry');
    const hasStrawberry = selectedIngredients.some(i => i.id === 'strawberry');
    const hasRose = selectedIngredients.some(i => i.id === 'gulkand-syrup');
    const hasLimeOnly = selectedIngredients.every(i => i.type === 'base' || i.type === 'herb' || i.type === 'sweetener' && i.id !== 'gulkand-syrup');

    if (hasBlueberry && hasStrawberry) return 'rgba(107, 33, 168, 0.75)'; // Purple mix
    if (hasBlueberry) return 'rgba(59, 130, 246, 0.75)'; // Rich Indigo Blueberry
    if (hasStrawberry) return 'rgba(239, 68, 68, 0.75)'; // Crimson Strawberry
    if (hasRose) return 'rgba(244, 63, 94, 0.75)'; // Elegant Rose pink
    if (hasLimeOnly) return 'rgba(16, 185, 129, 0.4)'; // Vibrant fresh lime green
    
    return 'rgba(245, 245, 244, 0.5)'; // default translucent soda
  };

  // Handle shaking simulator
  const handleShakeDrink = () => {
    if (selectedIngredients.length === 0) return;
    setIsShaking(true);
    setDrinkCreated(false);

    setTimeout(() => {
      setIsShaking(false);
      setDrinkCreated(true);
      generateDrinkProperties();
    }, 1500);
  };

  // Logic to dynamically name and describe the custom crafted mocktail
  const generateDrinkProperties = () => {
    const hasGondhoraj = selectedIngredients.some(i => i.id === 'lime');
    const hasBlueberry = selectedIngredients.some(i => i.id === 'blueberry');
    const hasStrawberry = selectedIngredients.some(i => i.id === 'strawberry');
    const hasGulkand = selectedIngredients.some(i => i.id === 'gulkand-syrup');
    const hasBlackSalt = selectedIngredients.some(i => i.id === 'rock-salt');

    let adjective = 'Royal';
    let fruitNoun = 'Soda';
    let suffix = 'Mocktail';

    if (hasGondhoraj) adjective = 'Gondhoraj Aroma';
    if (hasGulkand) adjective = 'Shahi Gulkand';
    if (hasBlackSalt && hasGondhoraj) adjective = 'Kolkata Chatpata Gondhoraj';

    if (hasBlueberry && hasStrawberry) {
      fruitNoun = 'Double Berry';
    } else if (hasBlueberry) {
      fruitNoun = 'Blueberry Forest';
    } else if (hasStrawberry) {
      fruitNoun = 'Strawberry Orchard';
    } else if (hasGulkand) {
      fruitNoun = 'Damask Rose';
    } else {
      fruitNoun = 'Mint Crisp';
    }

    if (hasBlackSalt) {
      suffix = 'Khatta Punch';
    } else if (selectedIngredients.some(i => i.id === 'club-soda')) {
      suffix = 'Sparkling Mojito';
    } else {
      suffix = 'Cooler Refresh';
    }

    const drinkName = `${adjective} ${fruitNoun} ${suffix}`;
    
    // Dynamic Description
    let desc = `An exquisite muddled blend containing ${selectedIngredients.map(i => i.name.split('&')[0].trim()).join(', ')}. `;
    if (hasBlackSalt) {
      desc += 'Featuring the legendary Kolkata Bit Nun (black salt) which gives it a savory, tongue-tingling salty-sour kick!';
    } else {
      desc += 'Slow-pressed and double strained to maximize cooling aromatics. Truly a majestic addition to wedding menus.';
    }

    setCustomDrinkName(drinkName);
    setCustomDrinkDesc(desc);
  };

  // Reset drink creator
  const handleReset = () => {
    setSelectedIngredients([]);
    setDrinkCreated(false);
    setCustomDrinkName('');
    setCustomDrinkDesc('');
  };

  const shareDrinkOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Mother of Ice-cream Kolkata! I just designed a custom mocktail on your website called "${customDrinkName}". Ingredients: ${selectedIngredients.map(i => i.emoji + ' ' + i.name).join(', ')}. I would love to include this in my upcoming party catering menu! Please share details.`
    );
    return `https://wa.me/919007819261?text=${text}`;
  };

  return (
    <section id="mojito-bar" className="py-20 text-white relative z-10">
      
      <div className="absolute top-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Wine className="w-3.5 h-3.5 text-brand-yellow animate-pulse" />
            Live Event Counter Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Grand Live <span className="font-serif italic font-normal text-brand-yellow">Mojito & Mocktail</span> Service
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Turn your celebration into a high-energy culinary show! Our expert bartenders dress in premium uniforms and muddle fresh summer drinks in front of your guests. Try our interactive drink mixer below!
          </p>
        </div>
 
        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Traditional Info & Beautiful Food Photo (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/20 shadow-2xl space-y-6 flex-1 flex flex-col justify-between text-white">
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-yellow bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full inline-block font-display">Event Showstopper</span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Unbeatable Thirst Quenchers for Kolkata Weather
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Heavy deep-fried wedding food needs a clean, acidic, sparkling palette cleanser. Our live mojito and mocktail service provides that much-needed relief. Squeezed with pristine Gondhoraj limes, bruised fresh pudina, and a touch of secret spices.
                </p>
 
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-white/60 tracking-wider font-display">What We Provide at the Live Counter:</h4>
                  {[
                    'Luxury illuminated mobile glass bar counter',
                    'Crushed ice machine & premium glassware/disposables',
                    'Unlimited fresh herbs, imported berries, and fruit pulps',
                    'Trained certified mocktail mixologists and servers',
                    'Interactive Custom Menu Boards designed for your theme'
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold text-white/90">
                      <span className="text-brand-green font-bold text-sm leading-none shrink-0">✨</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Generated Image Asset */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner border border-white/20 mt-6 shrink-0">
                <img
                  src={mojitoImageSrc}
                  alt="Mother of Ice Cream Kolkata live mocktails"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <p className="absolute bottom-3 left-4 text-white text-xs font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Kolkata Wedding Catering Live Setup
                </p>
              </div>
 
            </div>
          </div>
 
          {/* Right Column: Build-your-own Drink Interactive Game (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-md rounded-[32px] border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
              
              {/* Virtual Glass Canvas Area (5 cols on md) */}
              <div className="md:col-span-5 bg-gradient-to-b from-stone-900 via-neutral-950 to-stone-900 p-6 flex flex-col items-center justify-between relative overflow-hidden min-h-[300px] md:min-h-0 border-r border-white/10">
                
                {/* Floating bubbles animation backdrop */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
 
                <div className="text-center z-10">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 font-display">Live Simulator</span>
                  <h4 className="text-sm font-extrabold text-white">Your Custom Glass</h4>
                </div>
 
                {/* Simulated Glass */}
                <div className="relative w-36 h-60 z-10 my-4">
                  {/* Outer Glass Frame */}
                  <div className="absolute inset-x-0 inset-y-0 border-x-4 border-b-8 border-t-2 border-white/20 rounded-b-3xl shadow-inner flex flex-col justify-end p-2 overflow-hidden bg-white/5 backdrop-blur-xs">
                    
                    {/* Liquid dynamic block */}
                    <motion.div
                      animate={isShaking ? {
                        y: [0, -30, 20, -10, 0],
                        rotate: [0, -5, 5, -2, 0]
                      } : { y: 0 }}
                      transition={{ repeat: isShaking ? Infinity : 0, duration: 0.3 }}
                      style={{ 
                        height: selectedIngredients.length > 0 ? `${Math.min(30 + selectedIngredients.length * 15, 95)}%` : '0%',
                        backgroundColor: getGlassColor() 
                      }}
                      className="w-full rounded-b-2xl relative transition-all duration-500 shadow-lg"
                    >
                      {/* Ice cubes floating inside liquid */}
                      {selectedIngredients.length > 0 && (
                        <>
                          <div className="absolute bottom-8 left-4 w-6 h-6 bg-white/30 border border-white/40 rounded-md rotate-12 flex items-center justify-center text-[8px] font-bold text-white/60">🧊</div>
                          <div className="absolute top-12 right-6 w-5 h-5 bg-white/20 border border-white/30 rounded-md -rotate-12 flex items-center justify-center text-[6px] font-bold text-white/50">🧊</div>
                          <div className="absolute bottom-20 right-8 w-5.5 h-5.5 bg-white/25 border border-white/40 rounded-md rotate-45 flex items-center justify-center text-[7px] font-bold text-white/60">🧊</div>
                        </>
                      )}
 
                      {/* Display added ingredient emojis floating in drink */}
                      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1.5 p-4 overflow-hidden">
                        {selectedIngredients.map(item => (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            key={item.id} 
                            className="text-lg filter drop-shadow-md select-none"
                            title={item.name}
                          >
                            {item.emoji}
                          </motion.span>
                        ))}
                      </div>
 
                      {/* Sparkle/Fizz effect */}
                      {selectedIngredients.length > 0 && (
                        <div className="absolute inset-x-0 top-0 h-4 bg-white/40 blur-xs rounded-full"></div>
                      )}
                    </motion.div>
 
                  </div>
 
                  {/* Straw */}
                  {selectedIngredients.length > 0 && (
                    <div className="absolute -top-10 left-16 w-2.5 h-52 bg-gradient-to-b from-brand-pink via-white to-brand-pink rounded-full -rotate-12 transform-gpu origin-bottom shadow-md z-20"></div>
                  )}
 
                  {/* Glass rim Gondhoraj lemon wheel decoration */}
                  {selectedIngredients.some(i => i.id === 'lime') && (
                    <div className="absolute -top-3 left-4 w-10 h-10 rounded-full border-4 border-emerald-500 bg-emerald-200 shadow-md flex items-center justify-center text-[8px] font-bold text-emerald-800 z-30 rotate-45 select-none font-display">
                      🍋
                    </div>
                  )}
                </div>
 
                {/* Interactive Status Indicator */}
                <div className="text-center z-10 w-full px-2">
                  {selectedIngredients.length === 0 ? (
                    <p className="text-xs text-neutral-400 font-medium">Add ingredients from list to begin mix...</p>
                  ) : isShaking ? (
                    <span className="text-xs font-bold text-brand-green animate-pulse flex items-center justify-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> MUDDLING & SHAKING VIGOROUSLY...
                    </span>
                  ) : drinkCreated ? (
                    <p className="text-xs text-emerald-400 font-bold">✨ Drink Crafted Successfully! ✨</p>
                  ) : (
                    <p className="text-xs text-neutral-300 font-medium">Ready to shake with {selectedIngredients.length} ingredients</p>
                  )}
                </div>
 
              </div>
 
              {/* Recipe/Ingredients Selection (7 cols on md) */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6 bg-white/5 backdrop-blur-md">
                
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                    <h4 className="text-sm font-extrabold uppercase text-white/60 tracking-wider font-display">Select Ingredients:</h4>
                    {selectedIngredients.length > 0 && (
                      <button 
                        onClick={handleReset}
                        className="text-[11px] font-bold text-brand-yellow hover:text-brand-orange hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Clear glass
                      </button>
                    )}
                  </div>
 
                  {/* Ingredients Checklist Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MOJITO_INGREDIENTS.map(item => {
                      const isSelected = selectedIngredients.some(i => i.id === item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleToggleIngredient(item)}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-left border text-xs font-semibold transition-all duration-300 select-none ${
                            isSelected
                              ? 'bg-[#2EC4B6]/25 border-[#2EC4B6]/55 text-white font-bold scale-[1.02]'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{item.emoji}</span>
                            <span className="truncate">{item.name.replace('Kolkata ', '').replace('Fresh ', '')}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                            isSelected 
                              ? 'bg-[#2EC4B6] border-[#2EC4B6] text-white' 
                              : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                {/* Shaker/Results trigger */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  
                  <AnimatePresence mode="wait">
                    {drinkCreated && !isShaking ? (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20 space-y-2 text-white"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-black text-brand-yellow font-display">{customDrinkName}</h5>
                          <span className="text-[9px] uppercase font-black tracking-widest text-[#2EC4B6] px-2.5 py-0.5 bg-white/10 border border-[#2EC4B6]/30 rounded-full">Custom Crafted</span>
                        </div>
                        <p className="text-xs text-white/85 leading-relaxed font-sans">{customDrinkDesc}</p>
                        
                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <a
                            href={shareDrinkOnWhatsApp()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 px-3 bg-[#2EC4B6]/85 hover:bg-[#2EC4B6] text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-md border border-white/10"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Add to WhatsApp Catering Order</span>
                          </a>
                          <button
                            onClick={handleReset}
                            className="py-2 px-3 bg-white/15 border border-white/15 text-white rounded-xl text-xs font-bold hover:bg-white/25 transition-all text-center"
                          >
                            Craft Another
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="action" className="space-y-3">
                        <button
                          disabled={selectedIngredients.length === 0 || isShaking}
                          onClick={handleShakeDrink}
                          className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
                            selectedIngredients.length === 0
                              ? 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed shadow-none'
                              : 'bg-[#2EC4B6] hover:bg-[#208B81] border border-white/20 text-white shadow-lg hover:-translate-y-0.5'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          <span>{isShaking ? 'Mixing ingredients...' : 'SHAKE VIGOROUSLY! 🧊'}</span>
                        </button>
                        <p className="text-[11px] text-white/60 text-center flex items-center justify-center gap-1">
                          <Info className="w-3 h-3 text-brand-yellow" /> Select at least one ingredient to start muddling.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
 
                </div>
 
              </div>
 
            </div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
