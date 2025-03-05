import { useCallback, useState } from "react";

export function useFilters<
  T extends Partial<Record<string, string | number>>,
>() {
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

  return {
    registeredFilters,
    appliedFilters,
    registerFilter,
    unregisterFilter,
    applyFilters,
    isFilterRegistered,
    isFilterApplied,
  };
}
