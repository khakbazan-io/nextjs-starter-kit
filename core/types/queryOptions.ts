import type {
  QueryOptions as LibQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type QueryOptions<T> = Partial<LibQueryOptions<T>>;

export type QueryOptionsParams<T, U = {}> = Partial<UseQueryOptions<T>> & U;
