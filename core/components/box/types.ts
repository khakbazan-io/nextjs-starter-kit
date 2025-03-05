import type { PropsWithChildren, ReactNode } from "react";

export type BoxCmProps = PropsWithChildren<{
  title?: string;
  hint?: string;
  isBordered?: boolean;
  titleAddon?: ReactNode;
  className?: string;
}>;
