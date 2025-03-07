"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { FiltersContextType } from "./types";

/**
 * Context for managing **filter state** across the application.
 */
export const FiltersContext = createContext<FiltersContextType<any>>(null!);

/**
 * **FiltersProvider Component** - Manages filters using React Context.
 *
 * - Allows **registration, application, and removal** of filters.
 * - Provides utility functions for checking filter states.
 *
 * @template T - A record where keys are filter names and values are `string | number`.
 * @param {React.ReactNode} children - The child components that can access the context.
 */
export function FiltersProvider<
  T extends Partial<Record<string, string | number>>,
>({ children }: { children: React.ReactNode }) {
  // Stores **registered filters**
  const [registeredFilters, setRegisteredFilters] = useState<T>({} as T);
  // Stores **applied filters**
  const [appliedFilters, setAppliedFilters] = useState<T>({} as T);

  /**
   * **Registers a filter** and optionally applies it.
   *
   * @template K - The key type of the filter.
   * @param {K} key - The filter key.
   * @param {T[K]} value - The filter value.
   * @param {boolean} [apply] - Whether to apply the filter immediately.
   * @returns {T} The updated list of registered filters.
   */
  const registerFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K], apply?: boolean): T => {
      const filter = { [key]: value };

      setRegisteredFilters((prev) => ({ ...prev, ...filter }));

      if (apply) {
        setAppliedFilters((prev) => ({ ...prev, ...filter }));
      }

      return { ...registeredFilters, ...filter };
    },
    [registeredFilters]
  );

  /**
   * **Applies all registered filters**.
   *
   * @returns {T} The updated list of applied filters.
   */
  const applyFilters = useCallback((): T => {
    setAppliedFilters(registeredFilters);
    return { ...appliedFilters, ...registeredFilters };
  }, [registeredFilters, appliedFilters]);

  /**
   * **Unregisters (removes) a specific filter**.
   *
   * @template K - The key type of the filter.
   * @param {K} key - The filter key to remove.
   * @param {boolean} [apply] - Whether to apply changes immediately.
   * @returns {T | null} The updated list of registered filters, or `null` if the filter was not found.
   */
  const unregisterFilter = useCallback(
    <K extends keyof T>(key: K, apply?: boolean): T | null => {
      if (!(key in registeredFilters)) return null;

      const filtersCopy = { ...registeredFilters };
      delete filtersCopy[key];

      setRegisteredFilters(filtersCopy);

      if (apply) {
        setAppliedFilters(filtersCopy);
      }

      return { ...filtersCopy };
    },
    [registeredFilters]
  );

  /**
   * **Checks if a filter is registered**.
   *
   * @template K - The key type of the filter.
   * @param {K} key - The filter key to check.
   * @returns {boolean} `true` if the filter is registered, otherwise `false`.
   */
  const isFilterRegistered = useCallback(
    <K extends keyof T>(key: K): boolean => key in registeredFilters,
    [registeredFilters]
  );

  /**
   * **Checks if a filter is applied**.
   *
   * @template K - The key type of the filter.
   * @param {K} key - The filter key to check.
   * @returns {boolean} `true` if the filter is applied, otherwise `false`.
   */
  const isFilterApplied = useCallback(
    <K extends keyof T>(key: K): boolean => key in appliedFilters,
    [appliedFilters]
  );

  // Context value provided to children
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

/**
 * **Custom Hook**: Provides access to the FiltersContext.
 *
 * @template T - A record where keys are filter names and values are `string | number`.
 * @returns {FiltersContextType<T>} The filters context.
 * @throws {Error} Throws an error if used outside a `FiltersProvider`.
 */
export function useFiltersProvider<
  T extends Partial<Record<string, string | number>>,
>(): FiltersContextType<T> {
  const context = useContext(FiltersContext) as FiltersContextType<T>;

  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  return context;
}
