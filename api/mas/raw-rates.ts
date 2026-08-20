import {
  MAS_EXCHANGE_RATES_ENDPOINT,
  getMasKeyId,
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

    if (!url.searchParams.has('limit')) {
      url.searchParams.append('limit', '30');
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Failed to read response body');
      return res.status(response.status).json({
        success: false,
        status: response.status,
        message: `MAS API returned HTTP ${response.status}`,
        error: errorText,
        source: 'mas_api',
        endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
        hasApiKey: Boolean(apiKey),
      });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({
      success: true,
      source: 'mas_api',
      endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
      hasApiKey: Boolean(apiKey),
      data,
    });
  } catch (error: any) {
    console.error('Error fetching raw MAS rates:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to communicate with MAS raw exchange rates service',
      error: error?.message || 'Unknown network error',
      source: 'mas_api',
    });
  }
}
