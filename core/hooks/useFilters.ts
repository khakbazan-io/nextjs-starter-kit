import { useCallback, useState } from "react";

/**
 * A custom hook for managing filters with registration, application, and removal functionalities.
 *
 * @template T - A record type where keys are filter names and values are strings or numbers.
 * @returns An object containing:
 * - `registeredFilters`: The filters that have been registered.
 * - `appliedFilters`: The filters that have been applied.
 * - `registerFilter`: A function to register a new filter.
 * - `unregisterFilter`: A function to remove a registered filter.
 * - `applyFilters`: A function to apply all registered filters.
 * - `isFilterRegistered`: A function to check if a filter is registered.
 * - `isFilterApplied`: A function to check if a filter is applied.
 */
export function useFilters<
  T extends Partial<Record<string, string | number>>,
>() {
  // State to store registered filters
  const [registeredFilters, setRegisteredFilters] = useState<T>({} as T);
  // State to store applied filters
  const [appliedFilters, setAppliedFilters] = useState<T>({} as T);

  /**
   * Registers a new filter and optionally applies it.
   *
   * @template K - The key type of the filter.
   * @param key - The filter key.
   * @param value - The filter value.
   * @param apply - Whether to apply the filter immediately.
   * @returns The updated list of registered filters.
   */
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

  /**
   * Applies all registered filters.
   *
   * @returns The updated list of applied filters.
   */
  const applyFilters = useCallback(() => {
    setAppliedFilters(registeredFilters);
    return { ...appliedFilters, ...registeredFilters };
  }, [registeredFilters, appliedFilters]);

  /**
   * Unregisters (removes) a specific filter.
   *
   * @template K - The key type of the filter.
   * @param key - The filter key to be removed.
   * @returns The updated list of registered filters, or null if the key was not found.
   */
  const unregisterFilter = useCallback(
    <K extends keyof T>(key: K) => {
      const filtersCopy = { ...registeredFilters };

      if (key in filtersCopy) {
        delete filtersCopy[key];
        setRegisteredFilters(filtersCopy);
        return { ...filtersCopy };
      }

      return null;
    },
    [registeredFilters]
  );

  /**
   * Checks if a filter is registered.
   *
   * @template K - The key type of the filter.
   * @param key - The filter key to check.
   * @returns `true` if the filter is registered, otherwise `false`.
   */
  const isFilterRegistered = useCallback(
    <K extends keyof T>(key: K) => key in registeredFilters,
    [registeredFilters]
  );

  /**
   * Checks if a filter is applied.
   *
   * @template K - The key type of the filter.
   * @param key - The filter key to check.
   * @returns `true` if the filter is applied, otherwise `false`.
   */
  const isFilterApplied = useCallback(
    <K extends keyof T>(key: K) => key in appliedFilters,
    [appliedFilters]
  );

  return {
    registeredFilters, // Filters that have been registered
    appliedFilters, // Filters that have been applied
    registerFilter, // Function to register a new filter
    unregisterFilter, // Function to remove a registered filter
    applyFilters, // Function to apply all registered filters
    isFilterRegistered, // Function to check if a filter is registered
    isFilterApplied, // Function to check if a filter is applied
  };
}
