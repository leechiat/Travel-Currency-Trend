import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

const MAS_EXCHANGE_RATES_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// MAS API Status Endpoint (never exposes raw API key)
app.get('/api/mas/status', (req, res) => {
  const isKeyConfigured = Boolean(process.env.MAS_API_KEY && process.env.MAS_API_KEY.trim().length > 0);
  res.json({
    endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
    isKeyConfigured,
    provider: 'Monetary Authority of Singapore (MAS)',
    service: 'Monthly Statistical Bulletin - Exchange Rates End of Period Daily',
  });
});

// Proxy endpoint for MAS Exchange Rates API
app.get('/api/mas/exchange-rates', async (req, res) => {
  try {
    const apiKey = process.env.MAS_API_KEY;
    const url = new URL(MAS_EXCHANGE_RATES_ENDPOINT);

    // Forward any query parameters (e.g., limit, sort, between dates)
    Object.entries(req.query).forEach(([key, val]) => {
      if (typeof val === 'string') {
        url.searchParams.append(key, val);
      }
    });

    // Default to limit=10 if not provided
    if (!url.searchParams.has('limit')) {
      url.searchParams.append('limit', '30');
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'Markets-Intelligence/1.0',
    };

    // Attach API key securely from environment variable if present
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
    return res.json({
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
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Static file serving in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
