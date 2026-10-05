import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOWCASE_PRODUCTS } from '../data/patisserieData';
import { Product } from '../types';
import { TopTornWave, BottomTornWave } from './TornWaveDividers';
import { Plus, Minus, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ProductShowcaseProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onAddToCart }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const activeProduct = SHOWCASE_PRODUCTS[selectedIndex];

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setQuantity(1);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
    setQuantity(1);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length);
    setQuantity(1);
  };

  const handleAddToCartClick = () => {
    onAddToCart(activeProduct, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <section id="showcase" className="relative bg-[#2D101E] text-white pt-0 pb-12 overflow-hidden">
      
      {/* Top Wave Divider transitioning from light hero into deep velvet plum */}
      <div className="relative -mt-1 w-full z-10">
        <TopTornWave fillColor="#2D101E" />
      </div>

      {/* Curved / Undulating Horizontal Menu Ribbon */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-5xl overflow-x-auto no-scrollbar py-2 px-2 flex items-center justify-start md:justify-center gap-2 sm:gap-3">
            {SHOWCASE_PRODUCTS.map((item, idx) => {
              const isActive = idx === selectedIndex;
              // Subtle arch curve vertical offset for desktop to match curved ribbon in reference!
              const mid = (SHOWCASE_PRODUCTS.length - 1) / 2;
              const curveOffset = Math.sin((idx / (SHOWCASE_PRODUCTS.length - 1)) * Math.PI) * 8;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  style={{ transform: `translateY(${isActive ? -2 : curveOffset}px)` }}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer select-none shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white shadow-lg shadow-[#DE537E]/40 font-semibold ring-2 ring-white/20'
                      : 'bg-[#3F192D]/80 hover:bg-[#52213A] text-[#FCD5DF] hover:text-white border border-[#612444]/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span>{item.shortTag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Product Showcase Display with GSAP/Motion Transitions */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#DE537E]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#6EA95D]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px]">
          
          {/* Left Column: Animated Featured Dessert (6 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Prev & Next Floating Buttons for desktop */}
            <button
              onClick={handlePrev}
              aria-label="Previous pastry"
              className="absolute left-0 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next pastry"
              className="absolute right-0 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[400px] aspect-square flex items-center justify-center"
              >
                {/* Decorative Circular Halo */}
                <div className="absolute inset-4 rounded-full border border-[#F4AFC3]/20 bg-gradient-to-tr from-[#3E162A]/70 to-[#541D39]/50 shadow-2xl"></div>

                {/* Floating Dessert Image with high-end presentation */}
                <div className="relative z-10 w-[84%] h-[84%] rounded-full overflow-hidden p-2 dark-polaroid-shadow border-2 border-[#DE537E]/40 group">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Fallback container if network drops */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#DE537E] to-[#558A46] flex flex-col items-center justify-center p-6 text-center rounded-full">
                    <span className="font-serif text-xl font-bold text-white mb-2">{activeProduct.name}</span>
                    <span className="text-xs text-pink-100">{activeProduct.shortTag}</span>
                  </div>
                </div>

                {/* Floating Pistachio & Rose Petals Decor */}
                <motion.div
                  animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-3 right-6 z-20 bg-[#3B1527]/90 border border-[#DE537E]/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-[11px] text-[#FCEBF0]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#6EA95D] inline-block animate-pulse"></span>
                  <span>Pure Bronte Pistachio</span>
                </motion.div>

                {activeProduct.isBestseller && (
                  <div className="absolute -bottom-2 left-6 z-20 bg-gradient-to-r from-[#DE537E] to-[#C73463] px-3.5 py-1 rounded-full shadow-md text-[11px] font-semibold uppercase tracking-wider text-white">
                    Signature Creation
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Animated Content (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Category & Freshness indicator */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4AFC3]">
                  <span>{activeProduct.category}</span>
                  <span>·</span>
                  <span className="text-[#8CC27D] font-medium">{activeProduct.prepTime}</span>
                </div>

                {/* Main Product Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                  {activeProduct.name}
                </h2>

                {/* Artisan Description */}
                <p className="text-sm sm:text-base text-[#FCEBF0]/85 font-sans leading-relaxed max-w-xl">
                  {activeProduct.description}
                </p>

                {/* Tasting Notes */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#E5A8BA] font-medium mr-1">Tasting Notes:</span>
                  {activeProduct.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#42172D] text-[#FCEBF0] border border-[#612444]/60 font-sans"
                    >
                      {note}
                    </span>
                  ))}
                  {activeProduct.calories && (
                    <span className="text-xs text-[#B2D8A7] font-mono ml-auto">
                      {activeProduct.calories}
                    </span>
                  )}
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Price */}
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F9D5E0] tracking-tight">
                    ${activeProduct.price.toFixed(2)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center rounded-full bg-[#41162C] border border-[#612444] p-1 text-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#5E2241] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#5E2241] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddToCartClick}
                    className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap ${
                      addedAnimation
                        ? 'bg-[#6EA95D] text-white scale-105'
                        : 'bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white hover:from-[#C73463] hover:to-[#A6214B] hover:shadow-lg hover:shadow-[#DE537E]/30 active:scale-95'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 animate-scale" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO CART</span>
                        <span className="text-base font-bold leading-none">+</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Mobile Prev / Next Controls */}
                <div className="flex sm:hidden items-center justify-between pt-4 border-t border-[#4D1C34]">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 text-xs text-[#F4AFC3] hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="text-xs text-white/50 font-mono">
                    {selectedIndex + 1} / {SHOWCASE_PRODUCTS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 text-xs text-[#F4AFC3] hover:text-white"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Bottom Wave Divider transitioning back to light blossom tone */}
      <div className="relative mt-12 w-full z-10">
        <BottomTornWave fillColor="#2D101E" />
      </div>

    </section>
  );
};
