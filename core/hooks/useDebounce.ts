"use client";
import { useCallback, useEffect, useState } from "react";

export function useDebounce<T>(
  initialValue: T,
  delay: number,
  callback?: (value: T) => void
): [T, T, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  const [debouncedState, setDebouncedState] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
      callback?.(state);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [state]);

  const handleChange = useCallback((value: T) => {
    setState(value);
  }, []);

  return [state, debouncedState, handleChange];
}
