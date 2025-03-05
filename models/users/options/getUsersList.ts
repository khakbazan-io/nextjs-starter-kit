import { api } from "@/core/config";
import { queryOptions } from "@tanstack/react-query";
import type { UseGetUsersListType } from "../types";

export function getUsersListOptions(options?: UseGetUsersListType["options"]) {
  return queryOptions<UseGetUsersListType["response"]>({
    queryKey: ["usersList"],
    queryFn: async () => {
      const url = "users/list";

      const response = await api.get(url);

      return response.data;
    },
    ...options,
  });
}
