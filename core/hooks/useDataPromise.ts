import { useCallback, useEffect, useRef, useState } from "react";
import type { Nullable } from "../types";

export function useDataPromise<T>(data: T | undefined, isError: boolean) {
  const resolverRef = useRef<((value: T) => void) | null>(null);
  const rejecterRef = useRef<Nullable<VoidFunction>>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isError) {
      if (rejecterRef.current) {
        rejecterRef.current();
        rejecterRef.current = null;
        resolverRef.current = null;
      }
      setIsLoading(false);
      setIsDone(true);
    } else if (data !== undefined && data !== null) {
      if (resolverRef.current) {
        resolverRef.current(data);
        resolverRef.current = null;
        rejecterRef.current = null;
      }
      setIsLoading(false);
      setIsDone(true);
    }
  }, [data, isError]);

  const getPromise = useCallback((): Promise<T> => {
    if (isError) {
      setIsDone(true);
      return Promise.reject();
    } else if (data !== undefined && data !== null) {
      setIsDone(true);
      return Promise.resolve(data);
    } else {
      setIsLoading(true);
      setIsDone(false);
      return new Promise<T>((resolve, reject) => {
        resolverRef.current = resolve;
        rejecterRef.current = reject;
      });
    }
  }, [data, isError]);

  return { getPromise, isLoading, isDone };
}
