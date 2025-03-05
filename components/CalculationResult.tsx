"use client";

import { useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { useCalculations } from "./useCalculations";
import { useAppState } from "@/lib/state";
import { getMonthlyTaxAmount } from "@/lib/aggregate";

export function CalculationResult() {
  const { calculations } = useCalculations();
  const { monthlyIncome, incomeTaxableRate } = useAppState();

  const monthlyTaxAmount = useMemo(() => {
    if (!calculations || calculations.length === 0) return;

    return getMonthlyTaxAmount({ calculations });
  }, [calculations]);

  return (
    <div className="flex flex-col min-w-[300px] font-mono">
      {monthlyIncome && incomeTaxableRate && (
        <div className="flex flex-col justify-start items-start w-full space-y-2 mb-4">
          <div>
            <span className="font-sans">Raw Yearly Income:</span>{" "}
            <span className="text-emerald-500">
              {formatNumber(monthlyIncome * 12)}
            </span>
          </div>

          <div>
            <span className="font-sans">Of which taxable:</span>{" "}
            <span className="text-emerald-500">
              {formatNumber(monthlyIncome * 12 * (incomeTaxableRate / 100))} (
              {incomeTaxableRate}%)
            </span>
          </div>
        </div>
      )}

      <section className="mb-6 flex flex-col w-full">
        {calculations.map((result) => (
          <div key={"result-" + result.id} className="flex items-center gap-2">
            <span>{formatNumber(result.taxableYearlyIncome)}</span>

            <span>-</span>

            <span className="text-red-700">{result.taxPercentage}%</span>

            <span>=</span>

            <span className="text-amber-500">
              {formatNumber(result.taxYearlyAmount)}
            </span>
          </div>
        ))}
      </section>

      {monthlyIncome && monthlyTaxAmount && (
        <div className="flex flex-col w-full items-start">
          <div className="mb-2 flex gap-2">
            <span className="font-sans">Tax per year</span>

            <span>=</span>

            <div className="text-amber-500 flex gap-2">
              <span>{formatNumber(monthlyTaxAmount * 12)}</span>
              <span>({formatNumber(monthlyTaxAmount)} monthly)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="mr-[5px]">Remaining</span>
            <span>=</span>
            <span className="text-emerald-500">
              {formatNumber(monthlyIncome - monthlyTaxAmount)} monthly
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
