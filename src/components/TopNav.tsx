import React, { useState } from 'react';
import { Search, User, Menu, X, Bell, Globe, ArrowRight, Check } from 'lucide-react';
import { HomeCurrency } from '../types';

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenGetStarted: () => void;
  onOpenAccount: () => void;
  onOpenMobileMenu: () => void;
  homeCurrency: HomeCurrency;
}

export const TopNav: React.FC<TopNavProps> = ({
  searchQuery,
  onSearchChange,
  onOpenGetStarted,
  onOpenAccount,
  onOpenMobileMenu,
  homeCurrency,
}) => {
  const [activeMenu, setActiveMenu] = useState<'products' | 'community' | 'broker' | null>(null);

  return (
    <header className="sticky top-0 z-30 bg-[#FDFCF9]/90 backdrop-blur-md border-b border-[#E5E2DA] px-4 md:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#7A756D] hover:bg-[#F2F0EB]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching Natural Tones style */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A756D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="top-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destinations, currencies..."
              className="w-full bg-[#F2F0EB] hover:bg-[#EBE8E1] focus:bg-white text-[#2D332D] placeholder-[#7A756D] text-sm font-medium rounded-full pl-10 pr-9 py-2 border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A756D] hover:text-[#2D332D]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation Links & Action */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Navigation Links: Products, Community, Broker */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[#7A756D]">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
                className="px-3.5 py-2 rounded-full hover:text-[#2D332D] hover:bg-[#F2F0EB] transition-colors"
              >
                Products
              </button>
              {activeMenu === 'products' && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-[24px] shadow-xl border border-[#E5E2DA] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold text-[#84967F] uppercase tracking-widest px-3 py-1">Tools & Suite</div>
                  <button
                    onClick={() => { setActiveMenu(null); onOpenGetStarted(); }}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F2F0EB] text-sm font-medium text-[#2D332D] flex items-center justify-between"
                  >
                    <span>Travel FX Calculator</span>
                    <span className="text-[10px] bg-[#FAECE7] text-[#D48166] font-bold px-2 py-0.5 rounded-full">New</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F2F0EB] text-sm font-medium text-[#2D332D]"
                  >
                    90-Day Rate Volatility Alert
                  </button>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F2F0EB] text-sm font-medium text-[#2D332D]"
                  >
                    Global Purchasing Index
                  </button>
                </div>
              )}
            </div>

            {/* Community */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'community' ? null : 'community')}
                className="px-3.5 py-2 rounded-full hover:text-[#2D332D] hover:bg-[#F2F0EB] transition-colors"
              >
                Community
              </button>
              {activeMenu === 'community' && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-[24px] shadow-xl border border-[#E5E2DA] p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <h4 className="text-sm font-serif italic font-bold text-[#2D332D] mb-1">Traveler & Trader Insights</h4>
                  <p className="text-xs text-[#5C5852] mb-3">Join 45,000+ members sharing real-world currency conversions and local budgeting tips.</p>
                  <div className="space-y-2 text-xs text-[#2D332D]">
                    <div className="p-3 bg-[#F2F0EB] rounded-2xl border border-[#E5E2DA]">
                      <strong className="text-[#84967F]">@tokyo_nomad:</strong> "Best spot in Shinjuku for Yen cash withdrawals with 0% ATM fee..."
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Broker */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'broker' ? null : 'broker')}
                className="px-3.5 py-2 rounded-full hover:text-[#2D332D] hover:bg-[#F2F0EB] transition-colors"
              >
                Broker
              </button>
              {activeMenu === 'broker' && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-[24px] shadow-xl border border-[#E5E2DA] p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 mb-2 text-[#84967F] font-bold text-xs">
                    <Check className="w-4 h-4" />
                    <span>Real-time Interbank Rates Active</span>
                  </div>
                  <p className="text-xs text-[#5C5852] leading-relaxed mb-4">
                    Connected to multi-bank liquidity providers with 0.1 pip spreads on major G10 currencies.
                  </p>
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="w-full py-2.5 bg-[#2D332D] text-white rounded-full text-xs font-medium hover:bg-[#1f241f] transition-colors"
                  >
                    View Partner FX Rates
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Primary Action: "Get Started" Sage Button */}
          <button
            id="top-nav-get-started"
            onClick={onOpenGetStarted}
            className="bg-[#84967F] hover:bg-[#73856E] active:bg-[#657560] text-white font-medium text-sm px-6 py-2 rounded-full shadow-xs transition-all duration-150 flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* User Profile Avatar Icon Button */}
          <button
            id="top-nav-account-btn"
            onClick={onOpenAccount}
            className="w-9 h-9 rounded-full bg-[#E5E2DA] hover:bg-[#d8d4ca] flex items-center justify-center text-[#2D332D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#84967F]/30"
            title="User Profile"
          >
            <User className="w-4.5 h-4.5 text-[#5C5852]" />
          </button>
        </div>
      </div>
    </header>
  );
};
