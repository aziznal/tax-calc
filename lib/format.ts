export function formatNumber(num: number) {
  return Intl.NumberFormat("en", {}).format(Math.round(num));
}
