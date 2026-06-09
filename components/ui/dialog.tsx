import type { HTMLAttributes, ReactNode } from "react";

type DialogRootProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

function Dialog({ children }: DialogRootProps) {
  return <>{children}</>;
}

function DialogTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function DialogPortal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function DialogClose({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function DialogOverlay({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

function DialogContent({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

function DialogHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

function DialogFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

function DialogTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={className} {...props}>{children}</h2>;
}

function DialogDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={className} {...props}>{children}</p>;
}

function useDialogComposition() {
  return { isComposing: () => false, setComposing: () => {}, justEndedComposing: () => false, markCompositionEnd: () => {} };
}

export { Dialog, DialogTrigger, DialogPortal, DialogClose, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, useDialogComposition };
