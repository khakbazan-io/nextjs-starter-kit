"use client";
import { getQueryClient } from "@/core/config";
import { HeroUIProvider } from "@heroui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { ToastProvider } from "@heroui/toast";

export type ProvidersProps = PropsWithChildren<{
  themeProps?: Omit<ThemeProviderProps, "children">;
}>;

export const Providers: React.FC<ProvidersProps> = ({
  themeProps,
  children,
}) => {
  const router = useRouter();

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextTopLoader height={6} zIndex={999999999999999} />

        <ToastProvider
          placement="top-center"
          toastProps={{
            shouldShowTimeoutProgress: true,
            timeout: 3500,
            variant: "flat",
          }}
        />

        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
};
