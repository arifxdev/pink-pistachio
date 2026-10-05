import React from 'react';
import { motion } from 'motion/react';
import { QUICK_ORDER_ITEMS } from '../data/patisserieData';
import { QuickOrderItem, Product } from '../types';
import { Clock, Truck, Award, Plus, Check } from 'lucide-react';

interface WeGotYouCoveredProps {
  onQuickAdd: (item: QuickOrderItem) => void;
  onOpenOrder: () => void;
}

export const WeGotYouCovered: React.FC<WeGotYouCoveredProps> = ({
  onQuickAdd,
  onOpenOrder,
}) => {
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleAdd = (item: QuickOrderItem) => {
    onQuickAdd(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="relative py-12 md:py-20 bg-[#FFF6F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quick Order Mini Cards Grid (matching the top row in the reference image) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C73463]">
                Daily Baked Delights
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B0E1E] mt-1">
                Quick Boutique Favorites
              </h3>
            </div>
            <span className="text-xs text-[#8A3B52] hidden sm:inline-block">
              Click + for instant bag addition
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {QUICK_ORDER_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#FCEDF2] border border-[#F5D5DE] rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-[#DE537E]/40 hover:-translate-y-1"
              >
                {/* Circular Image Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3.5 shadow-sm p-1 bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#DE537E] to-[#6EA95D] rounded-full flex items-center justify-center text-white text-xs font-serif font-bold">
                    {item.name[0]}
                  </div>

                  {/* Add Button overlapping circle just like reference */}
                  <button
                    onClick={() => handleAdd(item)}
                    aria-label={`Add ${item.name} to cart`}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#DE537E] hover:bg-[#C73463] text-white flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
                  >
                    {addedId === item.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Meta & Title */}
                <span className="text-[11px] text-[#A6214B] font-medium tracking-wide uppercase">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-[#3B0E1E] mt-0.5 line-clamp-1">
                  {item.name}
                </h4>
                <span className="text-sm font-semibold text-[#6EA95D] font-mono mt-1">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Block: "Patisserie Cravings? We've Got You Covered" (Replicating exact layout in reference) */}
        <div className="relative rounded-3xl bg-[#2D101E] text-white overflow-hidden shadow-xl border border-[#4A1730]">
          
          {/* Subtle torn edge simulation on top and bottom of card */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#DE537E]/30 via-[#6EA95D]/30 to-[#DE537E]/30"></div>
          
          {/* Background Ambient Radial */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#DE537E]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:py-20 max-w-4xl mx-auto text-center">
            
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4AFC3] mb-3 inline-block">
              Express Delivery & In-Store Concierge
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.12]">
              Patisserie Cravings? <br className="hidden sm:inline" />
              We've Got You Covered
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#FCEBF0]/85 max-w-2xl mx-auto font-sans leading-relaxed">
              Order your favorite patisserie creations and bespoke celebration cakes for quick delivery within our service area. Fresh ingredients, temperature-controlled packaging, and dependable delivery—every single time.
            </p>

            {/* ORDER NOW CTA button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={onOpenOrder}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-lg shadow-[#DE537E]/30 hover:from-[#C73463] hover:to-[#A6214B] transition-all hover:scale-105 cursor-pointer"
              >
                <span>ORDER NOW</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* 3 Quality Pillars matching reference */}
            <div className="mt-12 pt-8 border-t border-[#4B1A32] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#40172B] flex items-center justify-center text-[#F4AFC3] mb-2">
                  <Clock className="w-5 h-5 text-[#8CC27D]" />
                </div>
                <span className="text-sm font-semibold text-white">Freshly Prepared Daily</span>
                <span className="text-xs text-[#E5A8BA] mt-0.5">Baked at dawn every morning</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#40172B] flex items-center justify-center text-[#F4AFC3] mb-2">
                  <Truck className="w-5 h-5 text-[#DE537E]" />
                </div>
                <span className="text-sm font-semibold text-white">Reliable Chilled Delivery</span>
                <span className="text-xs text-[#E5A8BA] mt-0.5">Temperature-protected fleet</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#40172B] flex items-center justify-center text-[#F4AFC3] mb-2">
                  <Award className="w-5 h-5 text-[#F4AFC3]" />
                </div>
                <span className="text-sm font-semibold text-white">Quality Guaranteed</span>
                <span className="text-xs text-[#E5A8BA] mt-0.5">100% French AOP butter</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
