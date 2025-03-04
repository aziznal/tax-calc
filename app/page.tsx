"use client";

import { CalculationResult } from "@/components/CalculationResult";
import { TaxRangesInput } from "@/components/TaxRangesInput";
import { Input } from "@/components/ui/input";
import { useBlinkingPlaceholder } from "@/components/useBlinkingPlaceholder";
import { TaxRanges } from "@/lib/tax-range";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [taxRanges, setTaxRanges] = useState<TaxRanges>([]);
  const { placeholder } = useBlinkingPlaceholder({
    placeholder: "Enter yearly taxable income",
  });
  const [baseAmount, setBaseAmount] = useState<number>();

  return (
    <div className="flex flex-col justify-center items-center text-center py-64 min-h-dvh container mx-auto">
      <h1 className="font-black text-4xl mb-3">Tax Calculator</h1>

      <p className="mb-6">
        See how much of your income is taxed given different tax regions
      </p>

      <div className="max-w-screen-sm min-w-[300px] mb-12">
        <Input
          value={baseAmount}
          onChange={(e) => setBaseAmount(+e.target.value)}
          placeholder={placeholder}
          className="h-[50px] !text-lg"
        />
      </div>

      <p className="font-bold mb-4">Tax ranges</p>

      <TaxRangesInput ranges={taxRanges} onRangesChanged={setTaxRanges} />

      <CalculationResult baseAmount={baseAmount} ranges={taxRanges} />

      <div className="mt-12 text-sm text-neutral-600 flex flex-col gap-2">
        <div>
          by{" "}
          <Link
            href="https://github.com/aziznal/tax-calc-turkiye"
            className="text-rose-700"
            target="_blank"
          >
            aziznal
          </Link>
        </div>

        <div className="text-xs">march 2025</div>
      </div>
    </div>
  );
}
