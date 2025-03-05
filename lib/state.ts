import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TaxRanges } from "./tax-range";

type AppState = {
  monthlyIncome?: number;
  setMonthlyIncome: (value: number) => void;

  incomeTaxableRate?: number;
  setIncomeTaxableRate: (value: number) => void;

  ranges: TaxRanges;
  setRanges: (value: TaxRanges) => void;

  isPrivacyActive: boolean;
  setIsPrivacyActive: (value: boolean) => void;
};

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      incomeTaxableRate: 20,
      setMonthlyIncome: (value) => set({ monthlyIncome: value }),

      setIncomeTaxableRate: (value) => set({ incomeTaxableRate: value }),

      ranges: [],
      setRanges: (value) => set({ ranges: value }),

      isPrivacyActive: true,
      setIsPrivacyActive: (value: boolean) => set({ isPrivacyActive: value }),
    }),
    {
      name: "app-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
