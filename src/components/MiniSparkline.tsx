import React from 'react';

interface MiniSparklineProps {
  data: { rate: number }[] | number[];
  color?: string;
  width?: number;
  height?: number;
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color = '#10b981',
  width = 90,
  height = 28,
}) => {
  if (!data || data.length < 2) return null;

  const rawRates: number[] = data.map((d) => (typeof d === 'number' ? d : d.rate));
  const min = Math.min(...rawRates);
  const max = Math.max(...rawRates);
  const range = max - min || 1;

  const padding = 2;
  const points = rawRates.map((val, i) => {
    const x = padding + (i / (rawRates.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  // Smooth bezier for mini sparkline
  const coords = rawRates.map((val, i) => ({
    x: padding + (i / (rawRates.length - 1)) * (width - padding * 2),
    y: height - padding - ((val - min) / range) * (height - padding * 2),
  }));

  let path = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i === 0 ? i : i - 1];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return (
    <svg width={width} height={height} className="overflow-visible select-none">
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
