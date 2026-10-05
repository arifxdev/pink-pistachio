import React from 'react';
import { ShoppingBag, Calendar, MapPin, ChevronDown, Truck, Store } from 'lucide-react';
import { LocationSelection } from './LocationModal';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenGallery: () => void;
  locationSelection: LocationSelection;
  onOpenLocation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenMenu,
  onOpenGallery,
  locationSelection,
  onOpenLocation,
}) => {
  // Format short display label
  const locationLabel =
    locationSelection.type === 'delivery'
      ? locationSelection.area.split('(')[0].trim() || 'DHA Karachi'
      : 'DHA Salon Pickup';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF5F7]/95 backdrop-blur-md border-b border-[#F5D5DE]/70 transition-colors">
      
      {/* Top Location Micro-Bar on Mobile & Desktop quick trigger */}
      <div className="bg-[#FCEDF2] border-b border-[#F7DDE5] py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[#711935]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EA95D]"></span>
            <span>Handcrafted daily with pure Sicilian Bronte pistachios & French AOP butter</span>
          </div>

          {/* Clickable Location Selector Pill */}
          <button
            onClick={onOpenLocation}
            className="mx-auto sm:mx-0 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white hover:bg-[#FFF0F4] border border-[#F5D5DE] text-[#DE537E] font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
          >
            {locationSelection.type === 'delivery' ? (
              <Truck className="w-3.5 h-3.5 text-[#DE537E]" />
            ) : (
              <Store className="w-3.5 h-3.5 text-[#6EA95D]" />
            )}
            <span className="text-[#3B0E1E] font-semibold">{locationLabel}</span>
            <span className="text-[10px] text-[#A6214B] font-normal uppercase">
              ({locationSelection.type})
            </span>
            <ChevronDown className="w-3 h-3 text-[#A6214B] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase text-[#5A2335]">
          <a
            href="#hero"
            className="hover:text-[#DE537E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#DE537E] after:transition-all"
          >
            Home
          </a>
          <button
            onClick={onOpenMenu}
            className="hover:text-[#DE537E] transition-colors relative py-1 cursor-pointer"
          >
            Menu
          </button>
          <a
            href="#atelier"
            className="hover:text-[#DE537E] transition-colors relative py-1"
          >
            Our Story
          </a>
          <button
            onClick={onOpenGallery}
            className="hover:text-[#DE537E] transition-colors relative py-1 cursor-pointer"
          >
            Gallery
          </button>
        </nav>

        {/* Center Wordmark / Logo */}
        <a
          href="#hero"
          className="flex flex-col items-center group transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EA95D]"></span>
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#420A1D] uppercase">
              Pink Pistachio
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DE537E]"></span>
          </div>
          <span className="text-[10px] sm:text-xs font-serif italic tracking-[0.25em] text-[#881C3D] -mt-1">
            Haute Patisserie & Salon de Thé
          </span>
        </a>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#711935] hover:text-[#C73463] transition-colors px-2 py-1 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#DE537E]" />
            <span>Reservation</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="relative p-2 rounded-full text-[#521326] hover:bg-[#FCEBF0] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-[#521326]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DE537E] text-[10px] font-bold text-white shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#showcase"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#DE537E] to-[#C73463] px-4 sm:px-5 py-2 text-xs font-semibold tracking-wider text-white shadow-sm hover:from-[#C73463] hover:to-[#A6214B] transition-all hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>ORDER NOW</span>
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </header>
  );
};
