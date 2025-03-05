import { useQuery } from "@tanstack/react-query";
import { getUserOptions } from "../options";
import type { UseGetUserType } from "../types/getUser";

export function useGetUser(options?: UseGetUserType["options"]) {
  return useQuery(getUserOptions(options));
}
