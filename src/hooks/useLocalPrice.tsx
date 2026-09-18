import { useMemo } from 'react'

// Base price in PKR (the reference currency)
const BASE_PRICE_PKR = 22400
const ORIGINAL_PRICE_PKR = 32000

// Approximate exchange rates relative to PKR (updated periodically)
const RATES_TO_PKR: Record<string, number> = {
  USD: 278.5,
  EUR: 304.2,
  GBP: 352.8,
  INR: 3.34,
  AED: 75.8,
  SAR: 74.25,
  CAD: 203.2,
  AUD: 181.6,
  NZD: 166.3,
  JPY: 1.86,
  CNY: 38.4,
  MYR: 64.8,
  SGD: 216.4,
  HKD: 35.65,
  KRW: 0.212,
  THB: 8.27,
  BDT: 2.29,
  LKR: 0.93,
  NPR: 1.71,
  CHF: 325.6,
  SEK: 27.0,
  NOK: 26.5,
  DKK: 40.8,
  ZAR: 15.4,
  BRL: 52.1,
  RUB: 3.08,
  TRY: 8.42,
  MXN: 16.2,
  IDR: 0.0173,
  PHP: 4.93,
  VND: 0.0113,
  EGP: 5.74,
  NGN: 0.172,
  KES: 2.15,
  GHS: 21.1,
  PKR: 1,
}

// Map country/currency codes to ISO 4217 currency codes
const LOCALE_TO_CURRENCY: Record<string, string> = {
  US: 'USD', CA: 'CAD', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
  NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
  AE: 'AED', SA: 'SAR', IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NPR: 'NPR',
  CN: 'CNY', JP: 'JPY', KR: 'KRW', TH: 'THB', MY: 'MYR', SG: 'SGD', HK: 'HKD',
  AU: 'AUD', NZ: 'NZD', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  ZA: 'ZAR', BR: 'BRL', RU: 'RUB', TR: 'TRY', MX: 'MXX', ID: 'IDR',
  PH: 'PHP', VN: 'VND', EG: 'EGP', NG: 'NGN', KE: 'KES', GH: 'GHS',
}

// Common navigator language → currency fallback
const LANG_TO_CURRENCY: Record<string, string> = {
  en: 'USD', ur: 'PKR', hi: 'INR', bn: 'BDT', ar: 'SAR', zh: 'CNY',
  ja: 'JPY', ko: 'KRW', th: 'THB', ms: 'MYR', de: 'EUR', fr: 'EUR',
  es: 'EUR', pt: 'EUR', it: 'EUR', nl: 'EUR', tr: 'TRY', ru: 'RUB',
  id: 'IDR', tl: 'PHP', vi: 'VND', sw: 'KES', yo: 'NGN',
}

function detectCurrency(): string {
  try {
    const lang = (navigator.language || 'en').toLowerCase()
    const parts = lang.split('-')
    const langCode = parts[0]
    const regionCode = parts[1]?.toUpperCase()

    // Try region from locale (e.g. "en-US" → "US")
    if (regionCode && LOCALE_TO_CURRENCY[regionCode]) {
      return LOCALE_TO_CURRENCY[regionCode]
    }
    // Fall back to language
    if (LANG_TO_CURRENCY[langCode]) {
      return LANG_TO_CURRENCY[langCode]
    }
  } catch {
    // ignore
  }
  return 'USD'
}

export function useLocalPrice() {
  return useMemo(() => {
    const currency = detectCurrency()
    const rate = RATES_TO_PKR[currency]

    // If we don't have a rate, default to PKR
    if (!rate) {
      return {
        currency: 'PKR',
        price: formatPrice(BASE_PRICE_PKR, 'PKR'),
        originalPrice: formatPrice(ORIGINAL_PRICE_PKR, 'PKR'),
        isConverted: false,
      }
    }

    const localPrice = BASE_PRICE_PKR / rate
    const localOriginal = ORIGINAL_PRICE_PKR / rate

    return {
      currency,
      price: formatPrice(localPrice, currency),
      originalPrice: formatPrice(localOriginal, currency),
      isConverted: currency !== 'PKR',
    }
  }, [])
}

function formatPrice(amount: number, currency: string): string {
  try {
    // For zero-decimal or three-decimal currencies
    const zeroDecimal = ['JPY', 'KRW', 'VND', 'IDR', 'KWD', 'BHD', 'OMR', 'JOD', 'KES', 'NGN', 'GHS'].includes(currency)
    const maximumFractionDigits = zeroDecimal ? 0 : 0

    const formatted = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(amount)

    return formatted
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`
  }
}
