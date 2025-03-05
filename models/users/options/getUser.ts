import { api } from "@/core/config";
import { queryOptions } from "@tanstack/react-query";
import type { UseGetUserType } from "../types/getUser";

export function getUserOptions(options?: UseGetUserType["options"]) {
  const { params, ...restOptions } = options ?? {};

  return queryOptions<UseGetUserType["response"]>({
    queryKey: ["usersList", params?.id],
    queryFn: async () => {
      const url = `users/single/${params?.id}`;

      const response = await api.get(url);

      return response.data;
    },
    enabled: Boolean(params?.id),
    ...restOptions,
  });
}
