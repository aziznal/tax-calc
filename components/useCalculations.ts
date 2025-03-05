import { useAppState } from "@/lib/state";
import { calcTax } from "@/lib/tax-calc";
import { useMemo } from "react";

export function useCalculations() {
  const { ranges, monthlyIncome, incomeTaxableRate } = useAppState();

  const calculations = useMemo(() => {
    if (!ranges || !monthlyIncome || !incomeTaxableRate) return [];

    return calcTax({
      ranges: ranges,
      baseYearlyIncome: 12 * monthlyIncome,
      taxableRate: incomeTaxableRate,
    });
  }, [monthlyIncome, incomeTaxableRate, ranges]);

  return {
    calculations,
  };
}
