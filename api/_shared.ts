// Shared helper to retrieve the MAS API key from environment variables
export function getMasKeyId(): string | undefined {
  return (
    process.env.MAS_KEY_ID ||
    process.env.MAS_API_KEY ||
    process.env.KEY_ID ||
    undefined
  );
}

export const MAS_EXCHANGE_RATES_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';
