import { useQuery } from "@tanstack/react-query";
import { getUsersListOptions } from "../options";
import type { UseGetUsersListType } from "../types";

export function useGetUsersList(options?: UseGetUsersListType["options"]) {
  return useQuery(getUsersListOptions(options));
}
