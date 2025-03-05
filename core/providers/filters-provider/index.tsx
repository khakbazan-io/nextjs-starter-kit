"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { FiltersContextType } from "./types";

export const FiltersContext = createContext<FiltersContextType<any>>(null!);

export function FiltersProvider<
  T extends Partial<Record<string, string | number>>
>({ children }: { children: React.ReactNode }) {
  const [registeredFilters, setRegisteredFilters] = useState<T>({} as T);
  const [appliedFilters, setAppliedFilters] = useState<T>({} as T);

  const registerFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K], apply?: boolean) => {
      const filter = { [key]: value };

      setRegisteredFilters((prev) => ({ ...prev, ...filter }));

      if (apply) {
        setAppliedFilters((prev) => ({ ...prev, ...filter }));
      }

      return { ...registeredFilters, ...filter };
    },
    [registeredFilters]
  );

  const applyFilters = useCallback(() => {
    setAppliedFilters(registeredFilters);

    return { ...appliedFilters, ...registeredFilters };
  }, [registeredFilters, appliedFilters]);

  const unregisterFilter = useCallback(
    <K extends keyof T>(key: K, apply?: boolean) => {
      const filtersCopy = { ...registeredFilters };

      if (key in filtersCopy) {
        delete filtersCopy[key];

        setRegisteredFilters(filtersCopy);

        if (apply) {
          setAppliedFilters(filtersCopy);
        }

        return { ...filtersCopy };
      }

      return null;
    },
    [registeredFilters]
  );

  const isFilterRegistered = useCallback(
    <K extends keyof T>(key: K) => {
      if (key in registeredFilters) {
        return true;
      }

      return false;
    },
    [registeredFilters]
  );

  const isFilterApplied = useCallback(
    <K extends keyof T>(key: K) => {
      if (key in appliedFilters) {
        return true;
      }

      return false;
    },
    [appliedFilters]
  );

  const value: FiltersContextType<T> = {
    registeredFilters,
    appliedFilters,
    registerFilter,
    unregisterFilter,
    applyFilters,
    isFilterRegistered,
    isFilterApplied,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useFiltersProvider<
  T extends Partial<Record<string, string | number>>
>() {
  const context = useContext(FiltersContext) as FiltersContextType<T>;

  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  return context;
}
