import { QueryClient, isServer } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
        experimental_prefetchInRender: true,
      },
    },
  });
}

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}
