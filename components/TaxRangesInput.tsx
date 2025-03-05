import { Input } from "./ui/input";
import { LucideExternalLink, LucideRotateCw, LucideTrash } from "lucide-react";
import { createTaxRange, TaxRange, TaxRanges } from "@/lib/tax-range";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAppState } from "@/lib/state";

export function TaxRangesInput() {
  const { ranges, setRanges } = useAppState();

  const update = (args: { range: TaxRange; index: number }) => {
    setRanges(
      ranges.map((range, i) => {
        if (i === args.index) {
          return args.range;
        }

        return range;
      }),
    );
  };

  const addNewRange = () => {
    setRanges([...ranges, createTaxRange()]);
  };

  const removeRange = (id: string) => {
    setRanges(ranges.filter((range) => range.id !== id));
  };

  const reset = () => {
    const hasConfirmed = confirm("Confirm reset: This action cannot be done.");

    if (!hasConfirmed) return;

    setRanges([]);
  };

  return (
    <div className="flex flex-col items-center gap-12 py-6">
      <section className="flex flex-col gap-4">
        {ranges.length > 0 && (
          <ul className="flex flex-col gap-3">
            {ranges.map((range, i) => (
              <li
                key={"range-input-" + range.id}
                className="flex gap-1 items-center"
              >
                <div className="flex gap-3">
                  <Input
                    className="w-[150px]"
                    placeholder="min. threshold"
                    value={range.minThreshold}
                    onChange={(e) =>
                      update({
                        range: { ...range, minThreshold: +e.target.value },
                        index: i,
                      })
                    }
                  />

                  <div className="flex gap-1 items-center">
                    <Input
                      className="w-[50px]"
                      placeholder="tax"
                      value={range.taxPercentage}
                      onChange={(e) =>
                        update({
                          range: { ...range, taxPercentage: +e.target.value },
                          index: i,
                        })
                      }
                    />

                    <span className="text-sm text-neutral-600">%</span>
                  </div>
                </div>

                <LucideTrash
                  onClick={() => removeRange(range.id)}
                  className="w-fit h-fit p-2 block shrink-0 cursor-pointer hover:bg-neutral-900 rounded-full transition-colors text-neutral-700"
                  size="18"
                />
              </li>
            ))}
          </ul>
        )}

        <div
          onClick={addNewRange}
          className="border rounded-md p-2 px-4 w-fit mx-auto text-sm text-neutral-500 hover:border-blue-800 transition-colors hover:bg-neutral-900 cursor-pointer"
        >
          Add New Range +
        </div>
      </section>

      {ranges.length === 0 && (
        <div>
          <p className="mb-3 text-sm text-neutral-400">Or use a template</p>

          <TurkiyeRangeTemplate onSelect={setRanges} />
        </div>
      )}

      {ranges.length > 0 && (
        <Button
          variant="outline"
          className="text-muted-foreground"
          onClick={reset}
        >
          Reset <LucideRotateCw />
        </Button>
      )}
    </div>
  );
}

const RangeTemplate: React.FC<{
  name: string;
  ranges: TaxRanges;
  onSelect: (value: TaxRanges) => void;
}> = (props) => {
  return (
    <div
      className="p-2 px-4 rounded border text-sm font-bold border-rose-900 hover:border-rose-700 cursor-pointer transition-all hover:bg-neutral-800"
      onClick={() => props.onSelect(props.ranges)}
    >
      {props.name}
    </div>
  );
};

const TurkiyeRangeTemplate: React.FC<{
  onSelect: (value: TaxRanges) => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <RangeTemplate
        onSelect={props.onSelect}
        name="Türkiye 2025"
        ranges={[
          createTaxRange({
            minThreshold: 0,
            taxPercentage: 15,
          }),

          createTaxRange({
            minThreshold: 158_000,
            taxPercentage: 20,
          }),

          createTaxRange({
            minThreshold: 330_000,
            taxPercentage: 27,
          }),

          createTaxRange({
            minThreshold: 800_000,
            taxPercentage: 35,
          }),

          createTaxRange({
            minThreshold: 4_300_000,
            taxPercentage: 40,
          }),
        ]}
      />

      <Link
        href="https://www.garantibbva.com.tr/blog/vergi-dilimleri-nedir-nasil-hesaplanir#:~:text=Y%C4%B1ll%C4%B1k%20geliriniz%20158%20bin%20TL,TL%2C%20%C3%BCzerindeki%20tutarlar%20i%C3%A7in%20%27"
        className="text-xs text-neutral-600 flex items-center gap-1 justify-center"
        target="_blank"
      >
        source <LucideExternalLink size="12" />
      </Link>
    </div>
  );
};
