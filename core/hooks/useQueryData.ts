import {
  isServer,
  useIsFetching,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useQueryData<T>(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(queryKey) as T;

  const isFetching = useIsFetching({ queryKey: queryKey });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isServer || data) {
      setIsLoading(false);
    } else {
      setIsLoading(Boolean(isFetching));
    }
  }, [isFetching]);

  return {
    ...data,
    isFetching: isLoading,
  };
}
