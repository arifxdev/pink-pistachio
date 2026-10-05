import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ShoppingBag, Truck, Check, Sparkles, ChevronDown } from 'lucide-react';

export interface LocationSelection {
  type: 'delivery' | 'pickup';
  area: string;
  branch?: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: LocationSelection) => void;
  currentSelection: LocationSelection;
}

export const DHA_KARACHI_AREAS = [
  'DHA Phase 6 (Khayaban-e-Shahbaz / Bukhari / Seher)',
  'DHA Phase 5 (Khayaban-e-Badar / Shamsheer / Tanzeem)',
  'DHA Phase 3 (Commercial Area / Sunset Blvd)',
  'DHA Phase 1 & 2 (Central Commercial & Defense Officers)',
  'DHA Phase 4 (9th Commercial / Sunset Lane)',
  'DHA Phase 7 & 7 Ext (Jami Commercial)',
  'DHA Phase 8 (Creek Vista / Zone A & B)',
  'Clifton (Block 2, 4, 8 & 9)',
];

export const BOUTIQUE_BRANCHES = [
  'Flagship Salon & Tea Room – Khayaban-e-Bukhari, DHA Phase 6, Karachi',
  'Patisserie Atelier – Khayaban-e-Shamsheer, DHA Phase 5, Karachi',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentSelection,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>(currentSelection.type);
  const [selectedArea, setSelectedArea] = useState<string>(currentSelection.area || DHA_KARACHI_AREAS[0]);
  const [selectedBranch, setSelectedBranch] = useState<string>(
    currentSelection.branch || BOUTIQUE_BRANCHES[0]
  );

  const handleConfirm = () => {
    onConfirm({
      type: orderType,
      area: orderType === 'delivery' ? selectedArea : 'DHA Karachi',
      branch: orderType === 'pickup' ? selectedBranch : undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop with elegant blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#2D101E]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#FFF6F7] rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden z-10 my-8"
      >
        {/* Decorative Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#DE537E] via-[#F4AFC3] to-[#6EA95D]" />

        {/* Content Container */}
        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEDF2] border border-[#F5D5DE] text-[11px] font-semibold uppercase tracking-wider text-[#C73463]">
              <Sparkles className="w-3.5 h-3.5 text-[#DE537E]" />
              <span>Select Your Dining Preference</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B0E1E] tracking-tight">
              Welcome to Pink Pistachio
            </h3>

            <p className="text-xs sm:text-sm text-[#711935] max-w-sm mx-auto font-sans leading-relaxed">
              Please choose home delivery or boutique pickup to view live fresh batch availability in your area.
            </p>
          </div>

          {/* Delivery vs Pickup Toggle Tabs */}
          <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#FCEDF2] border border-[#F5D5DE] mb-6">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-white text-[#DE537E] shadow-sm border border-[#F5D5DE]'
                  : 'text-[#8A3B52] hover:text-[#521326]'
              }`}
            >
              <Truck className={`w-4 h-4 ${orderType === 'delivery' ? 'text-[#DE537E]' : 'text-[#8A3B52]'}`} />
              <span>Home Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-white text-[#DE537E] shadow-sm border border-[#F5D5DE]'
                  : 'text-[#8A3B52] hover:text-[#521326]'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 ${orderType === 'pickup' ? 'text-[#DE537E]' : 'text-[#8A3B52]'}`} />
              <span>Boutique Pickup</span>
            </button>
          </div>

          {/* Conditional Dropdown Selection */}
          <div className="space-y-4">
            {orderType === 'delivery' ? (
              <div>
                <label className="block text-xs font-semibold text-[#3B0E1E] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#DE537E]" />
                    Select DHA Karachi Delivery Area
                  </span>
                  <span className="text-[10px] text-[#6EA95D] font-medium">Temperature Fleet</span>
                </label>

                <div className="relative">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-white border border-[#F5D5DE] text-xs sm:text-sm font-medium text-[#3B0E1E] focus:outline-none focus:border-[#DE537E] focus:ring-2 focus:ring-[#DE537E]/20 shadow-sm pr-10 cursor-pointer"
                  >
                    {DHA_KARACHI_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8A3B52] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="mt-2.5 p-3 rounded-xl bg-[#FFF0F4] border border-[#F5D5DE] text-[11px] text-[#711935] flex items-center justify-between">
                  <span>Estimated Arrival:</span>
                  <span className="font-semibold text-[#DE537E]">30 – 45 mins</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-[#3B0E1E] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#DE537E]" />
                    Select Boutique Salon for Pickup
                  </span>
                  <span className="text-[10px] text-[#6EA95D] font-medium">Ready in 15 mins</span>
                </label>

                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-white border border-[#F5D5DE] text-xs sm:text-sm font-medium text-[#3B0E1E] focus:outline-none focus:border-[#DE537E] focus:ring-2 focus:ring-[#DE537E]/20 shadow-sm pr-10 cursor-pointer"
                  >
                    {BOUTIQUE_BRANCHES.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8A3B52] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="mt-2.5 p-3 rounded-xl bg-[#FFF0F4] border border-[#F5D5DE] text-[11px] text-[#711935] flex items-center justify-between">
                  <span>Counter Pickup Window:</span>
                  <span className="font-semibold text-[#6EA95D]">Open Daily until 8:30 PM</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg shadow-[#DE537E]/30 hover:from-[#C73463] hover:to-[#A6214B] transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirm & Enter Patisserie</span>
            <Check className="w-4 h-4" />
          </button>

          {/* Subtle footer notice */}
          <p className="text-[11px] text-center text-[#8A3B52] mt-3">
            You can change your selected location or fulfillment mode anytime in the top bar.
          </p>

        </div>
      </motion.div>
    </div>
  );
};
