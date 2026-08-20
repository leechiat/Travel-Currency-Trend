export type NavSection = 'currency-trends';

export type RegionFilter = 
  | 'WORLD'
  | 'ASIA'
  | 'EUROPE'
  | 'NORTH AMERICA'
  | 'SOUTH AMERICA'
  | 'AFRICA'
  | 'OCEANIA';

export interface HistoricalRatePoint {
  day: number;
  date: string;
  rate: number;
}

export interface TravelCostEstimate {
  coffee: string;
  midMeal: string;
  hotelNight: string;
  savingsVs90d: string;
}

export interface DestinationCurrency {
  id: string;
  country: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  pair: string;
  rate: number;
  change90dPercent: number; // e.g. +14.2%
  isTopValueMover?: boolean;
  region: RegionFilter;
  high90d: number;
  low90d: number;
  imageUrl: string;
  whyText: string;
  detailedAnalysis: string;
  historicalData: HistoricalRatePoint[];
  costs: TravelCostEstimate;
  recommendedSeason: string;
}

export interface HomeCurrency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}
