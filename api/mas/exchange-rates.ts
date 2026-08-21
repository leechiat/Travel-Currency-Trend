import { getMasKeyId, MAS_EXCHANGE_RATES_ENDPOINT } from '../_shared';

export default async function handler(req: any, res: any) {
  try {
    const apiKey = getMasKeyId();
    const url = new URL(MAS_EXCHANGE_RATES_ENDPOINT);

    // Forward any query parameters (e.g., limit, rows, between dates)
    if (req.query) {
      Object.entries(req.query).forEach(([key, val]) => {
        if (typeof val === 'string') {
          url.searchParams.append(key, val);
        } else if (Array.isArray(val)) {
          val.forEach((v) => url.searchParams.append(key, v));
        }
      });
    }

    // Default to limit=30 if not provided
    if (!url.searchParams.has('limit')) {
      url.searchParams.append('limit', '30');
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'Markets-Intelligence/1.0',
    };

    // Attach API key securely if present
    if (apiKey && apiKey.trim()) {
      headers['apikey'] = apiKey.trim();
      headers['api_key'] = apiKey.trim();
      headers['X-API-KEY'] = apiKey.trim();
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
    return res.status(200).json({
      success: true,
      source: 'mas_api',
      endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
      hasApiKey: Boolean(apiKey),
      data,
    });
  } catch (error: any) {
    console.error('Error fetching MAS exchange rates:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to communicate with MAS exchange rates service',
      error: error?.message || 'Unknown network error',
      source: 'mas_api',
      endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
    });
  }
}
