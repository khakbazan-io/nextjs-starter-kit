import { createContext, useContext } from "react";
import type { PropsProviderCmProps } from "./types";

export const PropsProviderContext = createContext<unknown>(undefined);

export function PropsProvider<T>({ value, children }: PropsProviderCmProps<T>) {
	return (
		<PropsProviderContext.Provider value={value}>
			{children}
		</PropsProviderContext.Provider>
	);
}

export function useProps<T>() {
	const context = useContext(PropsProviderContext);

	if (context === undefined) {
		throw new Error("useProps must be used within a PropsProvider");
	}
	return context as T;
}
