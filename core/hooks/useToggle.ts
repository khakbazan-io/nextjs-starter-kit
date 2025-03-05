import { useCallback, useState } from "react";

export function useToggle(
	initialState?: boolean,
): [boolean, (value?: boolean) => void] {
	const [state, setState] = useState(initialState ?? false);

	const toggle = useCallback((value?: boolean) => {
		setState((prev) => value || !prev);
	}, []);

	return [state, toggle];
}
