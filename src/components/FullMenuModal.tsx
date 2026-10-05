import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOWCASE_PRODUCTS, QUICK_ORDER_ITEMS } from '../data/patisserieData';
import { Product } from '../types';
import { X, Plus, Sparkles } from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'choux' | 'entremets' | 'drinks'>('all');

  if (!isOpen) return null;

  const filteredProducts = SHOWCASE_PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'choux') return item.category.includes('Choux');
    if (activeTab === 'entremets') return item.category.includes('Entremets') || item.category.includes('Tarts');
    if (activeTab === 'drinks') return item.category.includes('Beverages');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#FFF6F7] rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden z-10 flex flex-col my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F5D5DE] bg-white/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DE537E]">
              Pink Pistachio Catalog
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0E1E]">
              Complete Patisserie Menu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#711935] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-[#FCEDF2] border-b border-[#F5D5DE] flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Specialties' },
            { id: 'choux', label: 'Choux & Éclairs' },
            { id: 'entremets', label: 'Entremets & Tarts' },
            { id: 'drinks', label: 'Artisanal Drinks' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#DE537E] text-white shadow-sm'
                  : 'bg-white text-[#711935] hover:bg-[#FCEBF0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Catalog Items Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-2xl border border-[#F5D5DE] shadow-sm flex flex-col justify-between hover:border-[#DE537E]/40 transition-colors"
              >
                <div className="flex gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border border-[#F9D5E0] shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#DE537E]">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#3B0E1E] leading-snug">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#711935] line-clamp-2 mt-1 font-sans">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5D5DE] flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-[#3B0E1E]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      onAddToCart(product, 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCEDF2] hover:bg-[#DE537E] hover:text-white text-[#DE537E] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
