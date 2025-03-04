import { createRandomId } from "./random-id";
import { CalculatedRanges, TaxRange, TaxRanges } from "./tax-range";

export function calcTax(args: {
  ranges: TaxRanges;
  baseAmount: number;
}): CalculatedRanges {
  return (
    args.ranges.filter(
      (range) =>
        range.minThreshold !== undefined && range.taxPercentage !== undefined,
    ) as Required<TaxRange>[]
  )
    .filter((range) => range.minThreshold < args.baseAmount)
    .map((range, i, all) => {
      const nextRange = all[i + 1];

      const taxableAmount = getTaxableAmount({
        baseAmount: args.baseAmount,
        minThreshold: range.minThreshold,
        nextThreshold: nextRange?.minThreshold,
      });

      const taxAmount = calcTaxAmount({
        taxableAmount,
        taxPercentage: range.taxPercentage,
      });

      return {
        id: createRandomId(),

        baseAmount: args.baseAmount,
        taxableAmount,

        taxPercentage: range.taxPercentage,
        taxMinThreshold: range.minThreshold,

        taxAmount,

        remainingAmount: taxableAmount - taxAmount,
      };
    });
}

function calcTaxAmount(args: { taxPercentage: number; taxableAmount: number }) {
  return args.taxableAmount * (args.taxPercentage / 100);
}

function getTaxableAmount(args: {
  baseAmount: number;
  minThreshold: number;
  nextThreshold?: number;
}): number {
  if (args.nextThreshold) {
    return args.nextThreshold - args.minThreshold;
  } else {
    return args.baseAmount - args.minThreshold;
  }
}
