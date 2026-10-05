import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { LocationSelection } from './LocationModal';
import { X, CheckCircle2, Sparkles, CreditCard, Gift, Clock, MapPin } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
  locationSelection: LocationSelection;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  locationSelection,
}) => {
  const defaultAddress =
    locationSelection.type === 'delivery'
      ? `House 24, Street 12, ${locationSelection.area.split('(')[0].trim()}, Karachi`
      : `${locationSelection.branch || 'Flagship Salon, DHA Phase 6, Karachi'} (Counter Pickup)`;

  const [formData, setFormData] = useState({
    name: 'Ayla Rahman',
    email: 'ayla.rahman@gmail.com',
    phone: '+92 300 8245190',
    address: defaultAddress,
    giftNote: 'Enjoy the signature Bronte pistachio choux & rose eclairs! With love, A.',
    paymentMethod: 'cod',
  });

  useEffect(() => {
    if (locationSelection.type === 'delivery') {
      setFormData((prev) => ({
        ...prev,
        address: `House 24, Street 12, ${locationSelection.area.split('(')[0].trim()}, Karachi`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        address: `${locationSelection.branch || 'Flagship Salon, DHA Phase 6, Karachi'} (Counter Pickup)`,
      }));
    }
  }, [locationSelection]);

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal + 3.50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = `PP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrder);
    setOrderConfirmed(true);
    onOrderSuccess();
  };

  const handleResetAndClose = () => {
    setOrderConfirmed(false);
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
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-[#FFF6F7] rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden z-10 my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F5D5DE] bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#DE537E]" />
            <h3 className="font-serif text-2xl font-bold text-[#3B0E1E]">
              {orderConfirmed ? 'Order Confirmed' : 'Artisanal Checkout'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#711935] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#E9F4E5] text-[#558A46] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6EA95D]">
                Patisserie Order Placed
              </span>
              <h4 className="text-2xl font-serif font-bold text-[#3B0E1E] mt-1">
                Order #{orderNumber}
              </h4>
              <p className="text-xs text-[#711935] mt-1">
                A confirmation receipt has been dispatched to {formData.email}.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#F5D5DE] text-left space-y-3 text-xs text-[#521326]">
              <div className="flex items-center justify-between pb-2 border-b border-[#F5D5DE] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#DE537E]" />
                  Estimated Delivery Window
                </span>
                <span className="text-[#DE537E] font-medium">35 – 45 mins</span>
              </div>

              <div>
                <span className="font-semibold text-[#3B0E1E] block mb-1">Delivering to:</span>
                <p className="text-[#711935]">{formData.name} · {formData.phone}</p>
                <p className="text-[#711935]">{formData.address}</p>
              </div>

              {formData.giftNote && (
                <div className="pt-2 border-t border-[#F5D5DE]">
                  <span className="font-semibold text-[#3B0E1E] flex items-center gap-1 mb-1">
                    <Gift className="w-3.5 h-3.5 text-[#DE537E]" />
                    Calligraphy Gift Message:
                  </span>
                  <p className="italic text-[#711935]">"{formData.giftNote}"</p>
                </div>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:from-[#C73463] hover:to-[#A6214B] cursor-pointer"
            >
              Done & Return to Boutique
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Items Summary preview */}
            <div className="p-3.5 rounded-xl bg-white border border-[#F5D5DE] flex items-center justify-between text-xs">
              <span className="text-[#711935]">
                {items.length} patisserie item(s) selected
              </span>
              <span className="font-serif font-bold text-sm text-[#3B0E1E]">
                Total: ${total.toFixed(2)}
              </span>
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] focus:border-[#DE537E] focus:outline-none text-[#3B0E1E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3B0E1E] mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] focus:border-[#DE537E] focus:outline-none text-[#3B0E1E]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-[#3B0E1E] mb-1">
                Email for Tracking
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] focus:border-[#DE537E] focus:outline-none text-[#3B0E1E]"
              />
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-[#3B0E1E] mb-1">
                {locationSelection.type === 'delivery'
                  ? `Delivery Address (${locationSelection.area})`
                  : `Boutique Pickup Location`}
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] focus:border-[#DE537E] focus:outline-none text-[#3B0E1E]"
              />
            </div>

            {/* Custom Gift Note */}
            <div className="text-xs">
              <label className="block font-semibold text-[#3B0E1E] mb-1 flex items-center justify-between">
                <span>Handwritten Gift Calligraphy Note</span>
                <span className="text-[#DE537E] font-normal">Complimentary</span>
              </label>
              <textarea
                rows={2}
                value={formData.giftNote}
                onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                placeholder="Write a message to be hand-inscribed on our luxury stationery..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#F5D5DE] focus:border-[#DE537E] focus:outline-none text-[#3B0E1E] resize-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#3B0E1E] mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all cursor-pointer ${
                    formData.paymentMethod === 'apple_pay'
                      ? 'border-[#DE537E] bg-[#FCEDF2] text-[#3B0E1E]'
                      : 'border-[#F5D5DE] bg-white text-[#711935]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#DE537E]" />
                  Apple Pay / Card
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#DE537E] bg-[#FCEDF2] text-[#3B0E1E]'
                      : 'border-[#F5D5DE] bg-white text-[#711935]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#6EA95D]" />
                  Pay on Arrival
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#DE537E]/30 hover:from-[#C73463] hover:to-[#A6214B] transition-all cursor-pointer mt-2"
            >
              Confirm & Place Order (${total.toFixed(2)})
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
