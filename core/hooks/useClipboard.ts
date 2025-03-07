"use client";

import { useCallback, useState } from "react";

/**
 * A custom hook for copying text to the clipboard with state tracking.
 *
 * @returns An object containing:
 * - `copiedText`: The last copied text (if any).
 * - `isCopied`: A boolean indicating if the text was successfully copied.
 * - `isError`: A boolean indicating if there was an error during copying.
 * - `copyToClipboard`: A function to copy text to the clipboard.
 */
export function useClipboard() {
  // State to track whether the copy operation was successful
  const [isCopied, setIsCopied] = useState(false);
  // State to track whether there was an error while copying
  const [isError, setIsError] = useState(false);
  // State to store the last copied text
  const [copiedText, setCopiedText] = useState<string | undefined>(undefined);

  /**
   * Copies the provided text to the clipboard and updates state accordingly.
   *
   * @param text - The text to copy to the clipboard.
   */
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text); // Attempt to write text to clipboard

      setIsError(false);
      setIsCopied(true);
      setCopiedText(text);

      // Reset `isCopied` state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      // Handle errors in case copying fails
      setIsError(true);
      setIsCopied(false);
      setCopiedText(undefined);
    }
  }, []);

  return {
    copiedText, // The last copied text
    isCopied, // Whether the text is currently copied
    isError, // Whether an error occurred
    copyToClipboard, // Function to trigger text copying
  };
}
