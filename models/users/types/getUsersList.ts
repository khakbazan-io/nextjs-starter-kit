import type { QueryOptionsParams } from "@/core/types";
import type { User } from "@/types/users";

export type GetUsersListResponse = {
  data: User[];
};

export type UseGetUsersListType = {
  options: QueryOptionsParams<UseGetUsersListType["response"]>;
  response: GetUsersListResponse;
};
