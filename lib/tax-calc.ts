import { createRandomId } from "./random-id";
import {
  CalculatedRange,
  CalculatedRanges,
  TaxRange,
  TaxRanges,
} from "./tax-range";

export function calcTax(args: {
  ranges: TaxRanges;
  baseYearlyIncome: number;
  taxableRate: number;
}): CalculatedRanges {
  const taxableIncome = (args.taxableRate / 100) * args.baseYearlyIncome;

  return (
    args.ranges.filter(
      (range) =>
        range.minThreshold !== undefined && range.taxPercentage !== undefined,
    ) as Required<TaxRange>[]
  )
    .filter((range) => range.minThreshold < taxableIncome)
    .map((range, i, all) => {
      const nextRange = all[i + 1];

      const taxableYearlyIncome = getTaxableAmount({
        baseIncome: taxableIncome,
        minThreshold: range.minThreshold,
        nextThreshold: nextRange?.minThreshold,
      });

      const taxYearlyAmount = calcTaxAmount({
        taxableAmount: taxableYearlyIncome,
        taxPercentage: range.taxPercentage,
      });

      return {
        id: createRandomId(),

        baseYearlyIncome: args.baseYearlyIncome,
        taxableYearlyIncome,

        taxPercentage: range.taxPercentage,
        taxMinThreshold: range.minThreshold,

        taxYearlyAmount,

        remainingAmount: taxableYearlyIncome - taxYearlyAmount,
      } satisfies CalculatedRange;
    });
}

function calcTaxAmount(args: { taxPercentage: number; taxableAmount: number }) {
  return args.taxableAmount * (args.taxPercentage / 100);
}

function getTaxableAmount(args: {
  baseIncome: number;
  minThreshold: number;
  nextThreshold?: number;
}): number {
  if (args.nextThreshold) {
    return args.nextThreshold - args.minThreshold;
  } else {
    return args.baseIncome - args.minThreshold;
  }
}
