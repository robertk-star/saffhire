import type { ReactNode } from "react";

type TooltipProviderProps = {
  children: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
};

type TooltipProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
};

function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}

function Tooltip({ children }: TooltipProps) {
  return <>{children}</>;
}

function TooltipTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function TooltipContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
