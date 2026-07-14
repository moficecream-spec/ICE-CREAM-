import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, Mail, User, Clock, MessageSquare, ClipboardCheck, CheckCircle2, ChevronRight, Star, Heart } from 'lucide-react';
import { EventBooking } from '../types';
import { PARTY_PACKAGES } from '../data/flavors';

interface BookingFormProps {
  initialData?: {
    packageId: string;
    guestCount: number;
    flavors: string[];
    mojitoEnabled: boolean;
    cost: number;
  } | null;
  onClearInitialData?: () => void;
}

export default function BookingForm({ initialData, onClearInitialData }: BookingFormProps) {
  // Input fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [guestCount, setGuestCount] = useState(120);
  const [selectedPackageId, setSelectedPackageId] = useState('gold');
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [mojitoEnabled, setMojitoEnabled] = useState(true);
  const [notes, setNotes] = useState('');
  
  // Submit state
  const [showSuccess, setShowSuccess] = useState(false);
  const [newBookingId, setNewBookingId] = useState('');

  // Booking history stored locally
  const [bookings, setBookings] = useState<EventBooking[]>([]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mother_icecream_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load past bookings', e);
      }
    }
  }, []);

  // Pre-fill form if initialData is provided from Estimator
  useEffect(() => {
    if (initialData) {
      setGuestCount(initialData.guestCount);
      setSelectedPackageId(initialData.packageId);
      setSelectedFlavors(initialData.flavors);
      setMojitoEnabled(initialData.mojitoEnabled);
      setNotes(`Automatically prefilled quote with an estimated cost of ₹${initialData.cost.toLocaleString('en-IN')}`);
      
      // Auto scroll to Booking Form
      const element = document.getElementById('book-now');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialData]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !date) {
      alert('Please fill out all required fields: Name, Phone, and Event Date!');
      return;
    }

    const calculatedCost = calculateEstCost();
    const generatedId = `MOI-B-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: EventBooking = {
      id: generatedId,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || 'No email provided',
      eventDate: date,
      eventTime: time || 'Evening Slot',
      eventType: eventType,
      guestCount: guestCount,
      selectedFlavors: selectedFlavors,
      mojitoServiceEnabled: mojitoEnabled,
      notes: notes,
      createdAt: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending',
      estimatedCost: calculatedCost
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('mother_icecream_bookings', JSON.stringify(updatedBookings));

    setNewBookingId(generatedId);
    setShowSuccess(true);

    // Reset simple form fields but keep user details for convenience
    setDate('');
    setTime('');
    setNotes('');
    if (onClearInitialData) {
      onClearInitialData();
    }
  };

  // Cost calculator helper
  const calculateEstCost = () => {
    const pkg = PARTY_PACKAGES.find(p => p.id === selectedPackageId) || PARTY_PACKAGES[1];
    let cost = pkg.basePrice;
    if (guestCount > pkg.minGuests) {
      cost += (guestCount - pkg.minGuests) * pkg.perGuestPrice;
    }
    if (selectedPackageId === 'silver' && mojitoEnabled) {
      cost += 5000 + (guestCount * 40);
    }
    return cost;
  };

  // Quick action: Delete all local booking logs
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local inquiry request history? This will delete cached drafts only.')) {
      setBookings([]);
      localStorage.removeItem('mother_icecream_bookings');
    }
  };

  return (
    <section id="book-now" className="py-20 text-white relative z-10">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-white font-semibold tracking-wider text-xs uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <ClipboardCheck className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
            Book Date & Schedule Tasting
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Request an Event <span className="font-serif italic font-normal text-brand-pink">Catering Booking</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base">
            Lock in your event date! Once submitted, we will call you back within 2 hours to confirm your dates and schedule a private ice cream and mocktail tasting session.
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: The Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
            
            {/* Form Cover Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-pink via-brand-yellow to-[#2EC4B6]"></div>
 
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  
                  {initialData && (
                    <div className="bg-[#FF4FA3]/25 border border-[#FF4FA3]/40 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm text-white font-bold">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌟</span>
                        <span>Loaded quote configurations from estimator!</span>
                      </div>
                      <button 
                        type="button"
                        onClick={onClearInitialData || undefined}
                        className="underline text-brand-yellow hover:text-brand-orange"
                      >
                        Reset Quote
                      </button>
                    </div>
                  )}
 
                  {/* Customer Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Your Full Name <span className="text-brand-pink">*</span></label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priyanjali Sen"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                        />
                      </div>
                    </div>
 
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Your Phone Number <span className="text-brand-pink">*</span></label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 9007819261"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* Customer Email & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Your Email Address</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          placeholder="e.g. priya@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                        />
                      </div>
                    </div>
 
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Type of Celebration</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-neutral-950 border border-white/15 text-white rounded-xl focus:outline-none focus:border-brand-pink focus:bg-neutral-900 transition-all text-sm"
                      >
                        <option value="Wedding" className="bg-neutral-950 text-white">Traditional Wedding Reception</option>
                        <option value="Birthday" className="bg-neutral-950 text-white">Fun Birthday Party</option>
                        <option value="Corporate" className="bg-neutral-950 text-white">Corporate Annual Gala</option>
                        <option value="Anniversary" className="bg-neutral-950 text-white">Anniversary Celebration</option>
                        <option value="Private Event" className="bg-neutral-950 text-white">Exclusive Private Party</option>
                        <option value="Sangeet" className="bg-neutral-950 text-white">Sangeet / Mehendi Special</option>
                      </select>
                    </div>
                  </div>
 
                  {/* Date and Time selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Select Event Date <span className="text-brand-pink">*</span></label>
                      <div className="relative text-white">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 border border-white/15 text-white rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                        />
                      </div>
                    </div>
 
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Preferred Service Hours</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none">
                          <Clock className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. 6:30 PM to 10:30 PM"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* Interactive Package and Guest overview sync inputs if they manually alter it */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Catering Package Class</label>
                      <select
                        value={selectedPackageId}
                        onChange={(e) => {
                          setSelectedPackageId(e.target.value);
                          // Automatic Mojito sync on package change
                          if (e.target.value === 'gold' || e.target.value === 'platinum') {
                            setMojitoEnabled(true);
                          }
                        }}
                        className="w-full px-4 py-3 text-sm bg-neutral-950 border border-white/15 text-white rounded-xl focus:outline-none focus:border-brand-pink focus:bg-neutral-900 transition-all text-sm"
                      >
                        <option value="silver" className="bg-neutral-950 text-white">Silver Tier (Classic - Max 4 flavors)</option>
                        <option value="gold" className="bg-neutral-950 text-white">Gold Tier (Grand Wedding - Max 8 flavors + Live Mojito)</option>
                        <option value="platinum" className="bg-neutral-950 text-white">Platinum Tier (Royal Shahi - All 13 flavors + Cold-stone)</option>
                      </select>
                    </div>
 
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Expected Guests Count</label>
                      <input
                        type="number"
                        min="30"
                        max="2000"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 text-sm bg-white/5 border border-white/15 text-white rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                  </div>
 
                  {/* Mojito Status and selected flavors label info */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/15">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <p className="text-xs font-bold text-white">Live Mocktails Bar Service Status</p>
                      <p className="text-[10px] text-white/65">Gondhoraj Mint, Strawberry & Blueberry muddled live</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedPackageId !== 'silver') {
                            alert('Live Mojito service is always included for free in Gold & Platinum Packages!');
                            return;
                          }
                          setMojitoEnabled(!mojitoEnabled);
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 border border-white/10 ${
                          mojitoEnabled
                            ? 'bg-[#2EC4B6] text-white shadow-md'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {mojitoEnabled ? 'ENABLED (Muddled Live)' : 'DISABLED'}
                      </button>
                    </div>
                  </div>
 
                  {/* Special notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider block font-display">Special Platter Requests or Dietary Preferences</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Saffron Rabri must contain sugar-free options / Custom branding on napkins..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-4 text-sm bg-white/5 border border-white/15 text-white placeholder-white/35 rounded-xl focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all resize-none text-sm"
                    ></textarea>
                  </div>
 
                  {/* Submission Button */}
                  <button
                    type="submit"
                    className="w-full py-4 text-base font-bold bg-[#FF4FA3] hover:bg-[#E03E8A] text-white rounded-full transition-all duration-300 shadow-lg tracking-wider uppercase font-display"
                  >
                    Submit Event Catering Booking Request 💌
                  </button>
 
                  <p className="text-[10px] text-white/50 text-center leading-normal">
                    By submitting, you agree to receive a quick follow-up call from +91 9007819261 for date validation and price quotation. No payment is required right now.
                  </p>
 
                </motion.form>
              ) : (
                
                // GORGEOUS SUCCESS PANEL WITH SVG SPARKLING confetti
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center space-y-6"
                >
                  
                  {/* Confetti simulation using animated layered bubbles */}
                  <div className="relative w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-white/15 shadow-xl">
                    <CheckCircle2 className="w-12 h-12 text-[#2EC4B6] animate-bounce" />
                    
                    {/* Visual floating sparkles */}
                    <div className="absolute top-0 right-0 text-xl animate-pulse">✨</div>
                    <div className="absolute bottom-2 left-0 text-xl animate-pulse">💖</div>
                    <div className="absolute -top-2 left-6 text-xl">🎈</div>
                  </div>
 
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white font-display">Event Inquiry Submitted!</h3>
                    <p className="text-sm text-white/60 font-medium font-sans">Your request ID is <strong className="text-brand-pink font-mono font-bold bg-white/10 px-2.5 py-1 rounded border border-white/10 ml-1">{newBookingId}</strong></p>
                  </div>
 
                  <p className="text-sm text-white/85 max-w-md mx-auto leading-relaxed">
                    Thank you! We have logged your catering preferences. A coordinator from <strong className="text-brand-pink">Mother of Ice-cream Kolkata</strong> will call you back at your number within <strong className="text-brand-yellow font-bold">2 hours</strong> to schedule your free pre-event tasting session at our kitchen.
                  </p>
 
                  <div className="bg-white/5 border border-white/15 rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto shadow-inner">
                    <h4 className="text-xs font-black uppercase text-brand-pink tracking-widest font-display">What Happens Next?</h4>
                    <div className="space-y-2.5 text-xs text-white/80">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-brand-yellow font-display">1.</span>
                        <p>We review your date availability on our master event calendar.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-brand-yellow font-display">2.</span>
                        <p>We contact you via call or WhatsApp to confirm your flavor choices.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-brand-yellow font-display">3.</span>
                        <p>We host a live dessert tasting meeting at your convenience to freeze the platter.</p>
                      </div>
                    </div>
                  </div>
 
                  <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2">
                    <a
                      href={`https://wa.me/919007819261?text=Hi%20Mother%20of%20Ice-cream%20Kolkata!%20I%20just%20submitted%20a%20catering%20booking%20request%20with%20ID%20${newBookingId}.%20Please%20verify%20date%20availability.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-[#2EC4B6]/85 hover:bg-[#2EC4B6] border border-white/10 text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>Ping on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="py-3 px-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs font-bold transition-all text-center"
                    >
                      New Inquiry
                    </button>
                  </div>
 
                </motion.div>
              )}
            </AnimatePresence>
 
          </div>
 
          {/* Right Column: Live Booking Inquiry Logs Cache (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950/75 backdrop-blur-xl text-neutral-100 rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/15 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h4 className="font-serif text-base font-bold text-white">Your Inquiry Cache</h4>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-display">Live Tracking Status</p>
              </div>
              {bookings.length > 0 && (
                <button 
                  onClick={handleClearHistory}
                  className="text-[10px] font-bold text-white/40 hover:text-brand-pink transition-colors"
                >
                  Clear history
                </button>
              )}
            </div>
 
            {bookings.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <span className="text-3xl block filter grayscale opacity-60">📁</span>
                <p className="text-xs text-white/60">No active event inquiries found on this browser cached state.</p>
                <p className="text-[10px] text-white/40 leading-normal">Your submitted party inquiries will be logged here with simulation statuses like "Tasting session" or "Confirmed".</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-brand-pink">{b.id}</span>
                        <p className="text-xs font-extrabold text-white">{b.customerName}</p>
                      </div>
                      
                      {/* Simulating live statuses */}
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FF4FA3]/25 text-[#FF4FA3] border border-[#FF4FA3]/30 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-brand-pink animate-ping"></span>
                        Tasting Scheduled
                      </span>
                    </div>
 
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-white/60">
                      <div>
                        <p className="text-white/40 font-bold uppercase font-display">Date of Event</p>
                        <p className="font-semibold text-white">{b.eventDate}</p>
                      </div>
                      <div>
                        <p className="text-white/40 font-bold uppercase font-display">Expected Guests</p>
                        <p className="font-semibold text-white">{b.guestCount} Guests</p>
                      </div>
                      <div>
                        <p className="text-white/40 font-bold uppercase font-display">Selected Tier</p>
                        <p className="font-semibold text-white capitalize">{b.eventType}</p>
                      </div>
                      <div>
                        <p className="text-white/40 font-bold uppercase font-display">Est Platter Cost</p>
                        <p className="font-bold text-brand-yellow">₹{b.estimatedCost.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
 
                    {b.selectedFlavors.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-[8px] uppercase font-bold text-white/50 mb-1 font-display">Locked Flavors platter:</p>
                        <div className="flex flex-wrap gap-1">
                          {b.selectedFlavors.map((fl, fIdx) => (
                            <span key={fIdx} className="bg-white/10 text-white text-[8px] px-1.5 py-0.5 rounded font-semibold border border-white/10">
                              🍨 {fl}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
 
                    <div className="text-[9px] text-white/40 flex justify-between items-center pt-1">
                      <span>Submitted: {b.createdAt}</span>
                      <a 
                        href={`https://wa.me/919007819261?text=Hi%20Mother%20of%20Ice-cream!%20Checking%20in%20on%20my%20event%20booking%20request%20with%20ID%20${b.id}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2EC4B6] font-bold hover:underline"
                      >
                        Follow up
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
 
            {/* Quick dial card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF4FA3]/15 text-brand-pink flex items-center justify-center text-sm border border-white/10">
                📞
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-white/55 uppercase font-bold tracking-wider font-display">Direct Hotline Dialer</p>
                <a href="tel:+919007819261" className="text-sm font-bold text-brand-yellow hover:text-brand-orange transition-colors">Call +91 9007819261</a>
              </div>
            </div>
 
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
