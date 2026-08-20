import React, { useState, useId } from 'react';
import { HistoricalRatePoint } from '../types';

interface InteractiveTrendChartProps {
  data: HistoricalRatePoint[];
  high: number;
  low: number;
  currencyCode: string;
  pair: string;
  isPositive?: boolean;
}

export const InteractiveTrendChart: React.FC<InteractiveTrendChartProps> = ({
  data,
  high,
  low,
  pair,
  isPositive = true,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<'30D' | '90D' | '180D' | '1Y'>('90D');
  const gradientId = useId();

  if (!data || data.length === 0) return null;

  // Normalization for SVG coordinates (viewBox 0 0 600 160)
  const width = 600;
  const height = 160;
  const paddingX = 20;
  const paddingY = 24;

  const minVal = Math.min(...data.map((d) => d.rate)) * 0.995;
  const maxVal = Math.max(...data.map((d) => d.rate)) * 1.005;
  const range = maxVal - minVal || 1;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.rate - minVal) / range) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  // Generate smooth cubic bezier SVG path
  const makeSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };

  const linePath = makeSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;
    
    // Find closest point
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoverIndex(closestIdx);
  };

  const strokeColor = isPositive ? '#84967F' : '#D48166';
  const startGradient = isPositive ? 'rgba(132, 150, 127, 0.35)' : 'rgba(212, 129, 102, 0.35)';
  const endGradient = isPositive ? 'rgba(132, 150, 127, 0.0)' : 'rgba(212, 129, 102, 0.0)';

  return (
    <div className="w-full bg-[#FDFCF9] rounded-[24px] border border-[#E5E2DA] p-5 transition-colors">
      {/* Header with 90-DAY TREND title and High/Low */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[#7A756D] uppercase">
            90-DAY TREND
          </span>
          <div className="flex items-center gap-1 bg-[#F2F0EB] rounded-full p-0.5 text-[10px] font-medium text-[#7A756D] border border-[#E5E2DA]">
            {(['30D', '90D', '180D', '1Y'] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setTimeRange(rng)}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  timeRange === rng
                    ? 'bg-[#84967F] text-white shadow-2xs font-semibold'
                    : 'hover:text-[#2D332D]'
                }`}
              >
                {rng}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-[#7A756D]">
          <span>
            High: <strong className="text-[#2D332D] font-semibold">{high.toFixed(2)}</strong>
          </span>
          <span className="text-[#E5E2DA]">|</span>
          <span>
            Low: <strong className="text-[#2D332D] font-semibold">{low.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      {/* Active hover info badge */}
      {activePoint && (
        <div className="flex items-center justify-between text-xs text-[#5C5852] pb-1.5 border-b border-[#E5E2DA] mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#84967F] animate-pulse" />
            <span className="text-[#7A756D]">{activePoint.date}:</span>
            <span className="font-bold text-[#2D332D] text-sm">
              {activePoint.rate.toFixed(2)}
            </span>
            <span className="text-[11px] text-[#7A756D]">({pair})</span>
          </div>
          <span className="text-[10px] text-[#2D332D] bg-[#84967F]/15 px-2.5 py-0.5 rounded-full font-medium border border-[#84967F]/30 uppercase tracking-wider">
            {hoverIndex === null ? 'Current Spot Rate' : 'Historical Data Point'}
          </span>
        </div>
      )}

      {/* SVG Canvas */}
      <div className="relative w-full h-36 select-none cursor-crosshair">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={startGradient} />
              <stop offset="100%" stopColor={endGradient} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={strokeColor} floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#E5E2DA"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#E5E2DA"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#E5E2DA"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Shaded Area */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Smooth Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Hover scrubber vertical line */}
          {activePoint && (
            <>
              <line
                x1={activePoint.x}
                y1={paddingY - 8}
                x2={activePoint.x}
                y2={height}
                stroke="#7A756D"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="6"
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth="3"
                className="transition-all"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="2.5"
                fill={strokeColor}
              />
            </>
          )}
        </svg>
      </div>

      {/* Footer timeline labels */}
      <div className="flex justify-between items-center text-[10px] font-medium text-[#7A756D] mt-2 px-1">
        <span>90 Days Ago</span>
        <span>45 Days Ago</span>
        <span className="text-[#2D332D] font-semibold">Today (Latest)</span>
      </div>
    </div>
  );
};
