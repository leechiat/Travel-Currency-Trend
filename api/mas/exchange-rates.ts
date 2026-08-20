import {
  MAS_EXCHANGE_RATES_ENDPOINT,
  getMasKeyId,
  transformMasRates,
  FALLBACK_CURRENCIES,
  VercelLikeRequest,
  VercelLikeResponse,
} from '../_shared';

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const { apiKey, headers } = getMasKeyId();

  try {
    const url = new URL(MAS_EXCHANGE_RATES_ENDPOINT);

    // Forward any query parameters (e.g., limit, sort, between dates)
    if (req.query) {
      Object.entries(req.query).forEach(([key, val]) => {
        if (typeof val === 'string') {
          url.searchParams.append(key, val);
        } else if (Array.isArray(val) && val.length > 0) {
          url.searchParams.append(key, val[0]);
        }
      });
    }

    // Default to limit=30 if not provided
    if (!url.searchParams.has('limit')) {
      url.searchParams.append('limit', '30');
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      console.warn(`MAS API returned ${response.status}. Serving resilient fallback rates.`);
      const transformedFallback = transformMasRates([]);
      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');
      return res.status(200).json({
        success: true,
        source: 'fallback_rates',
        masStatus: response.status,
        rates: transformedFallback,
      });
    }

    const json = await response.json();
    const records = json?.result?.records || [];
    const transformedRates = transformMasRates(records);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({
      success: true,
      source: 'mas_api',
      totalRecords: records.length,
      hasApiKey: Boolean(apiKey),
      rates: transformedRates,
      rawLatest: records[0] || null,
    });
  } catch (error: any) {
    console.error('Error in exchange-rates handler:', error);
    const transformedFallback = transformMasRates([]);
    return res.status(200).json({
      success: true,
      source: 'fallback_rates',
      error: error?.message || 'Network error fetching MAS rates',
      rates: transformedFallback,
    });
  }
}
