import type { HTMLAttributes, ReactNode } from "react";

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

type TooltipTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

type TooltipContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
};

function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}

function Tooltip({ children }: TooltipProps) {
  return <>{children}</>;
}

function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <>{children}</>;
}

function TooltipContent({ children, className = "", side: _side, align: _align, sideOffset: _sideOffset, alignOffset: _alignOffset, avoidCollisions: _avoidCollisions, ...props }: TooltipContentProps) {
  return <div className={className} {...props}>{children}</div>;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
