import type { PropsWithChildren } from "react";

export type PropsProviderCmProps<T> = PropsWithChildren<{
	value: T;
}>;
