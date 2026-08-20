import React, { useState } from 'react';
import { DestinationCurrency, HomeCurrency } from '../types';
import { InteractiveTrendChart } from './InteractiveTrendChart';
import { TrendingUp, Sparkles, Calculator, Bell, Compass, Calendar, Coffee, Utensils, Hotel } from 'lucide-react';

interface SpotlightDestinationCardProps {
  destination: DestinationCurrency;
  homeCurrency: HomeCurrency;
  onOpenCalculator: (dest: DestinationCurrency) => void;
  onSetAlert: (dest: DestinationCurrency) => void;
}

export const SpotlightDestinationCard: React.FC<SpotlightDestinationCardProps> = ({
  destination,
  homeCurrency,
  onOpenCalculator,
  onSetAlert,
}) => {
  const [showDetailedInsights, setShowDetailedInsights] = useState(false);
  const [sampleBudget, setSampleBudget] = useState<number>(1000);

  const isPositive = destination.change90dPercent >= 0;
  
  // Calculate budget purchasing power today vs 90d ago
  const currentLocalTotal = sampleBudget * destination.rate;
  const previousRate = destination.historicalData[0]?.rate || destination.low90d;
  const previousLocalTotal = sampleBudget * previousRate;
  const extraLocalGain = currentLocalTotal - previousLocalTotal;

  return (
    <div
      id="spotlight-destination-card"
      className="w-full bg-white rounded-[32px] border border-[#E5E2DA] shadow-xs overflow-hidden flex flex-col"
    >
      {/* Hero Visual Area */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden group">
        <img
          src={destination.imageUrl}
          alt={`${destination.country} travel scenery`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay for text readability & natural-theme aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D332D]/90 via-[#2D332D]/40 to-[#2D332D]/20" />

        {/* Top left badge: TOP VALUE MOVER */}
        <div className="absolute top-5 left-5 z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#84967F] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm tracking-wider uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>TOP VALUE MOVER</span>
          </div>
        </div>

        {/* Top right quick actions */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          <button
            onClick={() => onSetAlert(destination)}
            className="p-2.5 rounded-full bg-[#2D332D]/60 hover:bg-[#2D332D]/80 backdrop-blur-md text-white transition-all shadow-sm"
            title="Set Rate Alert"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Hero Overlay: Flag, Country, Pair and Big Exchange Rate Badge */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-end justify-between gap-4">
          <div className="text-white drop-shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl filter drop-shadow">{destination.flag}</span>
              <h2 className="text-3xl font-serif italic text-white tracking-tight">
                {destination.country}
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-200 mt-1 tracking-widest uppercase">
              {destination.pair}
            </p>
          </div>

          {/* Large Floating Exchange Rate Pill */}
          <div className="bg-[#2D332D]/90 backdrop-blur-md border border-white/20 px-5 py-3 rounded-[20px] text-right shadow-lg text-white">
            <div className="text-2xl md:text-3xl font-light tracking-tight leading-none text-white">
              {destination.rate >= 1000
                ? destination.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : destination.rate.toFixed(2)}
            </div>
            <div
              className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${
                isPositive ? 'text-[#84967F]' : 'text-[#D48166]'
              }`}
            >
              <span>{isPositive ? '▲' : '▼'}</span>
              <span>
                {isPositive ? '+' : ''}
                {destination.change90dPercent.toFixed(1)}% (90d)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        {/* "Why [Country]?" Section */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-serif italic text-[#2D332D] tracking-tight flex items-center gap-2">
              <span>Why {destination.country}?</span>
              <Sparkles className="w-4 h-4 text-[#A68966] fill-[#A68966]/40" />
            </h3>
            <button
              onClick={() => setShowDetailedInsights(!showDetailedInsights)}
              className="text-xs font-medium text-[#84967F] hover:text-[#73856E] underline-offset-4 hover:underline"
            >
              {showDetailedInsights ? 'Hide deep analysis' : 'Read macro analysis'}
            </button>
          </div>

          <p className="text-base text-[#5C5852] leading-relaxed font-normal">
            {destination.whyText}
          </p>

          {showDetailedInsights && (
            <div className="mt-3 p-5 bg-[#F2F0EB] border border-[#E5E2DA] rounded-[24px] text-sm text-[#2D332D] leading-relaxed animate-in fade-in duration-300">
              <p className="font-semibold text-[#2D332D] mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#84967F]" />
                Macro FX & Traveler Leverage Analysis
              </p>
              <p className="text-[#5C5852]">{destination.detailedAnalysis}</p>
              <div className="mt-3 pt-2.5 border-t border-[#E5E2DA] flex items-center gap-2 text-xs text-[#7A756D]">
                <Calendar className="w-3.5 h-3.5 text-[#84967F]" />
                <span>Optimal travel window: <strong className="text-[#2D332D]">{destination.recommendedSeason}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* 90-Day Trend Chart */}
        <InteractiveTrendChart
          data={destination.historicalData}
          high={destination.high90d}
          low={destination.low90d}
          currencyCode={destination.currencyCode}
          pair={destination.pair}
          isPositive={isPositive}
        />

        {/* Interactive Travel Purchasing Power Breakdown */}
        <div className="bg-[#F2F0EB] rounded-[24px] border border-[#E5E2DA] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#84967F]" />
              <h4 className="text-sm font-semibold text-[#2D332D]">
                Purchasing Power for {homeCurrency.code} Travelers
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#7A756D]">
              <span className="text-[11px] uppercase tracking-wider font-bold">Budget:</span>
              <div className="inline-flex rounded-full border border-[#E5E2DA] bg-white p-0.5 shadow-2xs">
                {[500, 1000, 2500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSampleBudget(amt)}
                    className={`px-3 py-0.5 text-xs font-medium rounded-full transition-all ${
                      sampleBudget === amt
                        ? 'bg-[#84967F] text-white'
                        : 'text-[#7A756D] hover:text-[#2D332D]'
                    }`}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-[#E5E2DA] shadow-2xs">
              <div className="text-[10px] font-bold tracking-widest text-[#7A756D] uppercase">Today's Value</div>
              <div className="text-lg font-light text-[#2D332D] mt-0.5">
                {destination.currencySymbol}
                {Math.round(currentLocalTotal).toLocaleString()} <span className="text-xs font-medium text-[#7A756D]">{destination.currencyCode}</span>
              </div>
              <div className="text-[11px] text-[#7A756D] mt-0.5">@ {destination.rate.toFixed(2)} spot</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E5E2DA] shadow-2xs">
              <div className="text-[10px] font-bold tracking-widest text-[#7A756D] uppercase">90 Days Ago</div>
              <div className="text-lg font-light text-[#5C5852] mt-0.5">
                {destination.currencySymbol}
                {Math.round(previousLocalTotal).toLocaleString()} <span className="text-xs font-medium text-[#7A756D]">{destination.currencyCode}</span>
              </div>
              <div className="text-[11px] text-[#7A756D] mt-0.5">@ {previousRate.toFixed(2)} prev</div>
            </div>

            <div className="bg-[#84967F]/10 p-4 rounded-2xl border border-[#84967F]/30 shadow-2xs">
              <div className="text-[10px] font-bold tracking-widest text-[#84967F] uppercase">Bonus Purchasing Power</div>
              <div className="text-lg font-medium text-[#2D332D] mt-0.5">
                +{destination.currencySymbol}
                {Math.round(extraLocalGain).toLocaleString()} <span className="text-xs font-medium text-[#84967F]">{destination.currencyCode}</span>
              </div>
              <div className="text-[11px] text-[#84967F] font-medium mt-0.5">
                {destination.costs.savingsVs90d}
              </div>
            </div>
          </div>

          {/* Realistic local expense benchmark badges */}
          <div className="mt-4 pt-3.5 border-t border-[#E5E2DA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C5852]">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#A68966]" />
              <span>Espresso: <strong className="text-[#2D332D]">{destination.costs.coffee}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#D48166]" />
              <span>Dinner for 2: <strong className="text-[#2D332D]">{destination.costs.midMeal}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-[#84967F]" />
              <span>4★ Hotel: <strong className="text-[#2D332D]">{destination.costs.hotelNight}</strong>/nt</span>
            </div>
            <button
              onClick={() => onOpenCalculator(destination)}
              className="text-[#84967F] font-semibold hover:text-[#73856E] text-xs ml-auto flex items-center gap-1 uppercase tracking-wider"
            >
              Full Budget Breakdown →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
