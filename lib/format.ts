export function formatNumber(num: number) {
  return Intl.NumberFormat("en", {}).format(Math.round(num));
}

export function formatIntegerInput(input: string | number): number {
  if (typeof input === "number") return input;

  return +input.replaceAll(",", "").replaceAll(".", "");
}
