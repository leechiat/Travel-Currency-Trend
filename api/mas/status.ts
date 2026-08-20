import { MAS_EXCHANGE_RATES_ENDPOINT, VercelLikeRequest, VercelLikeResponse } from '../_shared';

export default function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  const isKeyConfigured = Boolean(process.env.MAS_API_KEY && process.env.MAS_API_KEY.trim().length > 0);
  return res.status(200).json({
    endpoint: MAS_EXCHANGE_RATES_ENDPOINT,
    isKeyConfigured,
    provider: 'Monetary Authority of Singapore (MAS)',
    service: 'Monthly Statistical Bulletin - Exchange Rates End of Period Daily',
  });
}
