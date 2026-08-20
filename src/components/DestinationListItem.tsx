import React from 'react';
import { DestinationCurrency } from '../types';
import { MiniSparkline } from './MiniSparkline';
import { Bookmark, ChevronRight } from 'lucide-react';

interface DestinationListItemProps {
  destination: DestinationCurrency;
  isSelected: boolean;
  onSelect: (dest: DestinationCurrency) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const DestinationListItem: React.FC<DestinationListItemProps> = ({
  destination,
  isSelected,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const isPositive = destination.change90dPercent >= 0;
  const sparklineColor = isPositive ? '#84967F' : '#D48166';

  return (
    <div
      id={`dest-card-${destination.id}`}
      onClick={() => onSelect(destination)}
      className={`group relative w-full text-left p-4 rounded-[20px] border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-[#F2F0EB] border-[#84967F] shadow-xs ring-1 ring-[#84967F]/30'
          : 'bg-white border-[#E5E2DA] hover:border-[#84967F]/60 hover:bg-[#FDFCF9] shadow-2xs'
      }`}
    >
      {/* Top row: Flag + Country + Pair vs Rate + Change % */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none filter drop-shadow-2xs">{destination.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif italic text-[#2D332D] text-base leading-tight group-hover:text-[#84967F] transition-colors">
                {destination.country}
              </h3>
              {destination.isTopValueMover && (
                <span className="text-[10px] bg-[#84967F]/15 text-[#84967F] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Top Mover
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-[#7A756D] mt-0.5 tracking-wider uppercase">
              {destination.pair}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-light text-[#2D332D] tracking-tight">
            {destination.rate >= 1000
              ? destination.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : destination.rate.toFixed(2)}
          </div>
          <div
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              isPositive ? 'text-[#84967F]' : 'text-[#D48166]'
            }`}
          >
            <span>{isPositive ? '▲' : '▼'}</span>
            <span>
              {isPositive ? '+' : ''}
              {destination.change90dPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: Cheaper than 3 mo ago & Sparkline */}
      <div className="mt-3 pt-2.5 border-t border-[#E5E2DA] flex items-center justify-between">
        <span className="text-xs font-medium text-[#7A756D]">
          {isPositive ? 'Cheaper than 3 mo ago' : 'Pricier than 3 mo ago'}
        </span>

        <div className="flex items-center gap-2">
          <MiniSparkline
            data={destination.historicalData}
            color={sparklineColor}
            width={80}
            height={22}
          />
          <button
            type="button"
            onClick={(e) => onToggleBookmark(destination.id, e)}
            className={`p-1.5 rounded-full transition-colors ${
              isBookmarked
                ? 'text-[#D48166] bg-[#FAECE7] hover:bg-[#FAECE7]/80'
                : 'text-[#7A756D]/60 hover:text-[#2D332D] hover:bg-[#F2F0EB] opacity-0 group-hover:opacity-100'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark destination'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#84967F] translate-x-0.5' : 'text-[#7A756D]/50 group-hover:text-[#2D332D]'}`} />
        </div>
      </div>
    </div>
  );
};
