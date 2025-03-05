import { useAppState } from "@/lib/state";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { formatIntegerInput } from "@/lib/format";

export const IncomeInput: React.FC = () => {
  const {
    monthlyIncome,
    setMonthlyIncome,
    incomeTaxableRate,
    setIncomeTaxableRate,
  } = useAppState();

  return (
    <div className="max-w-screen-sm w-full sm:w-[400px] mb-12 flex flex-col gap-3">
      <Input
        value={monthlyIncome || ""}
        onChange={(e) => setMonthlyIncome(formatIntegerInput(e.target.value))}
        placeholder="Monthly Income"
        className="h-[60px] !text-lg border-emerald-500 border-2"
      />

      <div className="flex items-center">
        <Label htmlFor="taxable-percent" className="mr-4">
          Taxable Percentage
        </Label>

        <Input
          id="taxable-percent"
          value={incomeTaxableRate || ""}
          onChange={(e) =>
            setIncomeTaxableRate(formatIntegerInput(e.target.value))
          }
          placeholder="Taxable"
          className="w-[80px] mr-2"
        />

        <span className="text-muted-foreground">%</span>
      </div>
    </div>
  );
};
