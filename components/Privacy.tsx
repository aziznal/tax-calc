"use client";

import { useAppState } from "@/lib/state";
import { cn } from "@/lib/utils";
import { LucideEye } from "lucide-react";
import { useEffect, useState } from "react";

export const PrivacyToggle: React.FC = () => {
  const { isPrivacyActive, setIsPrivacyActive } = useAppState();

  const [hasRunOnce, setHasRunOnce] = useState(false);

  // set privacy to true the first time the app runs
  useEffect(() => {
    if (hasRunOnce) return;
    setIsPrivacyActive(true);
    setHasRunOnce(true);
  }, [hasRunOnce, setIsPrivacyActive]);

  return (
    <>
      {!isPrivacyActive && <PrivacyButton className="absolute top-4 right-4" />}

      {isPrivacyActive && (
        <div className="fixed top-0 left-0 h-dvh w-dvw z-100 backdrop-blur flex items-center justify-center text-2xl flex-col gap-4 text-center text-balance px-4">
          <div>Privacy mode is active. Disable it to continue.</div>

          <PrivacyButton className="text-amber-400 border bg-amber-900" />
        </div>
      )}
    </>
  );
};

const PrivacyButton: React.FC<{ className?: string }> = (props) => {
  const { isPrivacyActive, setIsPrivacyActive } = useAppState();

  const togglePrivacy = () => {
    setIsPrivacyActive(!isPrivacyActive);
  };

  return (
    <button
      className={cn(
        "p-2 transition-colors cursor-pointer hover:bg-neutral-900 rounded-full",
        props.className,
      )}
      onClick={togglePrivacy}
    >
      <LucideEye size="20" />
    </button>
  );
};
