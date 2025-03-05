"use client";
import { useCallback, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

export type PaginationType = {
  currentPage: number;
  pageSize: number;
  onPageSelect: (page: number) => void;
  calcIndex: (index: number) => number;
};

type Params = {
  limit?: number;
  id: string;
};

export function usePagination({ id, limit = 15 }: Params): PaginationType {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(limit);

  const [savedPage, setSavedPage, removeSavedPage] = useSessionStorage(id, 0);

  const onPageSelect = useCallback(
    (page: number) => {
      setSavedPage(page - 1);

      setCurrentPage(page - 1);
    },
    [id]
  );

  const calcIndex = useCallback(
    (index: number) => {
      return index + 1 + currentPage * pageSize;
    },
    [currentPage, pageSize]
  );

  useEffect(() => {
    if (savedPage) {
      setCurrentPage(Number(savedPage));

      removeSavedPage();

      sessionStorage.removeItem(id);
    }
  }, [id]);

  return {
    currentPage,
    pageSize,
    onPageSelect,
    calcIndex,
  };
}
