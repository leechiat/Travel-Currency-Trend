import React from 'react';
import { Search, User, Menu, X, ArrowRight } from 'lucide-react';
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

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Primary Action: "Trip Calculator" / "Get Started" Sage Button */}
          <button
            id="top-nav-get-started"
            onClick={onOpenGetStarted}
            className="bg-[#84967F] hover:bg-[#73856E] active:bg-[#657560] text-white font-medium text-sm px-5 py-2 rounded-full shadow-xs transition-all duration-150 flex items-center gap-1.5"
          >
            <span>Trip Calculator</span>
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
