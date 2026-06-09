import type { ReactNode } from "react";

function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function TooltipTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function TooltipContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
