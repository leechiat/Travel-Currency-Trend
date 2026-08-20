/**
 * Client service to communicate with the server-side MAS (Monetary Authority of Singapore)
 * Exchange Rates End of Period Daily endpoint.
 *
 * Endpoint configured on server:
 * https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily
 */

export interface MasRecord {
  end_of_day?: string;
  usd_sgd_eop?: number | string;
  eur_sgd_eop?: number | string;
  gbp_sgd_eop?: number | string;
  jpy_sgd_100_eop?: number | string;
  aud_sgd_eop?: number | string;
  cad_sgd_eop?: number | string;
  chf_sgd_eop?: number | string;
  cny_sgd_100_eop?: number | string;
  hkd_sgd_100_eop?: number | string;
  myr_sgd_100_eop?: number | string;
  thb_sgd_100_eop?: number | string;
  nzd_sgd_eop?: number | string;
  [key: string]: any;
}

export interface MasApiResponse {
  success: boolean;
  source: string;
  endpoint: string;
  hasApiKey?: boolean;
  data?: {
    result?: {
      total?: number;
      records?: MasRecord[];
    };
  };
  message?: string;
  error?: string;
}

export interface MasStatusResponse {
  endpoint: string;
  isKeyConfigured: boolean;
  provider: string;
  service: string;
}

export async function getMasApiStatus(): Promise<MasStatusResponse | null> {
  try {
    const res = await fetch('/api/mas/status');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchMasExchangeRates(limit = 30): Promise<MasApiResponse | null> {
  try {
    const res = await fetch(`/api/mas/exchange-rates?limit=${limit}`);
    const json = await res.json();
    return json;
  } catch (err: any) {
    return {
      success: false,
      source: 'mas_api',
      endpoint:
        'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily',
      error: err?.message || 'Network error fetching MAS exchange rates',
    };
  }
}
