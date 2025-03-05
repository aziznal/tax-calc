import { getMonthlyTaxAmount } from "./aggregate";
import { calcTax } from "./tax-calc";
import { TaxRanges } from "./tax-range";

export const ASSUMED_COMPANY_EXPENSE_MULTIPLER = 1.73;

export function calculateNewSalary(args: {
  currentMonthlySalary: number;
  taxableRate: number;
  taxRanges: TaxRanges;
}) {
  if (args.currentMonthlySalary === 0)
    return {
      rawExpenseByCompany: 0,
      newSalary: 0,
    };

  const rawExpenseByCompany =
    args.currentMonthlySalary * ASSUMED_COMPANY_EXPENSE_MULTIPLER;

  const calculations = calcTax({
    baseYearlyIncome: rawExpenseByCompany * 12,
    ranges: args.taxRanges,
    taxableRate: args.taxableRate,
  });

  return {
    rawExpenseByCompany,
    newSalary: rawExpenseByCompany - getMonthlyTaxAmount({ calculations }),
  };
}
