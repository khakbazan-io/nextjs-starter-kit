import type { QueryOptionsParams } from "@/core/types";
import type { User } from "@/types/users";

export type GetUserResponse = {
  data: User;
};

export type GetUserParams = {
  params?: {
    id?: string;
  };
};

export type UseGetUserType = {
  options: QueryOptionsParams<GetUserResponse, GetUserParams>;
  response: GetUserResponse;
};
