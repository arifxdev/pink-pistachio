/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { WeGotYouCovered } from './components/WeGotYouCovered';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AtelierSection } from './components/AtelierSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { FullMenuModal } from './components/FullMenuModal';
import { GalleryModal } from './components/GalleryModal';
import { LocationModal, LocationSelection, DHA_KARACHI_AREAS, BOUTIQUE_BRANCHES } from './components/LocationModal';
import { Product, CartItem, QuickOrderItem } from './types';
import { SHOWCASE_PRODUCTS } from './data/patisserieData';
import { Check, ShoppingBag, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Location Selection (DHA Karachi) - Defaults to DHA Phase 6
  const [locationSelection, setLocationSelection] = useState<LocationSelection>(() => {
    try {
      const saved = localStorage.getItem('pink_pistachio_location');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      type: 'delivery',
      area: DHA_KARACHI_AREAS[0], // DHA Phase 6
      branch: BOUTIQUE_BRANCHES[0],
    };
  });

  // Modal to select location: opens automatically when the site loads first time!
  const [isLocationOpen, setIsLocationOpen] = useState(true);

  // Cart State (initialize with 1 signature item for instant visual richness)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: SHOWCASE_PRODUCTS[0], // Pistachio Choux
      quantity: 2,
    },
  ]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleLocationConfirm = (selection: LocationSelection) => {
    setLocationSelection(selection);
    try {
      localStorage.setItem('pink_pistachio_location', JSON.stringify(selection));
    } catch {}
    const label =
      selection.type === 'delivery'
        ? `${selection.area.split('(')[0].trim()} · Home Delivery`
        : 'Boutique Salon Pickup';
    showToast(`Serving: ${label}`);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}× ${product.name} to your bag`);
  };

  const handleQuickAdd = (quickItem: QuickOrderItem) => {
    // Map quickItem into full product or matching showcase item
    const matched = SHOWCASE_PRODUCTS.find((p) => p.name.includes(quickItem.name.split(' ')[0]));
    const productToAdd: Product = matched || {
      id: quickItem.id,
      name: quickItem.name,
      category: quickItem.category,
      shortTag: quickItem.name,
      price: quickItem.price,
      description: `Artisanal boutique ${quickItem.name.toLowerCase()} baked fresh daily at Pink Pistachio.`,
      tastingNotes: ['Artisanal Butter', 'Pure Pistachio', 'Freshly Baked'],
      image: quickItem.image,
      prepTime: 'Fresh morning bake',
    };

    handleAddToCart(productToAdd, 1);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF6F7] text-[#29121B] flex flex-col font-sans selection:bg-[#DE537E]/20 selection:text-[#521326]">
      
      {/* Top Bar with 3-zone contract & Location Selector */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        locationSelection={locationSelection}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Polaroid photo frames and floral line-art */}
        <HeroSection />

        {/* Dynamic Animated Product Showcase with Curved Horizontal Menu */}
        <ProductShowcase onAddToCart={handleAddToCart} />

        {/* "Patisserie Cravings? We've Got You Covered" Feature Block + Quick Order Grid */}
        <WeGotYouCovered
          onQuickAdd={handleQuickAdd}
          onOpenOrder={() => {
            const el = document.getElementById('showcase');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* "What Our Regulars Say" Testimonials Section */}
        <TestimonialsSection />

        {/* "More Than Just Patisserie" Dual-Column Atelier & Heritage Section */}
        <AtelierSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Location Selection Modal (Opens automatically on first site load!) */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onConfirm={handleLocationConfirm}
        currentSelection={locationSelection}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        locationSelection={locationSelection}
        onOpenLocation={() => {
          setIsCartOpen(false);
          setIsLocationOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
        locationSelection={locationSelection}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Full Menu Modal */}
      <FullMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddToCart={(product, qty) => {
          handleAddToCart(product, qty);
          setIsMenuOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Atelier Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#2D101E] text-white rounded-2xl shadow-xl border border-[#DE537E]/40 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-[#DE537E] flex items-center justify-center text-white shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium pr-2 text-[#FCEBF0]">
              {toastMessage}
            </span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-xs font-semibold text-[#8CC27D] hover:underline cursor-pointer ml-1"
            >
              View Bag →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
