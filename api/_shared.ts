export const MAS_EXCHANGE_RATES_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';

export const MAS_SORA_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/sora_daily/views/sora_daily';

export interface VercelLikeRequest {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

export interface VercelLikeResponse {
  status: (statusCode: number) => VercelLikeResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => VercelLikeResponse;
}

/**
 * Returns the MAS API Key from standard environment variable names
 */
export function getMasKeyId(): string {
  return (
    process.env.MAS_API_KEY ||
    process.env.MAS_KEY_ID ||
    process.env.KEY_ID ||
    ''
  );
}

/**
 * Builds request headers for MAS API calls
 */
export function getMasHeaders(): Record<string, string> {
  const keyId = getMasKeyId();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': 'Markets-Intelligence/1.0',
  };

  if (keyId && keyId.trim().length > 0) {
    const trimmed = keyId.trim();
    headers['apikey'] = trimmed;
    headers['api_key'] = trimmed;
    headers['X-API-KEY'] = trimmed;
  }

  return headers;
}

/**
 * Standard fallback currencies and destination exchange rates
 */
export const FALLBACK_CURRENCIES = [
  {
    id: 'japan',
    country: 'Japan',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    flag: '🇯🇵',
    region: 'ASIA',
    defaultRateVsUsd: 151.24,
    defaultRateVsSgd: 114.5,
    change90dPercent: 14.2,
    masColumnName: 'jpy_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'thailand',
    country: 'Thailand',
    currencyCode: 'THB',
    currencySymbol: '฿',
    flag: '🇹🇭',
    region: 'ASIA',
    defaultRateVsUsd: 36.8,
    defaultRateVsSgd: 27.4,
    change90dPercent: 5.4,
    masColumnName: 'thb_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    flag: '🇲🇾',
    region: 'ASIA',
    defaultRateVsUsd: 4.75,
    defaultRateVsSgd: 3.52,
    change90dPercent: 4.8,
    masColumnName: 'myr_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'indonesia',
    country: 'Indonesia',
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    flag: '🇮🇩',
    region: 'ASIA',
    defaultRateVsUsd: 16250.0,
    defaultRateVsSgd: 12050.0,
    change90dPercent: 6.2,
    masColumnName: 'idr_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    currencyCode: 'VND',
    currencySymbol: '₫',
    flag: '🇻🇳',
    region: 'ASIA',
    defaultRateVsUsd: 25420.0,
    defaultRateVsSgd: 18900.0,
    change90dPercent: 4.1,
    masColumnName: 'vnd_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'korea',
    country: 'South Korea',
    currencyCode: 'KRW',
    currencySymbol: '₩',
    flag: '🇰🇷',
    region: 'ASIA',
    defaultRateVsUsd: 1385.0,
    defaultRateVsSgd: 1030.0,
    change90dPercent: 5.8,
    masColumnName: 'krw_sgd_100',
    unitMultiplier: 100,
  },
  {
    id: 'eurozone',
    country: 'Eurozone',
    currencyCode: 'EUR',
    currencySymbol: '€',
    flag: '🇪🇺',
    region: 'EUROPE',
    defaultRateVsUsd: 0.92,
    defaultRateVsSgd: 0.69,
    change90dPercent: -1.8,
    masColumnName: 'eur_sgd',
    unitMultiplier: 1,
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
    region: 'EUROPE',
    defaultRateVsUsd: 0.77,
    defaultRateVsSgd: 0.58,
    change90dPercent: 1.2,
    masColumnName: 'gbp_sgd',
    unitMultiplier: 1,
  },
  {
    id: 'australia',
    country: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    flag: '🇦🇺',
    region: 'OCEANIA',
    defaultRateVsUsd: 1.54,
    defaultRateVsSgd: 1.15,
    change90dPercent: 3.1,
    masColumnName: 'aud_sgd',
    unitMultiplier: 1,
  },
  {
    id: 'usa',
    country: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    region: 'AMERICAS',
    defaultRateVsUsd: 1.0,
    defaultRateVsSgd: 0.75,
    change90dPercent: 0.0,
    masColumnName: 'usd_sgd',
    unitMultiplier: 1,
  },
];

/**
 * Safely parses numbers from raw MAS strings/numbers
 */
export function parseMasRate(value: any, multiplier: number = 1): number | null {
  if (value === null || value === undefined || value === '') return null;
  const num = parseFloat(String(value).replace(/,/g, ''));
  if (isNaN(num)) return null;
  return multiplier !== 1 ? num / multiplier : num;
}

/**
 * Transforms raw MAS daily rate records into structured currency rate objects
 */
export function transformMasRates(masRecords: any[]) {
  if (!Array.isArray(masRecords) || masRecords.length === 0) {
    return FALLBACK_CURRENCIES.map((item) => ({
      ...item,
      latestRateVsSgd: item.defaultRateVsSgd,
      latestRateVsUsd: item.defaultRateVsUsd,
      isFallback: true,
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
  }

  const latestRecord = masRecords[0];
  const lastDate =
    latestRecord.end_of_day ||
    latestRecord.date ||
    new Date().toISOString().split('T')[0];

  return FALLBACK_CURRENCIES.map((item) => {
    const rawVal = latestRecord[item.masColumnName];
    const parsed = parseMasRate(rawVal, item.unitMultiplier);

    return {
      ...item,
      latestRateVsSgd: parsed !== null ? parsed : item.defaultRateVsSgd,
      latestRateVsUsd: item.defaultRateVsUsd,
      isFallback: parsed === null,
      lastUpdated: lastDate,
    };
  });
}
