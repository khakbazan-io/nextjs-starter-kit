import type { PropsWithChildren } from "react";

export type FiltersProviderCmProps = PropsWithChildren<unknown>;

export type FiltersContextType<
  T extends Partial<Record<string, string | number>>
> = {
  registeredFilters: T;
  appliedFilters: T;
  registerFilter: <K extends keyof T>(
    key: K,
    value: T[K],
    apply?: boolean
  ) => T;
  unregisterFilter: <K extends keyof T>(key: K, apply?: boolean) => T | null;
  applyFilters: () => T;
  isFilterRegistered: <K extends keyof T>(key: K) => boolean;
  isFilterApplied: <K extends keyof T>(key: K) => boolean;
};
