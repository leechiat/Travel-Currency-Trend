import { DestinationCurrency, HomeCurrency } from '../types';

export const HOME_CURRENCIES: HomeCurrency[] = [
  { code: 'USD', name: 'USD - US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'EUR - Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'GBP - British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', name: 'CAD - Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  { code: 'AUD', name: 'AUD - Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'SGD', name: 'SGD - Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'CHF', name: 'CHF - Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'JPY', name: 'JPY - Japanese Yen', symbol: '¥', flag: '🇯🇵' },
];

export const DESTINATIONS_DATA: DestinationCurrency[] = [
  {
    id: 'japan',
    country: 'Japan',
    flag: '🇯🇵',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    pair: 'USD / JPY',
    rate: 151.24,
    change90dPercent: 14.2,
    isTopValueMover: true,
    region: 'ASIA',
    high90d: 151.80,
    low90d: 138.45,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=80', // Tokyo skyline with Tokyo Tower
    whyText: 'The Yen has seen significant depreciation against the US Dollar over the last quarter, making it one of the most cost-effective developed economies to visit right now. Purchasing power for US travelers has increased substantially, offsetting recent local inflation.',
    detailedAnalysis: 'Over the last 90 days, the Bank of Japan maintainance of ultra-accommodative monetary policy alongside strong US Treasury yields has widened the interest rate differential. For travelers, high-end sushi omakase, ryokan hot spring stays, and Shinkansen rail journeys are up to 25% cheaper in USD terms than 2022 levels.',
    recommendedSeason: 'Spring (Sakura) & Autumn (Momiji)',
    costs: {
      coffee: '$2.40 (¥360)',
      midMeal: '$11.50 (¥1,740)',
      hotelNight: '$85.00 (¥12,850)',
      savingsVs90d: '+$142 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 138.50 },
      { day: 10, date: '80d ago', rate: 139.20 },
      { day: 20, date: '70d ago', rate: 140.80 },
      { day: 30, date: '60d ago', rate: 142.10 },
      { day: 40, date: '50d ago', rate: 141.50 },
      { day: 50, date: '40d ago', rate: 144.30 },
      { day: 60, date: '30d ago', rate: 146.90 },
      { day: 70, date: '20d ago', rate: 148.40 },
      { day: 80, date: '10d ago', rate: 149.80 },
      { day: 85, date: '5d ago', rate: 150.60 },
      { day: 90, date: 'Today', rate: 151.24 },
    ]
  },
  {
    id: 'argentina',
    country: 'Argentina',
    flag: '🇦🇷',
    currencyCode: 'ARS',
    currencySymbol: '$',
    pair: 'USD / ARS',
    rate: 985.50,
    change90dPercent: 28.4,
    region: 'SOUTH AMERICA',
    high90d: 998.00,
    low90d: 760.20,
    imageUrl: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1400&q=80', // Buenos Aires Obelisk
    whyText: 'Argentina has implemented crawling peg adjustments, maintaining favorable foreign exchange conditions for foreign credit cards and MEP conversions, unlocking world-class dining and Patagonian trekking.',
    detailedAnalysis: 'Foreign credit cards now automatically receive the MEP exchange rate, making high-end steakhouses in Palermo and winery lodges in Mendoza extraordinarily affordable for dollar and euro holders.',
    recommendedSeason: 'October to April',
    costs: {
      coffee: '$1.80 (ARS 1,770)',
      midMeal: '$14.00 (ARS 13,800)',
      hotelNight: '$72.00 (ARS 71,000)',
      savingsVs90d: '+$284 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 765.00 },
      { day: 15, date: '75d ago', rate: 810.00 },
      { day: 30, date: '60d ago', rate: 860.00 },
      { day: 45, date: '45d ago', rate: 910.00 },
      { day: 60, date: '30d ago', rate: 945.00 },
      { day: 75, date: '15d ago', rate: 970.00 },
      { day: 90, date: 'Today', rate: 985.50 },
    ]
  },
  {
    id: 'turkey',
    country: 'Turkey',
    flag: '🇹🇷',
    currencyCode: 'TRY',
    currencySymbol: '₺',
    pair: 'USD / TRY',
    rate: 32.15,
    change90dPercent: 8.7,
    region: 'EUROPE',
    high90d: 32.40,
    low90d: 29.50,
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=80', // Istanbul Hagia Sophia / Bosphorus
    whyText: 'The Turkish Lira continues to yield strong purchasing power for international travelers exploring Istanbul, Cappadocia hot air balloons, and the Turquoise Coast in Antalya.',
    detailedAnalysis: 'While domestic prices have adjusted, the FX spread still provides overseas visitors with steep discounts on luxury boutique hotels in Sultanahmet and coastal resort packages.',
    recommendedSeason: 'April to May & September to November',
    costs: {
      coffee: '$2.10 (TRY 67)',
      midMeal: '$12.00 (TRY 385)',
      hotelNight: '$68.00 (TRY 2,180)',
      savingsVs90d: '+$87 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 29.55 },
      { day: 15, date: '75d ago', rate: 30.10 },
      { day: 30, date: '60d ago', rate: 30.80 },
      { day: 45, date: '45d ago', rate: 31.25 },
      { day: 60, date: '30d ago', rate: 31.70 },
      { day: 75, date: '15d ago', rate: 31.95 },
      { day: 90, date: 'Today', rate: 32.15 },
    ]
  },
  {
    id: 'south-africa',
    country: 'South Africa',
    flag: '🇿🇦',
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    pair: 'USD / ZAR',
    rate: 18.92,
    change90dPercent: 5.2,
    region: 'AFRICA',
    high90d: 19.35,
    low90d: 17.80,
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=80', // Cape Town Table Mountain
    whyText: 'South African Rand softness makes premier safari expeditions in Kruger National Park and Cape Wineland tours in Stellenbosch exceptionally cost-effective.',
    detailedAnalysis: 'Travelers benefit from world-class culinary experiences in Cape Town and 5-star game lodges at a fraction of typical international safari costs.',
    recommendedSeason: 'November to March (Cape) or May to September (Safari)',
    costs: {
      coffee: '$1.90 (R 36)',
      midMeal: '$15.00 (R 284)',
      hotelNight: '$82.00 (R 1,550)',
      savingsVs90d: '+$52 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 17.98 },
      { day: 15, date: '75d ago', rate: 18.20 },
      { day: 30, date: '60d ago', rate: 18.60 },
      { day: 45, date: '45d ago', rate: 18.40 },
      { day: 60, date: '30d ago', rate: 18.75 },
      { day: 75, date: '15d ago', rate: 19.10 },
      { day: 90, date: 'Today', rate: 18.92 },
    ]
  },
  {
    id: 'colombia',
    country: 'Colombia',
    flag: '🇨🇴',
    currencyCode: 'COP',
    currencySymbol: '$',
    pair: 'USD / COP',
    rate: 3920.45,
    change90dPercent: 4.8,
    region: 'SOUTH AMERICA',
    high90d: 4050.00,
    low90d: 3740.00,
    imageUrl: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=1400&q=80', // Cartagena / Medellín
    whyText: 'The Colombian Peso offers superb value for cultural tourism in Cartagena, coffee finca tours in the Eje Cafetero, and vibrant city stays in Medellín.',
    detailedAnalysis: 'Consistently strong exchange rates provide fantastic purchasing power for eco-lodges in Tayrona and specialty third-wave coffee tastings.',
    recommendedSeason: 'December to March',
    costs: {
      coffee: '$1.50 (COP 5,880)',
      midMeal: '$9.00 (COP 35,280)',
      hotelNight: '$58.00 (COP 227,300)',
      savingsVs90d: '+$48 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 3740.00 },
      { day: 15, date: '75d ago', rate: 3790.00 },
      { day: 30, date: '60d ago', rate: 3820.00 },
      { day: 45, date: '45d ago', rate: 3860.00 },
      { day: 60, date: '30d ago', rate: 3900.00 },
      { day: 75, date: '15d ago', rate: 3940.00 },
      { day: 90, date: 'Today', rate: 3920.45 },
    ]
  },
  {
    id: 'thailand',
    country: 'Thailand',
    flag: '🇹🇭',
    currencyCode: 'THB',
    currencySymbol: '฿',
    pair: 'USD / THB',
    rate: 36.85,
    change90dPercent: 6.3,
    region: 'ASIA',
    high90d: 37.10,
    low90d: 34.60,
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80', // Bangkok Wat Arun
    whyText: 'The Thai Baht has softened against key major currencies, giving island vacationers in Phuket and foodies in Bangkok unbeatable value for money.',
    detailedAnalysis: 'Street food, luxury 5-star riverside hotels, and wellness retreats in Chiang Mai remain some of the best travel bargains in Southeast Asia.',
    recommendedSeason: 'November to February',
    costs: {
      coffee: '$1.80 (THB 66)',
      midMeal: '$6.50 (THB 240)',
      hotelNight: '$62.00 (THB 2,280)',
      savingsVs90d: '+$63 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 34.65 },
      { day: 15, date: '75d ago', rate: 35.10 },
      { day: 30, date: '60d ago', rate: 35.70 },
      { day: 45, date: '45d ago', rate: 36.20 },
      { day: 60, date: '30d ago', rate: 36.60 },
      { day: 75, date: '15d ago', rate: 36.90 },
      { day: 90, date: 'Today', rate: 36.85 },
    ]
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    flag: '🇻🇳',
    currencyCode: 'VND',
    currencySymbol: '₫',
    pair: 'USD / VND',
    rate: 25420.00,
    change90dPercent: 3.9,
    region: 'ASIA',
    high90d: 25510.00,
    low90d: 24450.00,
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80', // Halong Bay
    whyText: 'Vietnamese Dong continues to offer incredible purchasing power for exploring Hanoi Old Quarter, Halong Bay cruises, and Hoi An lantern towns.',
    detailedAnalysis: 'Budget travelers and luxury seekers alike experience unmatched purchasing leverage for boutique villas and Michelin-recognized street delicacies.',
    recommendedSeason: 'February to April & August to October',
    costs: {
      coffee: '$1.20 (VND 30,500)',
      midMeal: '$5.00 (VND 127,000)',
      hotelNight: '$45.00 (VND 1,143,000)',
      savingsVs90d: '+$39 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 24460 },
      { day: 20, date: '70d ago', rate: 24700 },
      { day: 40, date: '50d ago', rate: 24980 },
      { day: 60, date: '30d ago', rate: 25200 },
      { day: 80, date: '10d ago', rate: 25380 },
      { day: 90, date: 'Today', rate: 25420 },
    ]
  },
  {
    id: 'united-kingdom',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    pair: 'USD / GBP',
    rate: 0.79,
    change90dPercent: -1.8,
    region: 'EUROPE',
    high90d: 0.81,
    low90d: 0.77,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80', // London Big Ben
    whyText: 'Stable exchange conditions for London West End shows, Edinburgh castle tours, and picturesque Cotswolds countryside escapes.',
    detailedAnalysis: 'Slight pound resilience makes advance booking and VAT planning helpful for optimizing UK metropolitan stays.',
    recommendedSeason: 'May to September',
    costs: {
      coffee: '$4.20 (£3.30)',
      midMeal: '$28.00 (£22.10)',
      hotelNight: '$180.00 (£142.20)',
      savingsVs90d: '-$18 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 0.805 },
      { day: 20, date: '70d ago', rate: 0.800 },
      { day: 40, date: '50d ago', rate: 0.795 },
      { day: 60, date: '30d ago', rate: 0.788 },
      { day: 80, date: '10d ago', rate: 0.792 },
      { day: 90, date: 'Today', rate: 0.790 },
    ]
  },
  {
    id: 'egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    currencyCode: 'EGP',
    currencySymbol: 'E£',
    pair: 'USD / EGP',
    rate: 48.60,
    change90dPercent: 19.5,
    region: 'AFRICA',
    high90d: 49.80,
    low90d: 40.50,
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=80', // Pyramids of Giza
    whyText: 'Recent currency realignment in Egypt creates historically low USD costs for Nile river cruises, Giza pyramid private tours, and Red Sea scuba resorts in Sharm El Sheikh.',
    detailedAnalysis: 'Travelers experience significant budget leverage for historical landmark guides and 5-star hotel accommodations in Cairo and Luxor.',
    recommendedSeason: 'October to April',
    costs: {
      coffee: '$1.40 (E£ 68)',
      midMeal: '$8.50 (E£ 413)',
      hotelNight: '$65.00 (E£ 3,160)',
      savingsVs90d: '+$195 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 40.60 },
      { day: 20, date: '70d ago', rate: 43.50 },
      { day: 40, date: '50d ago', rate: 46.20 },
      { day: 60, date: '30d ago', rate: 47.80 },
      { day: 80, date: '10d ago', rate: 48.30 },
      { day: 90, date: 'Today', rate: 48.60 },
    ]
  },
  {
    id: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    pair: 'USD / AUD',
    rate: 1.54,
    change90dPercent: 3.4,
    region: 'OCEANIA',
    high90d: 1.58,
    low90d: 1.48,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=80', // Sydney Opera House
    whyText: 'Favorable Australian Dollar levels provide great value for Great Barrier Reef diving, Sydney harbor coastal walks, and Melbourne cafe culture.',
    detailedAnalysis: 'Travelers can budget more flexibly for campervan rentals across Queensland and wine tasting tours in the Barossa Valley.',
    recommendedSeason: 'September to November & March to May',
    costs: {
      coffee: '$3.50 (A$ 5.40)',
      midMeal: '$22.00 (A$ 33.90)',
      hotelNight: '$140.00 (A$ 215.60)',
      savingsVs90d: '+$34 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 1.49 },
      { day: 25, date: '65d ago', rate: 1.51 },
      { day: 50, date: '40d ago', rate: 1.53 },
      { day: 75, date: '15d ago', rate: 1.55 },
      { day: 90, date: 'Today', rate: 1.54 },
    ]
  },
  {
    id: 'mexico',
    country: 'Mexico',
    flag: '🇲🇽',
    currencyCode: 'MXN',
    currencySymbol: '$',
    pair: 'USD / MXN',
    rate: 18.25,
    change90dPercent: 7.2,
    region: 'NORTH AMERICA',
    high90d: 18.75,
    low90d: 16.90,
    imageUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1400&q=80', // Mexico City / Tulum
    whyText: 'Recent Peso stabilization creates attractive pricing for cultural exploration in Oaxaca, boutique stays in Roma Norte, and Riviera Maya beach villas.',
    detailedAnalysis: 'Food tourism and artisan crafts remain top reasons to visit with favorable dollar conversion rates.',
    recommendedSeason: 'November to April',
    costs: {
      coffee: '$2.20 (MXN 40)',
      midMeal: '$11.00 (MXN 200)',
      hotelNight: '$75.00 (MXN 1,370)',
      savingsVs90d: '+$72 per $1,000 spent'
    },
    historicalData: [
      { day: 1, date: '90d ago', rate: 17.02 },
      { day: 25, date: '65d ago', rate: 17.40 },
      { day: 50, date: '40d ago', rate: 17.90 },
      { day: 75, date: '15d ago', rate: 18.35 },
      { day: 90, date: 'Today', rate: 18.25 },
    ]
  }
];

