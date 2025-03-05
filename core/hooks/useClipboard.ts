"use client";
import { useCallback, useState } from "react";

export function useClipboard() {
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	const [copiedText, setCopiedText] = useState<string | undefined>(undefined);

	const copyToClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);

			setIsError(false);
			setIsCopied(true);
			setCopiedText(text);

			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			setIsError(true);
			setIsCopied(false);
			setCopiedText(undefined);
		}
	}, []);

	return {
		copiedText,
		isCopied,
		isError,
		copyToClipboard,
	};
}
