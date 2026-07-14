import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Printer, Check, Info, Users, PlusCircle, AlertCircle } from 'lucide-react';
import { PARTY_PACKAGES, ICE_CREAM_FLAVORS } from '../data/flavors';
import { PartyPackage } from '../types';

interface OrderEstimatorProps {
  selectedFlavors: string[];
  onToggleFlavor: (flavorName: string) => void;
  onOpenBookingFormWithData: (data: {
    packageId: string;
    guestCount: number;
    flavors: string[];
    mojitoEnabled: boolean;
    cost: number;
  }) => void;
}

export default function OrderEstimator({ selectedFlavors, onToggleFlavor, onOpenBookingFormWithData }: OrderEstimatorProps) {
  const [selectedPackage, setSelectedPackage] = useState<PartyPackage>(PARTY_PACKAGES[1]); // Gold default
  const [guestCount, setGuestCount] = useState<number>(120);
  const [addMojitoToSilver, setAddMojitoToSilver] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Synchronize package constraints
  const maxFlavorsLimit = selectedPackage.id === 'silver' ? 4 : selectedPackage.id === 'gold' ? 8 : 13;
  const isMojitoIncluded = selectedPackage.id === 'gold' || selectedPackage.id === 'platinum';

  // Calculate pricing whenever state changes
  useEffect(() => {
    let cost = selectedPackage.basePrice;
    const baseGuests = selectedPackage.minGuests;

    if (guestCount > baseGuests) {
      const extraGuests = guestCount - baseGuests;
      cost += extraGuests * selectedPackage.perGuestPrice;
    }

    // Add Mojito service flat fee to Silver package if enabled manually
    if (selectedPackage.id === 'silver' && addMojitoToSilver) {
      cost += 5000 + (guestCount * 40); // 5000 base + 40 per guest for premium drinks muddled live
    }

    setTotalCost(cost);
  }, [selectedPackage, guestCount, addMojitoToSilver]);

  // Handle choosing a package
  const handleSelectPackage = (pkg: PartyPackage) => {
    setSelectedPackage(pkg);
    
    // Set guest count to minimum guest constraint if below
    if (guestCount < pkg.minGuests) {
      setGuestCount(pkg.minGuests);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Hi Mother of Ice-cream Kolkata! I would like to book a party service for my event. Here are my estimated quote details:
- Package: ${selectedPackage.name}
- Expected Guest Count: ${guestCount} Guests
- Premium Flavors Selected: ${selectedFlavors.length > 0 ? selectedFlavors.join(', ') : 'None yet (Need recommendations)'}
- Live Mojito Mocktail Station: ${isMojitoIncluded || (selectedPackage.id === 'silver' && addMojitoToSilver) ? 'Yes (Muddled Live)' : 'No'}
- Estimated Total Cost: Rs. ${totalCost.toLocaleString('en-IN')} (approximate)

Please let me know if the date is available to schedule a tasting session.`
    );
    return `https://wa.me/919007819261?text=${text}`;
  };

  // Quick helper to select/deselect flavors inside the calculator
  const handleSelectQuickFlavor = (flavorName: string) => {
    if (selectedFlavors.includes(flavorName)) {
      onToggleFlavor(flavorName);
    } else {
      if (selectedFlavors.length >= maxFlavorsLimit) {
        alert(`Your current package ("${selectedPackage.name}") allows a maximum of ${maxFlavorsLimit} flavors. Please upgrade your package or deselect a flavor first.`);
        return;
      }
      onToggleFlavor(flavorName);
    }
  };

  // Trigger print mechanism
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="estimator" className="py-20 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
            Transparent Pricing Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Custom Party <span className="font-serif italic font-normal text-brand-pink">Order Estimator</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            No hidden costs! Customize your expected guest counts, choose your tier, tick your favorite 13 flavors, and watch the pricing calculate instantly for your event.
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Configuration Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Choose Package Tier */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-xs font-bold font-display border border-white/20">1</span>
                <h3 className="text-lg font-black text-white uppercase tracking-wide font-display">Select Catering Package Tier</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PARTY_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => handleSelectPackage(pkg)}
                      className={`relative text-left p-5 rounded-[24px] border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#FF4FA3]/20 border-brand-pink ring-2 ring-[#FF4FA3]/25 shadow-xl scale-[1.01] backdrop-blur-md'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white'
                      }`}
                    >
                      {/* Popular Badge */}
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white bg-brand-pink rounded-full">
                        {pkg.badge}
                      </span>
                      
                      <p className="text-sm font-black text-white mt-2 font-display">{pkg.name}</p>
                      <p className="text-[11px] text-white/70 mt-1 line-clamp-2 leading-relaxed">{pkg.description}</p>
                      
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-baseline gap-1.5">
                        <span className="text-xs text-white/45 font-medium">From</span>
                        <span className="text-lg font-extrabold text-white">₹{pkg.basePrice.toLocaleString('en-IN')}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Step 2: Slider for Guest Count */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-xs font-bold font-display border border-white/20">2</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide font-display">Adjust Expected Guest Count</h3>
                </div>
                <div className="px-4 py-1 rounded-full bg-white/10 text-brand-pink border border-white/20 font-black text-sm sm:text-base backdrop-blur-md">
                  {guestCount} Guests
                </div>
              </div>
 
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/20 shadow-xl space-y-4">
                <input
                  type="range"
                  min="30"
                  max="1000"
                  step="10"
                  value={guestCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < selectedPackage.minGuests) {
                      alert(`The "${selectedPackage.name}" package requires a minimum guest count of ${selectedPackage.minGuests} guests.`);
                      setGuestCount(selectedPackage.minGuests);
                    } else {
                      setGuestCount(value);
                    }
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-pink"
                />
                
                <div className="flex justify-between text-[11px] text-white/50 font-bold uppercase tracking-wider">
                  <span>30 Guests (Min limit)</span>
                  <span>500 Guests</span>
                  <span>1000+ Guests (Ultra Mega Event)</span>
                </div>
 
                {/* Constraint Alert */}
                {guestCount < selectedPackage.minGuests && (
                  <div className="flex items-center gap-2 text-xs text-brand-pink font-semibold bg-white/10 p-3 rounded-2xl border border-white/15">
                    <AlertCircle className="w-4 h-4 text-brand-pink" />
                    <span>Selected count below package minimum ({selectedPackage.minGuests} guests). Resetting.</span>
                  </div>
                )}
              </div>
            </div>
 
            {/* Step 3: Select Preferred Flavors with count indicator */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-xs font-bold font-display border border-white/20">3</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide font-display">Select Flavors for your Platter</h3>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs font-bold ${
                  selectedFlavors.length > maxFlavorsLimit 
                    ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                    : 'bg-white/10 border-white/25 text-brand-yellow'
                }`}>
                  {selectedFlavors.length} / {maxFlavorsLimit} Scoops Chosen
                </div>
              </div>
 
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/20 shadow-xl space-y-3">
                <p className="text-xs text-white/70 font-medium leading-relaxed">
                  Choose your scoops from Kolkata’s top 13 recipes below. Your selected tier allows up to <strong className="text-brand-yellow font-bold">{maxFlavorsLimit} scoops</strong>. You can click to select/deselect them.
                </p>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {ICE_CREAM_FLAVORS.map(flavor => {
                    const isChecked = selectedFlavors.includes(flavor.name);
                    return (
                      <button
                        key={flavor.id}
                        onClick={() => handleSelectQuickFlavor(flavor.name)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all duration-200 ${
                          isChecked
                            ? 'bg-[#FF4FA3]/25 border-brand-pink text-white font-bold shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/90'
                        }`}
                      >
                        <span className="truncate">{flavor.name}</span>
                        <div className={`w-4.5 h-4.5 rounded-full border shrink-0 flex items-center justify-center ${
                          isChecked 
                            ? 'bg-brand-pink border-brand-pink text-white' 
                            : 'border-white/20'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
 
                {selectedFlavors.length === 0 && (
                  <p className="text-[10px] text-brand-orange font-bold flex items-center gap-1 pt-1">
                    ⚠️ Don’t worry! If no flavors are selected, we will help you draft a balanced platter during the tasting session.
                  </p>
                )}
              </div>
            </div>
 
            {/* Optional Mojito Service Add-on if Silver package is selected */}
            {selectedPackage.id === 'silver' && (
              <div className="bg-[#2EC4B6]/10 backdrop-blur-md rounded-[32px] border border-[#2EC4B6]/25 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-black text-brand-green uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 font-display">
                    🍃 Add Live Mojito Counter?
                  </h4>
                  <p className="text-xs text-white/75 max-w-md leading-normal">
                    Give your Silver package birthday party an energetic boost with 3 custom muddled mojitos (Gondhoraj, Mint, Strawberry) prepared by 1 dedicated mixologist.
                  </p>
                </div>
                <button
                  onClick={() => setAddMojitoToSilver(!addMojitoToSilver)}
                  className={`px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-sm ${
                    addMojitoToSilver
                      ? 'bg-[#2EC4B6] hover:bg-[#208B81] text-white border border-white/10'
                      : 'bg-white/10 border border-white/15 text-white hover:bg-white/20'
                  }`}
                >
                  {addMojitoToSilver ? '✅ Included in Quote' : '➕ Add for ₹5,000'}
                </button>
              </div>
            )}
 
          </div>
 
          {/* Right Column: Custom Quotation Sheet Mockup (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            
            {/* The Bill / Invoice sheet wrapper */}
            <div className="bg-neutral-950/75 backdrop-blur-xl text-neutral-100 rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/15 space-y-6 relative print:bg-white print:text-black print:border-none print:shadow-none">
              
              {/* Receipt Header */}
              <div className="text-center space-y-1 pb-4 border-b border-white/10">
                <h4 className="font-serif text-lg font-bold tracking-tight text-white flex items-center justify-center gap-1">
                  <span>Mother of Ice-cream Kolkata</span>
                </h4>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest font-display">Official Catering Quote Sheet</p>
                <div className="text-[9px] text-white/40 font-mono mt-1">Ref No: MOI-{Math.floor(100000 + Math.random() * 900000)} | Date: 2026-07-14</div>
              </div>
 
              {/* Receipt Line Items */}
              <div className="space-y-3.5 text-sm">
                
                {/* Package Base Item */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-white">{selectedPackage.name} Package</p>
                    <p className="text-[10px] text-white/60">Includes base catering setup up to {selectedPackage.minGuests} guests</p>
                  </div>
                  <span className="font-bold text-white">₹{selectedPackage.basePrice.toLocaleString('en-IN')}</span>
                </div>
 
                {/* Additional Guests Item */}
                {guestCount > selectedPackage.minGuests && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white/90">Additional Guests Fee</p>
                      <p className="text-[10px] text-white/60">{guestCount - selectedPackage.minGuests} more guests (at ₹{selectedPackage.perGuestPrice} / guest)</p>
                    </div>
                    <span className="font-bold text-white">
                      ₹{((guestCount - selectedPackage.minGuests) * selectedPackage.perGuestPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
 
                {/* Mojito counter add-on specifically for Silver */}
                {selectedPackage.id === 'silver' && addMojitoToSilver && (
                  <div className="flex justify-between items-start text-brand-green">
                    <div>
                      <p className="font-bold">Live Mojito Counter Add-on</p>
                      <p className="text-[10px] text-[#2EC4B6]/80">Flat ₹5,000 base + ₹40 per guest drink supplies</p>
                    </div>
                    <span className="font-bold">
                      ₹{(5000 + guestCount * 40).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
 
                {/* Included benefits indicators */}
                <div className="pt-2 pb-2 space-y-1.5 border-t border-white/10">
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Catering Benefits Included:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-white/90">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                      <span>Max {maxFlavorsLimit} Premium Flavors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                      <span>{selectedPackage.id === 'silver' ? 'Eco Cups & spoons' : 'Premium luxury platters'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                      <span>Professional Uniformed Servers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                      <span>{isMojitoIncluded || addMojitoToSilver ? 'Live Mojito Bar Included' : 'Ice Cream Counter Only'}</span>
                    </div>
                  </div>
                </div>
 
                {/* Selected Flavors List in receipt */}
                <div className="pt-3 border-t border-white/10">
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider mb-1.5">Flavors requested ({selectedFlavors.length}):</p>
                  {selectedFlavors.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedFlavors.map((fl, fIdx) => (
                        <span key={fIdx} className="bg-white/10 border border-white/10 text-[10px] font-semibold text-white px-2 py-0.5 rounded">
                          🍧 {fl}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-white/40 italic">No flavors locked in yet. Click "Add to Estimator" on any card above!</p>
                  )}
                </div>
 
              </div>
 
              {/* Total Summary Block */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <div className="flex justify-between items-center text-lg font-black text-white">
                  <span>Estimated Event Total:</span>
                  <span className="text-2xl text-brand-yellow font-display font-black">₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-white/50 leading-normal text-right">
                  *Price is fully inclusive of standard materials, servers, and set-up fees inside Kolkata municipal limits. Outstation travel may apply.
                </p>
              </div>
 
              {/* Action conversions */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onOpenBookingFormWithData({
                    packageId: selectedPackage.id,
                    guestCount: guestCount,
                    flavors: selectedFlavors,
                    mojitoEnabled: isMojitoIncluded || (selectedPackage.id === 'silver' && addMojitoToSilver),
                    cost: totalCost
                  })}
                  className="w-full py-3 bg-[#FF4FA3] hover:bg-[#E03E8A] text-white rounded-xl text-xs font-bold transition-all text-center tracking-widest uppercase hover:-translate-y-0.5 shadow-md shadow-pink-950/20 font-display"
                >
                  🗓️ Lock Date & Request Tasting session
                </button>
                
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#2EC4B6]/80 hover:bg-[#2EC4B6] border border-white/10 text-white rounded-xl text-xs font-bold transition-all text-center tracking-wide flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Estimate to WhatsApp</span>
                </a>
 
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="w-full py-2 bg-transparent hover:bg-white/10 text-white/60 hover:text-white text-[11px] font-bold transition-all rounded-lg flex items-center justify-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save Quotation PDF</span>
                </button>
              </div>
 
            </div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
