import type { PropsWithChildren, ReactNode } from "react";

export type PaperCmProps = PropsWithChildren<{
  title?: string;
  hint?: string;
  addon?: ReactNode;
  isLoading?: boolean;
  bordered?: boolean;
}>;

export type PaperRowCmProps = PropsWithChildren<{
  title: string;
}>;

export type PaperGroupCmProps = PropsWithChildren<{
  title: string;
}>;
