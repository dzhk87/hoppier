import { USD, CAD, CurrencySymbols, ExchangeRates } from "../constants/currency";


export const formatCurrency = (value, currency) => {
  switch (currency) {
    case USD:
    case CAD:
      return CurrencySymbols[currency] + ' ' + parseFloat(value).toFixed(2);
    default:
      return value;
  }
};

export const applyExchangeRate = (amountInUSDCents, currency) => {
  return formatCurrency(amountInUSDCents / 100 * ExchangeRates[currency], currency);
};
