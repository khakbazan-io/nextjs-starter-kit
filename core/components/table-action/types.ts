import type { ReactNode } from "react";

export type TableActionItem<T extends string> = {
  title: string;
  key: T;
  icon?: ReactNode;
  href?: string;
};

export type TableActionCmProps<T extends string> = {
  onAction: Record<T, VoidFunction>;
  items: TableActionItem<T>[];
  customTitles?: Partial<Record<T, string>>;
};
