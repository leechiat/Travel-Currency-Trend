import React, { useState } from 'react';
import { NavSection, MarketAsset } from '../types';
import { OTHER_MARKET_ASSETS } from '../data/mockData';
import { MiniSparkline } from './MiniSparkline';
import { TrendingUp, TrendingDown, ArrowUpRight, Search, BarChart3, Clock, DollarSign, Activity } from 'lucide-react';

interface MarketViewsProps {
  section: NavSection;
  searchQuery: string;
}

export const MarketViews: React.FC<MarketViewsProps> = ({ section, searchQuery }) => {
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);

  const sectionTitles: Record<NavSection, { title: string; subtitle: string }> = {
    'currency-trends': {
      title: 'Travel Currency Trends',
      subtitle: '90-day currency fluctuations and purchasing power metrics.',
    },
    indices: {
      title: 'Global Major Indices',
      subtitle: 'Real-time performance of benchmark market equities across US, Europe, and Asia.',
    },
    stocks: {
      title: 'Global Equities & Stocks',
      subtitle: 'Top capitalized companies and international market leaders.',
    },
    crypto: {
      title: 'Digital Assets & Crypto',
      subtitle: 'Decentralized assets, blockchain protocols, and liquidity volumes.',
    },
    forex: {
      title: 'Foreign Exchange (G10 & EM)',
      subtitle: 'Real-time interbank currency exchange quotes and spreads.',
    },
    futures: {
      title: 'Commodities & Energy Futures',
      subtitle: 'Precious metals, crude oil, and energy contracts.',
    },
    bonds: {
      title: 'Sovereign Debt & Treasury Yields',
      subtitle: 'Government bond curves, 10-year yields, and macro interest indicators.',
    },
  };

  const assets = OTHER_MARKET_ASSETS.filter((a) => a.category === section).filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.symbol.toLowerCase().includes(q)
    );
  });

  const info = sectionTitles[section] || { title: 'Markets', subtitle: 'Market Overview' };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#F2F0EB] rounded-[32px] border border-[#E5E2DA] p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#84967F] font-bold">
                Live Overview
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif italic text-[#2D332D] tracking-tight">
              {info.title}
            </h1>
            <p className="text-[#5C5852] text-sm md:text-base leading-relaxed mt-2">
              {info.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center bg-white px-3.5 py-1.5 rounded-full border border-[#E5E2DA] shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-[#84967F] animate-pulse" />
            <span className="text-xs font-semibold text-[#2D332D]">Live Feed Active</span>
          </div>
        </div>
      </div>

      {/* Asset Table / Cards */}
      <div className="bg-white rounded-[24px] border border-[#E5E2DA] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5E2DA] flex items-center justify-between">
          <h3 className="font-serif italic text-lg text-[#2D332D] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#84967F]" />
            <span>Market Assets ({assets.length})</span>
          </h3>
          <span className="text-xs text-[#7A756D] font-medium">Auto-updated via feed</span>
        </div>

        {assets.length === 0 ? (
          <div className="p-12 text-center text-[#7A756D]">
            <Search className="w-8 h-8 mx-auto mb-2 text-[#7A756D]/50" />
            <p className="text-sm font-semibold text-[#2D332D]">No assets found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DA] bg-[#F2F0EB] text-[10px] font-bold text-[#7A756D] uppercase tracking-widest">
                  <th className="py-3.5 px-6">Asset / Symbol</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">24h Change</th>
                  <th className="py-3.5 px-6 hidden sm:table-cell">24h High / Low</th>
                  <th className="py-3.5 px-6 hidden md:table-cell">Volume</th>
                  <th className="py-3.5 px-6 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DA] text-sm">
                {assets.map((asset) => {
                  const isPositive = asset.changePercent >= 0;
                  return (
                    <tr
                      key={asset.id}
                      className="hover:bg-[#F2F0EB]/60 transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F2F0EB] text-[#2D332D] flex items-center justify-center font-bold text-xs border border-[#E5E2DA] group-hover:bg-[#84967F]/15 group-hover:text-[#84967F] transition-colors">
                            {asset.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-serif italic font-medium text-[#2D332D] group-hover:text-[#84967F] transition-colors">
                              {asset.name}
                            </div>
                            <div className="text-xs text-[#7A756D] font-medium uppercase tracking-wider">
                              {asset.symbol}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-light text-[#2D332D] text-base">
                          {asset.category === 'bonds'
                            ? `${asset.price.toFixed(2)}%`
                            : asset.price >= 1000
                            ? `$${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                            : `$${asset.price.toFixed(2)}`}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-1 font-medium text-xs px-2.5 py-0.5 rounded-full ${
                            isPositive
                              ? 'bg-[#84967F]/15 text-[#84967F] border border-[#84967F]/30'
                              : 'bg-[#D48166]/15 text-[#D48166] border border-[#D48166]/30'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>
                            {isPositive ? '+' : ''}
                            {asset.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 hidden sm:table-cell">
                        <div className="text-xs text-[#5C5852] font-medium">
                          <span className="text-[#2D332D] font-semibold">{asset.high24h.toFixed(2)}</span>
                          <span className="text-[#E5E2DA] mx-1.5">/</span>
                          <span className="text-[#7A756D]">{asset.low24h.toFixed(2)}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 hidden md:table-cell text-xs font-medium text-[#5C5852]">
                        {asset.volume}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-block">
                          <MiniSparkline
                            data={asset.historicalPoints}
                            color={isPositive ? '#84967F' : '#D48166'}
                            width={75}
                            height={20}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
