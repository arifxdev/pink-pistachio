import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/patisserieData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FCEDF1] relative overflow-hidden border-t border-[#F5D5DE]/80">
      
      {/* Decorative leaf art */}
      <div className="absolute top-10 right-8 text-[#DE537E]/10 pointer-events-none select-none">
        <Quote className="w-48 h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C73463]">
              Praise & Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3B0E1E] mt-1.5 tracking-tight">
              What Our Regulars Say
            </h2>
          </div>

          {/* Navigation Controls matching the reference image's arrow button */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#DE537E]/30 bg-white/80 hover:bg-[#DE537E] hover:text-white text-[#711935] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#DE537E]/30 bg-white/80 hover:bg-[#DE537E] hover:text-white text-[#711935] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Card Layout replicating reference */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md border border-[#F5D5DE]"
            >
              {/* Customer Photo (4 cols) */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg p-1.5 bg-[#FFF0F4]">
                  <img
                    src={current.image}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#DE537E] to-[#6EA95D] rounded-xl flex items-center justify-center text-white font-serif text-2xl font-bold">
                    {current.name[0]}
                  </div>
                </div>
              </div>

              {/* Quote & Author Info (8 cols) */}
              <div className="md:col-span-8 flex flex-col justify-center">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#DE537E] mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs text-[#8A3B52] ml-2 font-mono font-medium">5.0 Verified Review</span>
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-xl lg:text-2xl font-serif text-[#3B0E1E] leading-relaxed italic">
                  "{current.quote}"
                </p>

                {/* Author attribution */}
                <div className="mt-6 pt-5 border-t border-[#F7DBE3] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#3B0E1E]">
                      {current.name}
                    </h4>
                    <p className="text-xs text-[#711935] font-sans">
                      {current.role}
                    </p>
                  </div>

                  <div className="text-xs px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#F4AFC3]/60 text-[#A6214B] font-medium">
                    Favorite: {current.favoriteItem}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-[#DE537E]' : 'w-2 bg-[#DE537E]/30'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
