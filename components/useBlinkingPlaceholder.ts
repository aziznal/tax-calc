import { useEffect, useState } from "react";

const PLACEHOLDER_BLINKER = " |";

export function useBlinkingPlaceholder(args: { placeholder: string }) {
  const [placeholder, setPlaceholder] = useState(args.placeholder);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((placeholder) => {
        if (placeholder.includes(PLACEHOLDER_BLINKER))
          return placeholder.replace(PLACEHOLDER_BLINKER, "");
        return placeholder.trim() + PLACEHOLDER_BLINKER;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return {
    placeholder,
  };
}
