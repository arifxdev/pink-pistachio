import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Signature Pink High Tea & Tasting',
    partySize: '2 Guests',
    date: '2026-10-12',
    timeSlot: '2:30 PM (Afternoon Salon)',
    specialRequests: '',
  });
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `HT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#FFF6F7] rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden z-10 my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F5D5DE] bg-white/70 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DE537E]">
              Salon de Thé
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#3B0E1E]">
              Table & High Tea Booking
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#711935] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#E9F4E5] text-[#558A46] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6EA95D]">
                Reservation Confirmed
              </span>
              <h4 className="text-2xl font-serif font-bold text-[#3B0E1E] mt-1">
                Ref #{bookingRef}
              </h4>
              <p className="text-xs text-[#711935] mt-1">
                We are delighted to welcome you to Pink Pistachio.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F5D5DE] text-left space-y-2.5 text-xs text-[#521326]">
              <div className="flex justify-between">
                <span className="text-[#8A3B52]">Experience</span>
                <span className="font-semibold text-[#3B0E1E]">{formData.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A3B52]">Date & Time</span>
                <span className="font-semibold text-[#3B0E1E]">{formData.date} at {formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A3B52]">Party</span>
                <span className="font-semibold text-[#3B0E1E]">{formData.partySize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A3B52]">Guest Name</span>
                <span className="font-semibold text-[#3B0E1E]">{formData.name}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:from-[#C73463] hover:to-[#A6214B] cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#3B0E1E] mb-1">
                Select Salon Experience
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
              >
                <option value="Signature Pink High Tea & Tasting">Signature Pink High Tea & Tasting ($58/pp)</option>
                <option value="Afternoon Patisserie & Specialty Coffee">Afternoon Patisserie & Specialty Coffee ($34/pp)</option>
                <option value="Rose Champagne & Haute Entremets">Rose Champagne & Haute Entremets ($85/pp)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Party Size
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests (Couple Banquette)</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests (Velvet Booth)</option>
                  <option value="6 Guests">6 Guests (Salon Table)</option>
                  <option value="8+ Guests">Private Tea Room (8-12)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Seating Time Slot
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
                >
                  <option value="11:30 AM (Morning Salon)">11:30 AM (Morning Salon)</option>
                  <option value="1:30 PM (Midday Tasting)">1:30 PM (Midday Tasting)</option>
                  <option value="3:30 PM (Classic High Tea)">3:30 PM (Classic High Tea)</option>
                  <option value="5:30 PM (Twilight Service)">5:30 PM (Twilight Service)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#3B0E1E] mb-1">
                Dietary Preferences or Occasion
              </label>
              <input
                type="text"
                placeholder="e.g. Nut sensitivity, anniversary celebration, vegetarian..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] text-[#3B0E1E] focus:border-[#DE537E] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:from-[#C73463] hover:to-[#A6214B] transition-all cursor-pointer mt-4"
            >
              Confirm High Tea Table Reservation
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
