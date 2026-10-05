import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GALLERY_PHOTOS = [
  {
    title: 'The Haute Choux Display',
    subtitle: 'Golden craquelin & pure pistachio diplomat',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ruby Glazed Rose Éclairs',
    subtitle: 'Dotted with raspberry gelée & 24k leaf',
    image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Paris-Brest Praliné Wheel',
    subtitle: 'Swirled roasted Sicilian pistachio mousseline',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mayfair Boutique Salon',
    subtitle: 'Pastel pink velvet and brass chandeliers',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Signature Pistachio Basque Center',
    subtitle: 'Molten green core with Maldon sea salt',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Pink Macaron Curations',
    subtitle: 'Persian rose water and Bronte ganache',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
  },
];

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#FFF6F7] rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden z-10 flex flex-col my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F5D5DE] bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#DE537E]" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DE537E]">
                Atelier Gallery
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3B0E1E]">
                The Pink Pistachio Universe
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#711935] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-[#F5D5DE] flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#FCE8ED]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#DE537E] to-[#6EA95D] flex items-center justify-center text-white text-xs font-serif font-bold p-3 text-center">
                    {photo.title}
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-serif text-sm font-bold text-[#3B0E1E] leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-[#711935] mt-0.5">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
