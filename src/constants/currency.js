export const USD = 'USD';
export const CAD = 'CAD';

export const Currencies = [
  USD,
  CAD,
];

const ExchangeRates = {
  [USD]: 1,
  [CAD]: 1.24
}

const CurrencySymbols = {
  [USD]: '$',
  [CAD]: '$'
};

export const formatCurrency = (value, currency) => {
  switch (currency) {
    case USD:
    case CAD:
      return CurrencySymbols[currency] + ' ' + parseFloat(value).toFixed(2);
    default:
      return value;
  }
}

export const applyExchangeRate = (amountInUSDCents, currency) => {
  return formatCurrency(amountInUSDCents / 100 * ExchangeRates[currency], currency);
}