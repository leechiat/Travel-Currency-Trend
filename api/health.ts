export default function handler(req: any, res: any) {
  try {
    // Read the key directly to avoid import errors
    const masKey =
      process.env.MAS_KEY_ID ||
      process.env.MAS_API_KEY ||
      process.env.KEY_ID ||
      '';

    const isConfigured = Boolean(masKey && masKey.trim().length > 0);

    return res.status(200).json({
      status: 'ok',
      masConfigured: isConfigured,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Server error in health check',
    });
  }
}
