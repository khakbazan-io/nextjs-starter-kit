"use client";
import { useCallback, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

/**
 * Type definition for the pagination hook.
 */
export type PaginationType = {
  currentPage: number; // The current page number
  pageSize: number; // Number of items per page
  onPageSelect: (page: number) => void; // Function to update the selected page
  calcIndex: (index: number) => number; // Function to calculate the item index
};

/**
 * Parameters for the usePagination hook.
 */
type Params = {
  limit?: number; // The default number of items per page
  id: string; // A unique identifier for session storage
  isZeroBase?: boolean; // Whether pagination starts from 0 instead of 1
};

/**
 * A custom hook to manage pagination with session storage support.
 *
 * @param {Params} params - The parameters for pagination.
 * @returns {PaginationType} An object containing pagination state and utility functions.
 */
export function usePagination({
  id,
  limit = 15,
  isZeroBase = false,
}: Params): PaginationType {
  // Manage the current page state
  const [currentPage, setCurrentPage] = useState<number>(isZeroBase ? 0 : 1);
  // Manage the page size state
  const [pageSize] = useState<number>(limit);

  // Manage session storage to persist the page number
  const [savedPage, setSavedPage, removeSavedPage] = useSessionStorage<number>(
    id,
    isZeroBase ? 0 : 1
  );

  /**
   * Updates the selected page and saves it to session storage.
   *
   * @param {number} page - The page number to select.
   */
  const onPageSelect = useCallback(
    (page: number) => {
      const newPage = isZeroBase ? page : page;
      setSavedPage(newPage);
      setCurrentPage(newPage);
    },
    [setSavedPage, isZeroBase]
  );

  /**
   * Calculates the index of an item based on the current page.
   *
   * @param {number} index - The index of the item in the current page.
   * @returns {number} The calculated global index of the item.
   */
  const calcIndex = useCallback(
    (index: number) => index + currentPage * pageSize + (isZeroBase ? 0 : 1),
    [currentPage, pageSize, isZeroBase]
  );

  // Load the saved page from session storage on mount
  useEffect(() => {
    if (savedPage !== undefined) {
      setCurrentPage(savedPage);
      removeSavedPage();
      sessionStorage.removeItem(id);
    }
  }, [id, savedPage, removeSavedPage]);

  return {
    currentPage,
    pageSize,
    onPageSelect,
    calcIndex,
  };
}
