import { createContext, useContext } from "react";
import type { PropsProviderCmProps } from "./types";

/**
 * Context to provide generic props to components.
 */
export const PropsProviderContext = createContext<unknown>(undefined);

/**
 * **PropsProvider Component** - A generic context provider for passing props.
 *
 * - Allows **any type of data** to be provided via React Context.
 *
 * @template T - The type of the provided value.
 * @param {PropsProviderCmProps<T>} props - Component props.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
export function PropsProvider<T>({ value, children }: PropsProviderCmProps<T>) {
  return (
    <PropsProviderContext.Provider value={value}>
      {children}
    </PropsProviderContext.Provider>
  );
}

/**
 * **Custom Hook**: Accesses the `PropsProviderContext` and retrieves the provided props.
 *
 * @template T - The expected type of the context value.
 * @returns {T} The provided context value.
 * @throws {Error} Throws an error if used outside a `PropsProvider`.
 */
export function usePropsProvider<T>(): T {
  const context = useContext(PropsProviderContext);

  if (context === undefined) {
    throw new Error("useProps must be used within a PropsProvider");
  }

  return context as T;
}
