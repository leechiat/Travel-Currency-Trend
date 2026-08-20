import React from 'react';
import { HomeCurrency } from '../types';
import { HOME_CURRENCIES, DESTINATIONS_DATA } from '../data/mockData';
import { X, User, Settings, Bell, Bookmark, Globe, Shield, Check, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeCurrency: HomeCurrency;
  onSelectHomeCurrency: (currency: HomeCurrency) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  homeCurrency,
  onSelectHomeCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFCF9] rounded-[32px] border border-[#E5E2DA] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 md:p-7 border-b border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#84967F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              U
            </div>
            <div>
              <h2 className="text-xl font-serif italic text-[#2D332D]">User Account & Settings</h2>
              <p className="text-xs text-[#7A756D]">soureiketsu@gmail.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7A756D] hover:text-[#2D332D] hover:bg-[#F2F0EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 space-y-5 overflow-y-auto">
          {/* Preferences Section */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-3 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#84967F]" />
              Regional & Base Currency
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {HOME_CURRENCIES.map((cur) => {
                const isSelected = cur.code === homeCurrency.code;
                return (
                  <button
                    key={cur.code}
                    onClick={() => onSelectHomeCurrency(cur)}
                    className={`p-3 rounded-[18px] border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#84967F]/15 border-[#84967F] text-[#2D332D] ring-1 ring-[#84967F]/30 shadow-2xs'
                        : 'bg-white border-[#E5E2DA] text-[#5C5852] hover:bg-[#F2F0EB]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{cur.flag}</span>
                      <span className="font-semibold">{cur.code}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#84967F]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Features */}
          <div className="p-4 bg-[#F2F0EB] rounded-[20px] border border-[#E5E2DA] space-y-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7A756D] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#84967F]" />
              Markets Account Tier
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-serif italic font-medium text-[#2D332D]">Pro Travel Trader Tier</div>
                <div className="text-xs text-[#7A756D]">Live 90-day currency fluctuation tracking enabled</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#84967F] px-3 py-1 rounded-full shadow-2xs">
                Active
              </span>
            </div>
          </div>

          {/* Notifications config */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-2 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#D48166]" />
              Alert Preferences
            </h4>
            <label className="flex items-center justify-between p-3.5 rounded-[18px] bg-white border border-[#E5E2DA] hover:bg-[#F2F0EB] cursor-pointer">
              <span className="text-xs text-[#5C5852]">
                Notify when destinations gain &gt;10% purchasing power
              </span>
              <input type="checkbox" defaultChecked className="rounded accent-[#84967F]" />
            </label>
            <label className="flex items-center justify-between p-3.5 rounded-[18px] bg-white border border-[#E5E2DA] hover:bg-[#F2F0EB] cursor-pointer">
              <span className="text-xs text-[#5C5852]">
                Weekly travel currency opportunity digest
              </span>
              <input type="checkbox" defaultChecked className="rounded accent-[#84967F]" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 md:p-6 border-t border-[#E5E2DA] bg-[#F2F0EB]/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#84967F] hover:bg-[#73856E] text-white font-semibold text-xs rounded-full uppercase tracking-wider shadow-2xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
