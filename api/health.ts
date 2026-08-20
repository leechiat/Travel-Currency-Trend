import { VercelLikeRequest, VercelLikeResponse } from './_shared';

export default function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Travel Currency Intelligence API',
  });
}
