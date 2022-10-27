export const formatNumber = (number: number) =>
  new Intl.NumberFormat("de-DE").format(number);
