const MAS_EXCHANGE_RATES_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';

export default async function handler(req: any, res: any) {
  try {
    const apiKey =
      process.env.MAS_KEY_ID ||
      process.env.MAS_API_KEY ||
      process.env.KEY_ID ||
      '';

    const url = new URL(MAS_EXCHANGE_RATES_ENDPOINT);

    // Forward query parameters (e.g., rows, limit)
    if (req.query) {
      Object.entries(req.query).forEach(([key, val]) => {
        if (typeof val === 'string') {
          url.searchParams.append(key, val);
        } else if (Array.isArray(val)) {
          val.forEach((v) => url.searchParams.append(key, v));
        }
      });
    }

    if (!url.searchParams.has('limit')) {
      url.searchParams.append('limit', '30');
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'Markets-Intelligence/1.0',
    };

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
      });
    }

    const data = await response.json();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch MAS exchange rates',
      error: error?.message || 'Unknown network error',
    });
  }
}
