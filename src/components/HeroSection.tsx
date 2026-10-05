import React from 'react';
import { motion } from 'motion/react';
import { HERO_POLAROIDS } from '../data/patisserieData';
import { Sparkles, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF6F7] via-[#FFF0F3] to-[#FCE8ED]">
      {/* Decorative Botanical Line-Art Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none overflow-hidden">
        {/* Subtle floral branch SVG left */}
        <svg
          className="absolute -top-10 -left-12 w-96 h-96 text-[#F3A6B9]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M20,180 Q60,120 100,100 T180,40" />
          <path d="M60,120 C70,100 90,95 85,80 C80,65 60,70 50,90 Z" fill="rgba(243, 166, 185, 0.15)" />
          <path d="M100,100 C110,80 130,75 125,60 C120,45 100,50 90,70 Z" fill="rgba(183, 215, 181, 0.2)" />
          <path d="M140,70 C150,50 170,45 165,30 C160,15 140,20 130,40 Z" fill="rgba(243, 166, 185, 0.15)" />
        </svg>

        {/* Subtle floral branch SVG right */}
        <svg
          className="absolute top-20 -right-16 w-[420px] h-[420px] text-[#B7D7B5]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M180,180 Q120,110 80,80 T20,20" />
          <path d="M120,110 C110,90 90,85 95,70 C100,55 120,60 130,80 Z" fill="rgba(183, 215, 181, 0.25)" />
          <path d="M80,80 C70,60 50,55 55,40 C60,25 80,30 90,50 Z" fill="rgba(243, 166, 185, 0.15)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Sub-header Badge */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#A6214B]">
          <span className="w-6 h-[1px] bg-[#DE537E]"></span>
          <span>Boutique French Patisserie & Tea Salon</span>
          <span className="w-6 h-[1px] bg-[#DE537E]"></span>
        </div>

        {/* Big Editorial Headline matching "Freshly Brewed Coffee" in reference */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#3B0E1E] tracking-tight max-w-4xl mx-auto leading-[1.08] text-balance">
          Freshly Baked Haute Patisserie
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#6A2B3D] max-w-2xl mx-auto font-normal font-sans leading-relaxed">
          Crafted with pure Sicilian Bronte pistachios, AOP churned French butter, and delicate Damascus rose petals.
        </p>

        {/* Polaroid-Style Hero Images (replicates the 3 tilted frames from reference) */}
        <div className="mt-10 md:mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-center px-4">
          {HERO_POLAROIDS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -6, transition: { duration: 0.25 } }}
              className={`relative bg-white p-3 pb-5 rounded-2xl polaroid-shadow transition-transform duration-300 ${item.rotation}`}
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FCE8ED]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    // Fallback to solid refined aesthetic container if image blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback styling placeholder behind image */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#F8D2DD] to-[#E2F0DE] flex items-center justify-center p-4 text-center">
                  <span className="font-serif text-sm font-semibold text-[#881C3D]">{item.title}</span>
                </div>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

                {/* Corner Tag */}
                <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white/95 text-[#711935] rounded-full shadow-sm backdrop-blur-sm">
                  {item.badge}
                </span>
              </div>

              {/* Polaroid Caption */}
              <div className="mt-3.5 text-center px-2">
                <h3 className="font-serif text-lg font-semibold text-[#3B0E1E] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8A3B52] mt-0.5 font-sans">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Cue or Quick Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#921B40] hover:text-[#C73463] transition-colors"
          >
            <span>Explore Signature Creations</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
