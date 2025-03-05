"use client";

import { CalculationResult } from "@/components/CalculationResult";
import { IncomeInput } from "@/components/IncomeInput";
import { NewSalaryCalculator } from "@/components/NewSalaryCalculator";
import { Section } from "@/components/Section";
import { TaxRangesInput } from "@/components/TaxRangesInput";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center py-64 min-h-dvh px-4 sm:px-0 container mx-auto">
      <h1 className="font-black text-4xl mb-3">Tax Calculator</h1>

      <p className="mb-6 text-muted-foreground">
        See how much of your income is taxed given different tax regions
      </p>

      <IncomeInput />

      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <Section title="Tax Ranges">
          <TaxRangesInput />
        </Section>

        <div className="flex flex-col gap-4">
          <Section title="Results">
            <CalculationResult />
          </Section>

          <Section title="New Salary Estimate">
            <NewSalaryCalculator />
          </Section>
        </div>
      </div>

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
