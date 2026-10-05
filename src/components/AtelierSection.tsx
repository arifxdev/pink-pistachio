import React from 'react';
import { Clock, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react';

interface AtelierSectionProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const AtelierSection: React.FC<AtelierSectionProps> = ({
  onOpenReservation,
  onOpenMenu,
}) => {
  return (
    <section id="atelier" className="py-16 md:py-24 bg-[#FFF6F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Boutique Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Interior Photo */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#FCE8ED]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                  alt="Pink Pistachio Patisserie interior boutique"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback container */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#DE537E] to-[#E8B4C2] flex items-center justify-center p-6 text-center text-white">
                  <span className="font-serif text-2xl font-bold">Pink Pistachio Salon de Thé</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#2D101E]/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#F9D5E0] font-semibold">
                    The Salon Experience
                  </span>
                  <h4 className="font-serif text-xl font-bold mt-0.5">
                    Mayfair & Parisian Heritage
                  </h4>
                </div>
              </div>

              {/* Floating Chef Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#F5D5DE] max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2 text-[#DE537E] mb-1">
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span className="text-[11px] font-bold tracking-wider uppercase">Artisanal Craft</span>
                </div>
                <p className="text-xs text-[#521326] font-medium leading-snug">
                  Baked fresh at dawn every single morning.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Narrative & Boutique Information (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C73463] mb-3">
              <span className="w-6 h-[1px] bg-[#DE537E]"></span>
              <span>Our Philosophy & Atelier</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3B0E1E] tracking-tight leading-[1.14]">
              More Than Just Patisserie
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#521326] font-sans leading-relaxed">
              At Pink Pistachio & Patisserie, every bake is a daily culinary ritual crafted with obsessive reverence. We source pure D.O.P. Bronte green pistachios from volcanic Sicilian slopes, churned Normandy butter, and hand-harvested organic rose petals to curate an unforgettable sensory escape.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#711935] font-sans leading-relaxed">
              Whether you drop in for your morning warm pistachio-cream croissant or gather with loved ones for an afternoon high-tea service, our salon is a haven of elegance and pink warmth.
            </p>

            {/* Atelier Key Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FCEDF2] border border-[#F5D5DE]">
                <h4 className="font-serif text-base font-bold text-[#3B0E1E] flex items-center gap-2">
                  <span className="text-xs text-[#DE537E] font-mono">01.</span>
                  Pure Bronte Pistachio
                </h4>
                <p className="text-xs text-[#711935] mt-1 font-sans">
                  Direct harvest from Mount Etna, unadulterated green gold without artificial food coloring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FCEDF2] border border-[#F5D5DE]">
                <h4 className="font-serif text-base font-bold text-[#3B0E1E] flex items-center gap-2">
                  <span className="text-xs text-[#DE537E] font-mono">02.</span>
                  French AOP Churned Butter
                </h4>
                <p className="text-xs text-[#711935] mt-1 font-sans">
                  Slow 72-hour lamination delivers the signature shattering, melt-in-mouth flake.
                </p>
              </div>
            </div>

            {/* Practical Information */}
            <div className="mt-8 pt-6 border-t border-[#F5D5DE] flex flex-wrap items-center justify-between gap-4 text-xs text-[#521326]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DE537E]" />
                <span>14 Royal Crescent & Flagship Salon</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6EA95D]" />
                <span>Mon – Sun: 8:00 AM – 8:30 PM</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DE537E] hover:bg-[#C73463] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Book High Tea Experience</span>
              </button>

              <button
                onClick={onOpenMenu}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FCEBF0] text-[#711935] border border-[#F4AFC3] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>View Full Menu</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
