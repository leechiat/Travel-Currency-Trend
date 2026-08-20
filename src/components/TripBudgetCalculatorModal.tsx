import React, { useState } from 'react';
import { DestinationCurrency, HomeCurrency } from '../types';
import { DESTINATIONS_DATA } from '../data/mockData';
import { X, Calculator, ArrowRight, DollarSign, Calendar, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

interface TripBudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: DestinationCurrency | null;
  homeCurrency: HomeCurrency;
}

export const TripBudgetCalculatorModal: React.FC<TripBudgetCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
  homeCurrency,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestination?.id || 'japan'
  );
  const [budgetAmount, setBudgetAmount] = useState<number>(1500);
  const [tripDays, setTripDays] = useState<number>(10);
  const [travelStyle, setTravelStyle] = useState<'budget' | 'comfort' | 'luxury'>('comfort');

  if (!isOpen) return null;

  const destination =
    DESTINATIONS_DATA.find((d) => d.id === selectedDestId) || DESTINATIONS_DATA[0];

  const currentRate = destination.rate;
  const previousRate = destination.historicalData[0]?.rate || destination.low90d;

  const currentTotalLocal = budgetAmount * currentRate;
  const previousTotalLocal = budgetAmount * previousRate;
  const localGain = currentTotalLocal - previousTotalLocal;
  const usdGainEquivalent = localGain / currentRate;

  const dailyLocalBudget = currentTotalLocal / tripDays;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFCF9] rounded-[32px] border border-[#E5E2DA] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-7 border-b border-[#E5E2DA] flex items-center justify-between sticky top-0 bg-[#FDFCF9] z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-[18px] bg-[#84967F]/15 text-[#84967F] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-serif italic text-[#2D332D]">
                Travel Budget Purchasing Calculator
              </h2>
              <p className="text-xs text-[#7A756D] mt-0.5">
                Simulate 90-day currency fluctuation purchasing gains
              </p>
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
        <div className="p-6 md:p-7 space-y-6">
          {/* Destination & Budget Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
                Target Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full bg-[#F2F0EB] border border-[#E5E2DA] rounded-[18px] p-3 text-sm font-medium text-[#2D332D] focus:bg-white focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F] outline-none cursor-pointer"
              >
                {DESTINATIONS_DATA.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.flag} {dest.country} ({dest.pair})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
                Total Travel Budget ({homeCurrency.code})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A756D] font-bold">
                  {homeCurrency.symbol}
                </span>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#F2F0EB] border border-[#E5E2DA] rounded-[18px] pl-8 pr-4 py-3 text-sm font-medium text-[#2D332D] focus:bg-white focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
                Trip Duration (Days)
              </label>
              <div className="flex items-center gap-2">
                {[5, 10, 14, 21].map((d) => (
                  <button
                    key={d}
                    onClick={() => setTripDays(d)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-full border transition-all ${
                      tripDays === d
                        ? 'bg-[#84967F] text-white border-[#84967F] shadow-2xs'
                        : 'bg-[#F2F0EB] text-[#7A756D] border-[#E5E2DA] hover:text-[#2D332D] hover:bg-[#E5E2DA]/60'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7A756D] mb-1.5">
                Travel Style
              </label>
              <div className="flex items-center gap-2">
                {(['budget', 'comfort', 'luxury'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setTravelStyle(style)}
                    className={`flex-1 py-2 text-xs font-semibold capitalize rounded-full border transition-all ${
                      travelStyle === style
                        ? 'bg-[#84967F] text-white border-[#84967F] shadow-2xs'
                        : 'bg-[#F2F0EB] text-[#7A756D] border-[#E5E2DA] hover:text-[#2D332D] hover:bg-[#E5E2DA]/60'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Comparison Card */}
          <div className="p-6 rounded-[24px] bg-[#2D332D] text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-widest">
                  Conversion Summary for {destination.country}
                </span>
                <h3 className="text-2xl font-serif italic text-white mt-0.5">
                  {destination.currencySymbol}
                  {Math.round(currentTotalLocal).toLocaleString()} <span className="text-sm font-sans font-normal text-slate-300">{destination.currencyCode}</span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-white font-medium bg-[#84967F] px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm">
                  <TrendingUp className="w-3 h-3" />
                  +{destination.change90dPercent.toFixed(1)}% Value Gain
                </span>
                <p className="text-[11px] text-slate-300 mt-1">1 {homeCurrency.code} = {destination.rate.toFixed(2)} {destination.currencyCode}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white/10 p-3.5 rounded-[18px] border border-white/10">
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Daily Spending Power</div>
                <div className="text-base font-medium text-white mt-0.5">
                  {destination.currencySymbol}
                  {Math.round(dailyLocalBudget).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">per day for {tripDays} days</div>
              </div>

              <div className="bg-white/10 p-3.5 rounded-[18px] border border-white/10">
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">90-Day Baseline</div>
                <div className="text-base font-medium text-slate-300 mt-0.5">
                  {destination.currencySymbol}
                  {Math.round(previousTotalLocal).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">at {previousRate.toFixed(2)} rate</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#84967F]/30 p-3.5 rounded-[18px] border border-[#84967F]/40">
                <div className="text-[10px] text-[#84967F] uppercase tracking-wider font-semibold">Bonus Traveler Value</div>
                <div className="text-base font-medium text-white mt-0.5">
                  +{destination.currencySymbol}
                  {Math.round(localGain).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-200 font-medium">
                  ≈ +${Math.round(usdGainEquivalent)} free purchasing power
                </div>
              </div>
            </div>
          </div>

          {/* Concrete Travel Perks Unlocked */}
          <div className="bg-[#F2F0EB] border border-[#E5E2DA] rounded-[24px] p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2D332D] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#A68966]" />
              What this 90-day currency shift buys you in {destination.country}:
            </h4>
            <div className="space-y-2 text-xs text-[#5C5852]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#84967F] shrink-0" />
                <span>
                  <strong className="text-[#2D332D]">~{Math.max(1, Math.round(usdGainEquivalent / 15))} extra gourmet meals</strong> or local tasting menus at authentic bistros.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#84967F] shrink-0" />
                <span>
                  <strong className="text-[#2D332D]">~{Math.max(1, Math.round(usdGainEquivalent / 75))} extra hotel nights</strong> or complimentary room upgrades.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#84967F] shrink-0" />
                <span>
                  Full high-speed express train or inter-city transit pass covered by FX savings alone.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-7 border-t border-[#E5E2DA] bg-[#F2F0EB]/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-[#7A756D] hover:text-[#2D332D] uppercase tracking-wider"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#84967F] hover:bg-[#73856E] text-white text-xs font-semibold rounded-full shadow-2xs transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            <span>Save Itinerary Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
