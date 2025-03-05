import { CalculatedRanges } from "./tax-range";

export function getMonthlyTaxAmount(args: { calculations: CalculatedRanges }) {
  if (args.calculations.length === 0) return 0;

  if (args.calculations.length === 1)
    return args.calculations[0].taxYearlyAmount / 12;

  return (
    args.calculations.reduce((acc, next) => ({
      ...acc,
      taxYearlyAmount: acc.taxYearlyAmount + next.taxYearlyAmount,
    })).taxYearlyAmount / 12
  );
}

