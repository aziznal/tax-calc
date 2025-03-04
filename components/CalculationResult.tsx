"use client";

import { TaxRanges } from "@/lib/tax-range";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { calcTax } from "@/lib/tax-calc";
import { formatNumber } from "@/lib/format";

type CalculationResultProps = {
  baseAmount?: number;

  ranges?: TaxRanges;
};

export function CalculationResult(props: CalculationResultProps) {
  const [shouldShowCalculation, setShouldShowCalculation] = useState(false);
  const shouldShowCalculateButton = useMemo(
    () =>
      !shouldShowCalculation &&
      props.baseAmount !== undefined &&
      props.ranges &&
      props.ranges.length > 0,
    [props.baseAmount, props.ranges, shouldShowCalculation],
  );

  const calculations = useMemo(() => {
    if (!props.ranges || !props.baseAmount) return [];

    return calcTax({ ranges: props.ranges, baseAmount: props.baseAmount });
  }, [props.baseAmount, props.ranges]);

  const totalTaxAmount = useMemo(() => {
    if (!calculations || calculations.length === 0) return;

    if (calculations.length === 1) return calculations[0].taxAmount;

    return calculations.reduce((acc, next) => ({
      ...acc,
      taxAmount: acc.taxAmount + next.taxAmount,
    })).taxAmount;
  }, [calculations]);

  return (
    <div className="">
      {shouldShowCalculateButton && (
        <Button onClick={() => setShouldShowCalculation(true)}>
          Calculate
        </Button>
      )}

      {shouldShowCalculation && (
        <div className="flex flex-col items-end justify-end">
          <div className="mb-6 self-end">
            {calculations.map((result) => (
              <div
                key={"result-" + result.id}
                className="text-lg flex items-center justify-end gap-2 self-end"
              >
                <span>{formatNumber(result.taxableAmount)}</span>

                <span>-</span>

                <span className="text-red-700">{result.taxPercentage}%</span>

                <span>=</span>

                <span className="text-amber-500">
                  {formatNumber(result.taxAmount)}
                </span>
              </div>
            ))}
          </div>

          {props.baseAmount && totalTaxAmount && (
            <div className="flex flex-col justify-end items-end self-end">
              <div className="mb-2">
                Total Taxed ={" "}
                <span className="text-amber-500">
                  {formatNumber(totalTaxAmount)}
                </span>
              </div>

              <div>
                Remaining ={" "}
                <span className="text-emerald-600">
                  {formatNumber(props.baseAmount - totalTaxAmount)}
                </span>
              </div>

              <div className="whitespace-nowrap">
                ={" "}
                <span className="text-emerald-600 -mr-15">
                  {formatNumber((props.baseAmount - totalTaxAmount) / 12)} per
                  month
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
