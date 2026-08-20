import React, { useState } from 'react';
import { DestinationCurrency } from '../types';
import { X, Bell, Check, TrendingUp, Sparkles } from 'lucide-react';

interface RateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: DestinationCurrency | null;
}

export const RateAlertModal: React.FC<RateAlertModalProps> = ({
  isOpen,
  onClose,
  destination,
}) => {
  const [targetRate, setTargetRate] = useState<string>(
    destination ? (destination.rate * 1.03).toFixed(2) : '155.00'
  );
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !destination) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFCF9] rounded-[32px] border border-[#E5E2DA] shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[18px] bg-[#D48166]/15 text-[#D48166] flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif italic text-[#2D332D]">Set Rate Alert</h2>
              <p className="text-xs text-[#7A756D]">{destination.pair} Exchange Notification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7A756D] hover:text-[#2D332D] hover:bg-[#F2F0EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-[#F2F0EB] border border-[#E5E2DA] rounded-[20px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{destination.flag}</span>
              <div>
                <span className="text-sm font-serif italic font-medium text-[#2D332D]">{destination.country}</span>
                <p className="text-xs text-[#7A756D]">Current Spot Rate</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-light text-[#2D332D]">{destination.rate.toFixed(2)}</span>
              <span className="block text-[10px] font-medium text-[#84967F]">+{destination.change90dPercent.toFixed(1)}% (90d)</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
              Notify me when rate reaches:
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                required
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
                className="w-full bg-white border border-[#E5E2DA] rounded-[18px] px-4 py-2.5 text-base font-medium text-[#2D332D] focus:outline-none focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7A756D]">
                {destination.currencyCode}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
              Notification Channel:
            </label>
            <input
              type="email"
              placeholder="soureiketsu@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E5E2DA] rounded-[18px] px-4 py-2.5 text-sm text-[#2D332D] placeholder-[#7A756D]/50 focus:outline-none focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaved}
              className={`w-full py-3 rounded-full font-semibold text-xs uppercase tracking-wider shadow-2xs transition-all flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-[#84967F] text-white'
                  : 'bg-[#84967F] hover:bg-[#73856E] active:bg-[#60705B] text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Alert Active & Monitored</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Activate 90-Day FX Alert</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
