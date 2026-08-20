import React from 'react';
import { NavSection } from '../types';
import {
  BarChart3,
  Plane,
  User,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenAccount: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  onOpenAccount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems: { id: NavSection; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'currency-trends', label: 'Currency Trends', icon: Plane },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FDFCF9] border-r border-[#E5E2DA] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo & Header */}
        <div className="p-6 border-b border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#84967F] flex items-center justify-center text-white shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif italic font-bold text-[#2D332D] tracking-tight">
                Markets.
              </span>
              <span className="block text-[10px] font-bold text-[#84967F] tracking-widest uppercase mt-0.5">
                Global FX & Trends
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-3.5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  onSelectSection(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#84967F]/15 text-[#2D332D] border border-[#84967F]/30 shadow-2xs font-semibold'
                    : 'text-[#7A756D] hover:text-[#2D332D] hover:bg-[#F2F0EB] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4.5 h-4.5 transition-colors ${
                      isActive ? 'text-[#84967F]' : 'text-[#7A756D] group-hover:text-[#2D332D]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.id === 'currency-trends' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAECE7] text-[#D48166] border border-[#D48166]/30">
                    Hot
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Travel Tip Widget */}
          <div className="mt-8 mx-1 p-4 rounded-2xl bg-[#F2F0EB] border border-[#E5E2DA]">
            <div className="flex items-center gap-2 text-[#2D332D] font-bold text-xs">
              <Compass className="w-4 h-4 text-[#84967F]" />
              <span className="font-serif italic text-sm">Traveler Insight</span>
            </div>
            <p className="text-xs text-[#5C5852] mt-1.5 leading-relaxed">
              Yen (¥) and Peso ($) are at peak 90-day purchasing value. Lock in lodging early to optimize your budget.
            </p>
            <button
              onClick={() => {
                onSelectSection('currency-trends');
                onCloseMobile();
              }}
              className="mt-2.5 text-[11px] font-bold text-[#84967F] hover:text-[#73856E] inline-flex items-center gap-1 uppercase tracking-wider"
            >
              Explore Best Movers <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom User Account Section */}
        <div className="p-4 border-t border-[#E5E2DA]">
          <button
            id="sidebar-account-btn"
            onClick={onOpenAccount}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F2F0EB] text-[#2D332D] transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-[#E5E2DA] flex items-center justify-center text-[#2D332D] text-xs font-bold shadow-2xs group-hover:ring-2 group-hover:ring-[#84967F]/40">
              <User className="w-4.5 h-4.5 text-[#5C5852]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#2D332D] truncate">Account</p>
              <p className="text-xs text-[#7A756D] truncate">Preferences & Watchlist</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
