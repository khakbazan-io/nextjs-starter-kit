"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A custom hook that delays updating a value until after a specified delay.
 * Useful for debouncing fast-changing values like user input.
 *
 * @param initialValue - The initial value of the debounced state.
 * @param delay - The debounce delay in milliseconds.
 * @param callback - (Optional) A function to be called when the debounced value updates.
 * @returns A tuple containing:
 * - `state`: The current state before debouncing.
 * - `debouncedState`: The debounced state after the delay.
 * - `handleChange`: A function to update the state.
 */
export function useDebounce<T>(
  initialValue: T,
  delay: number,
  callback?: (value: T) => void
): [T, T, (value: T) => void] {
  // State representing the immediate value
  const [state, setState] = useState<T>(initialValue);
  // State representing the debounced value after delay
  const [debouncedState, setDebouncedState] = useState<T>(initialValue);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedState(state);
      callback?.(state); // Invoke callback if provided
    }, delay);

    return () => {
      // Cleanup function to clear timeout if state changes before delay is met
      clearTimeout(handler);
    };
  }, [state, delay, callback]); // Re-run effect when state or delay changes

  /**
   * Updates the immediate state value.
   *
   * @param value - The new value to be set.
   */
  const handleChange = useCallback((value: T) => {
    setState(value);
  }, []);

  return [state, debouncedState, handleChange];
}
