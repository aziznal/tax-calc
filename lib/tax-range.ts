import { createRandomId } from "./random-id";

export type TaxRange = {
  id: string;

  /** The min amount to have for the tax to apply */
  minThreshold?: number;

  /** number between 0 and 100 */
  taxPercentage?: number;
};

export type TaxRanges = TaxRange[];

export function createTaxRange(args?: {
  minThreshold?: number;
  taxPercentage?: number;
}): TaxRange {
  return {
    id: createRandomId(),
    minThreshold: args?.minThreshold,
    taxPercentage: args?.taxPercentage,
  };
}

export type CalculatedRange = {
  id: string;

  baseYearlyIncome: number;
  taxableYearlyIncome: number;

  taxPercentage: number;
  taxMinThreshold: number;

  taxYearlyAmount: number;
  remainingAmount: number;
};

export type CalculatedRanges = CalculatedRange[];
