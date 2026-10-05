import React, { useState } from 'react';
import { Instagram, MapPin, Phone, Mail, Clock, Check, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#240C17] text-[#FCEBF0] pt-16 pb-12 border-t border-[#45142B] relative overflow-hidden">
      
      {/* Decorative Radial */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DE537E]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#3D1426]">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6EA95D]"></span>
              <span className="text-2xl font-serif font-bold text-white tracking-tight uppercase">
                Pink Pistachio
              </span>
              <span className="w-2 h-2 rounded-full bg-[#DE537E]"></span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#E5A8BA] font-sans leading-relaxed max-w-sm">
              Artisanal Haute Patisserie & Salon de Thé. Honoring French baking tradition with pure Bronte pistachios, hand-churned butter, and organic rose florals.
            </p>

            {/* Official Instagram Link as provided in prompt */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/pistachio.pink?stkn=MTZha2d5ZzJ5ZWNiNQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#381223] hover:bg-[#DE537E] text-[#FCEBF0] hover:text-white text-xs font-semibold tracking-wide border border-[#521C34] transition-all hover:scale-105 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#F4AFC3]" />
                <span>@pistachio.pink on Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E5A8BA]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <button onClick={onOpenMenu} className="hover:text-white transition-colors cursor-pointer">
                  Full Menu
                </button>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">Signature Showcase</a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">Atelier & Craft</a>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors cursor-pointer">
                  Book High Tea
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Locations & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Salon & Boutique
            </h4>
            <div className="space-y-2.5 text-xs text-[#E5A8BA]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DE537E] shrink-0 mt-0.5" />
                <span>14 Royal Crescent, Flagship Boutique & Salon de Thé</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8CC27D] shrink-0 mt-0.5" />
                <span>Open Daily: 8:00 AM – 8:30 PM (Fresh batch every 2 hrs)</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#DE537E] shrink-0 mt-0.5" />
                <span>Concierge: +44 20 7946 0912</span>
              </div>
            </div>
          </div>

          {/* Seasonal Drops Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              The Salon Gazette
            </h4>
            <p className="text-xs text-[#E5A8BA]">
              Receive invites to limited-run entremet releases and seasonal high-tea seatings.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#381625] border border-[#6EA95D]/40 text-xs text-[#B2D8A7] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6EA95D]" />
                <span>Merci! You are now subscribed to salon previews.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#321120] border border-[#521C34] text-xs text-white placeholder-[#B87085] focus:outline-none focus:border-[#DE537E]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#DE537E] hover:bg-[#C73463] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Join Tasting List
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A66073] gap-4">
          <p>© {new Date().getFullYear()} Pink Pistachio & Patisserie. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#DE537E] fill-current" /> & Bronte Green Gold
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
