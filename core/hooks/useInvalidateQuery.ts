import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useInvalidateQuery(queryKey: QueryKey) {
  const [isInvalidating, setIsInvalidating] = useState(false);

  const queryClient = useQueryClient();

  const invalidateQuery = useCallback(async () => {
    setIsInvalidating(true);

    try {
      await queryClient.invalidateQueries({
        queryKey: queryKey,
        type: "all",
      });
    } catch (error) {
    } finally {
      setIsInvalidating(false);
    }
  }, [queryClient.invalidateQueries]);

  return { invalidateQuery, isInvalidating };
}
