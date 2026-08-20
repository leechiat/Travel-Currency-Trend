import React, { useState, useMemo } from 'react';
import { DestinationCurrency, HomeCurrency, RegionFilter } from '../types';
import { DESTINATIONS_DATA, HOME_CURRENCIES } from '../data/mockData';
import { SpotlightDestinationCard } from './SpotlightDestinationCard';
import { DestinationListItem } from './DestinationListItem';
import { ChevronDown, SlidersHorizontal, Sparkles, Search, Bookmark, RotateCcw } from 'lucide-react';

interface CurrencyTrendsViewProps {
  searchQuery: string;
  onOpenCalculator: (dest: DestinationCurrency) => void;
  onSetAlert: (dest: DestinationCurrency) => void;
  homeCurrency: HomeCurrency;
  onSelectHomeCurrency: (currency: HomeCurrency) => void;
}

export const CurrencyTrendsView: React.FC<CurrencyTrendsViewProps> = ({
  searchQuery,
  onOpenCalculator,
  onSetAlert,
  homeCurrency,
  onSelectHomeCurrency,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('WORLD');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('japan');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['japan', 'argentina']));
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<'savings' | 'alpha' | 'rate'>('savings');

  const regions: RegionFilter[] = [
    'WORLD',
    'ASIA',
    'EUROPE',
    'NORTH AMERICA',
    'SOUTH AMERICA',
    'AFRICA',
    'OCEANIA',
  ];

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      // Region filter
      if (selectedRegion !== 'WORLD' && dest.region !== selectedRegion) {
        return false;
      }
      // Bookmark filter
      if (showOnlyBookmarked && !bookmarkedIds.has(dest.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.country.toLowerCase().includes(q);
        const matchesPair = dest.pair.toLowerCase().includes(q);
        const matchesCode = dest.currencyCode.toLowerCase().includes(q);
        if (!matchesName && !matchesPair && !matchesCode) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'savings') return b.change90dPercent - a.change90dPercent;
      if (sortBy === 'rate') return b.rate - a.rate;
      return a.country.localeCompare(b.country);
    });
  }, [selectedRegion, showOnlyBookmarked, bookmarkedIds, searchQuery, sortBy]);

  // Selected spotlight destination
  const selectedDestination = useMemo(() => {
    return (
      DESTINATIONS_DATA.find((d) => d.id === selectedDestinationId) ||
      DESTINATIONS_DATA[0]
    );
  }, [selectedDestinationId]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Other destinations for the list (exclude selected spotlight if in list or keep spotlight at top)
  const sideListDestinations = useMemo(() => {
    return filteredDestinations.filter((d) => d.id !== selectedDestination.id);
  }, [filteredDestinations, selectedDestination.id]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Banner Section */}
      <div className="bg-[#F2F0EB] rounded-[32px] border border-[#E5E2DA] p-6 md:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#84967F] font-bold">
                Global FX Arbitrage
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif italic text-[#2D332D] tracking-tight">
              Travel Currency Trends
            </h1>
            <p className="text-[#5C5852] text-sm md:text-base leading-relaxed mt-2">
              Discover destinations where your purchasing power expands based on 90-day currency fluctuations.
            </p>
          </div>

          {/* Right: Home Currency Dropdown */}
          <div className="flex items-center gap-3 self-start lg:self-center">
            <span className="text-[10px] font-bold tracking-widest text-[#7A756D] uppercase whitespace-nowrap">
              HOME CURRENCY
            </span>
            <div className="relative">
              <select
                id="home-currency-select"
                value={homeCurrency.code}
                onChange={(e) => {
                  const found = HOME_CURRENCIES.find((c) => c.code === e.target.value);
                  if (found) onSelectHomeCurrency(found);
                }}
                className="appearance-none bg-white hover:bg-[#FDFCF9] border border-[#E5E2DA] text-[#2D332D] text-sm font-medium rounded-full pl-4 pr-10 py-2.5 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#84967F]/20 focus:border-[#84967F] cursor-pointer min-w-[170px]"
              >
                {HOME_CURRENCIES.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.flag} {cur.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7A756D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Region Filter Navigation Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Region Pills matching Natural Tones style */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2F0EB] rounded-full border border-[#E5E2DA]">
          {regions.map((region) => {
            const isActive = selectedRegion === region;
            return (
              <button
                key={region}
                id={`region-pill-${region.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 text-xs font-semibold rounded-full tracking-wider transition-all duration-150 uppercase ${
                  isActive
                    ? 'bg-[#84967F] text-white shadow-2xs'
                    : 'text-[#7A756D] hover:text-[#2D332D] hover:bg-[#E5E2DA]/60'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* Secondary filters (Saved & Sort) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border transition-colors ${
              showOnlyBookmarked
                ? 'bg-[#FAECE7] text-[#D48166] border-[#D48166]/40 shadow-2xs'
                : 'bg-white text-[#5C5852] border-[#E5E2DA] hover:bg-[#F2F0EB]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-[#D48166] text-[#D48166]' : 'text-[#7A756D]'}`} />
            <span>Saved ({bookmarkedIds.size})</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-[#E5E2DA] text-[#2D332D] text-xs font-medium rounded-full pl-4 pr-9 py-2 hover:bg-[#F2F0EB] focus:outline-none focus:border-[#84967F] cursor-pointer shadow-2xs"
            >
              <option value="savings">Sort: Highest Traveler Savings</option>
              <option value="alpha">Sort: Country A-Z</option>
              <option value="rate">Sort: Exchange Rate</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A756D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid: Spotlight on Left, List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Spotlight Card (7 cols on desktop) */}
        <div className="lg:col-span-7 xl:col-span-7 w-full">
          <SpotlightDestinationCard
            destination={selectedDestination}
            homeCurrency={homeCurrency}
            onOpenCalculator={onOpenCalculator}
            onSetAlert={onSetAlert}
          />
        </div>

        {/* Right Column: Trending Destinations Cards (5 cols on desktop) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7A756D] uppercase tracking-widest">
                Trending Destinations
              </span>
              <span className="text-xs bg-[#F2F0EB] text-[#2D332D] font-semibold px-2.5 py-0.5 rounded-full border border-[#E5E2DA]">
                {filteredDestinations.length} available
              </span>
            </div>
            {selectedRegion !== 'WORLD' && (
              <button
                onClick={() => setSelectedRegion('WORLD')}
                className="text-xs text-[#84967F] hover:text-[#73856E] font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Region
              </button>
            )}
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="bg-white rounded-[24px] border border-[#E5E2DA] p-8 text-center text-[#5C5852]">
              <Search className="w-8 h-8 text-[#7A756D] mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-[#2D332D]">No destinations found</p>
              <p className="text-xs text-[#7A756D] mt-1">
                Try switching the region tab or clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('WORLD');
                  setShowOnlyBookmarked(false);
                }}
                className="mt-3 px-4 py-2 bg-[#F2F0EB] text-[#2D332D] text-xs font-semibold rounded-full hover:bg-[#E5E2DA] transition-colors border border-[#E5E2DA]"
              >
                Show All Destinations
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredDestinations.map((dest) => (
                <DestinationListItem
                  key={dest.id}
                  destination={dest}
                  isSelected={dest.id === selectedDestination.id}
                  onSelect={(d) => setSelectedDestinationId(d.id)}
                  isBookmarked={bookmarkedIds.has(dest.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
