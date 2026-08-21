export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Travel Currency Intelligence API',
  });
}
