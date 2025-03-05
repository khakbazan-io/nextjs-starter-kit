export function urlWithParams(
	url: string,
	params?: Record<string, any>,
): string {
	if (!params) return url;

	const queryString = Object.entries(params)
		.filter(([_, value]) => Boolean(value))
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
		)
		.join("&");

	return queryString ? `${url}?${queryString}` : url;
}
