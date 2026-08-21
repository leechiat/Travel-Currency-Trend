import { getMasKeyId } from './_shared';

export default function handler(req: any, res: any) {
  const masKey = getMasKeyId();

  return res.status(200).json({
    status: 'ok',
    masConfigured: Boolean(masKey && masKey.trim().length > 0),
    timestamp: new Date().toISOString(),
    service: 'Travel Currency Intelligence API',
  });
}
