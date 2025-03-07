import { useCallback, useState } from "react";

/**
 * A custom hook for managing a boolean toggle state.
 *
 * @param {boolean} [initialState=false] - The initial state of the toggle (defaults to `false`).
 * @returns A tuple containing:
 * - `state`: The current boolean state.
 * - `toggle`: A function to toggle the state or set a specific value.
 */
export function useToggle(
  initialState?: boolean
): [boolean, (value?: boolean) => void] {
  // State to track the toggle status
  const [state, setState] = useState<boolean>(initialState ?? false);

  /**
   * Toggles the state between `true` and `false`, or sets it explicitly.
   *
   * @param {boolean} [value] - Optional value to explicitly set the toggle state.
   */
  const toggle = useCallback((value?: boolean) => {
    setState((prev) => (value !== undefined ? value : !prev));
  }, []);

  return [state, toggle];
}
