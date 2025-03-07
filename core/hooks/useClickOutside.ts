import { useEffect, useRef } from "react";

/**
 * A custom hook that detects clicks outside of a referenced element and triggers a callback.
 *
 * @param callback - The function to execute when a click outside the referenced element is detected.
 * @returns A ref to be attached to the element that should detect outside clicks.
 */
export const useClickOutside = (callback: VoidFunction) => {
  // Create a ref to store the DOM element that should detect outside clicks
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /**
     * Handles click events and checks if the click is outside the referenced element.
     * If so, it calls the provided callback function.
     *
     * @param event - The mouse event triggered by a click.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current && // Ensure the ref exists
        !wrapperRef.current.contains(event.target as Node) // Check if the click is outside
      ) {
        callback(); // Execute the callback function
      }
    };

    // Add event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts or dependencies change
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]); // Re-run effect if callback changes

  return wrapperRef; // Return the ref to be attached to the target element
};
