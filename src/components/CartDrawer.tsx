import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { LocationSelection } from './LocationModal';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, MapPin, Truck, Store } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  locationSelection: LocationSelection;
  onOpenLocation: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  locationSelection,
  onOpenLocation,
}) => {
  const fulfillmentType = locationSelection.type;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = fulfillmentType === 'delivery' && items.length > 0 ? 3.50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFF6F7] shadow-2xl flex flex-col border-l border-[#F5D5DE]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#F5D5DE] flex items-center justify-between bg-white/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#DE537E]" />
                  <h3 className="font-serif text-xl font-bold text-[#3B0E1E]">
                    Your Patisserie Bag
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#FCEBF0] text-[#DE537E] font-semibold">
                    {items.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close bag"
                  className="p-2 rounded-full text-[#711935] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fulfillment Type & Location Display */}
              <div className="p-4 bg-[#FCEDF2] border-b border-[#F5D5DE] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#3B0E1E] font-medium">
                    {fulfillmentType === 'delivery' ? (
                      <Truck className="w-4 h-4 text-[#DE537E]" />
                    ) : (
                      <Store className="w-4 h-4 text-[#6EA95D]" />
                    )}
                    <span className="font-semibold truncate max-w-[210px]">
                      {fulfillmentType === 'delivery'
                        ? locationSelection.area.split('(')[0].trim()
                        : 'Boutique Salon Pickup'}
                    </span>
                  </div>

                  <button
                    onClick={onOpenLocation}
                    className="text-[11px] font-semibold text-[#DE537E] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                <div className="text-[11px] text-[#711935] flex items-center justify-between bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#F5D5DE]">
                  <span>
                    {fulfillmentType === 'delivery'
                      ? 'Chilled Dispatch (30–45 mins)'
                      : 'Boutique Counter (Ready in 15 mins)'}
                  </span>
                  <span className="font-semibold text-[#6EA95D]">
                    {fulfillmentType === 'delivery' ? '$3.50 Fee' : 'Free'}
                  </span>
                </div>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8A3B52]">
                    <div className="w-16 h-16 rounded-full bg-[#FCEDF2] flex items-center justify-center mb-3">
                      <ShoppingBag className="w-8 h-8 text-[#F4AFC3]" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#3B0E1E]">Your bag is empty</h4>
                    <p className="text-xs text-[#711935] mt-1 max-w-xs">
                      Explore our freshly baked choux, Basque cakes, and delicate éclairs to add to your order.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-[#F5D5DE] shadow-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-[#F9D5E0]"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#3B0E1E] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#DE537E] font-mono">
                          ${item.product.price.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#F5D5DE] rounded-lg bg-[#FFF5F7]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease"
                              className="px-2 py-0.5 text-xs text-[#711935] hover:bg-[#FCEBF0] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-semibold text-[#3B0E1E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase"
                              className="px-2 py-0.5 text-xs text-[#711935] hover:bg-[#FCEBF0] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label="Remove item"
                            className="text-[#A6214B] hover:text-red-600 p-1 text-xs cursor-pointer ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#F5D5DE] bg-white/80 space-y-3">
                  <div className="space-y-1.5 text-xs text-[#521326]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {fulfillmentType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Chilled Courier Dispatch</span>
                        <span className="font-mono font-medium">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-[#F5D5DE] text-sm font-bold text-[#3B0E1E]">
                      <span>Estimated Total</span>
                      <span className="font-mono text-[#DE537E] text-base">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#6EA95D] justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Sealed luxury thermal patisserie packaging</span>
                  </div>

                  <button
                    onClick={onProceedToCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:from-[#C73463] hover:to-[#A6214B] transition-all cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
