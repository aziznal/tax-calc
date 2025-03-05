"use client";

import { formatNumber } from "@/lib/format";
import { calculateNewSalary } from "@/lib/new-salary-calc";
import { useAppState } from "@/lib/state";
import { LucideArrowRight } from "lucide-react";
import { useMemo } from "react";

export const NewSalaryCalculator: React.FC = () => {
  const { monthlyIncome, incomeTaxableRate, ranges } = useAppState();

  const { rawExpenseByCompany, newSalary } = useMemo(
    () =>
      calculateNewSalary({
        taxableRate: incomeTaxableRate ?? 0,
        currentMonthlySalary: monthlyIncome ?? 0,
        taxRanges: ranges,
      }),
    [incomeTaxableRate, monthlyIncome, ranges],
  );

  if (!monthlyIncome || !incomeTaxableRate) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2 max-w-[400px] items-center">
        <span className="font-mono text-emerald-500">
          {formatNumber(monthlyIncome)}
        </span>

        <LucideArrowRight size="18" />

        <span className="font-mono text-emerald-500">
          {formatNumber(newSalary)}
        </span>

        <span className="text-muted-foreground">(after tax)</span>
      </div>

      <div className="text-muted-foreground text-sm">
        Assuming {formatNumber(monthlyIncome)} incurs{" "}
        {formatNumber(rawExpenseByCompany)} as raw expense for an Ltd company
      </div>
    </div>
  );
};
