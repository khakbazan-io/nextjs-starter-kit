import { site } from "./site";

export async function serverFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const baseUrl = site.apiUrl;

    const response = await fetch(`${baseUrl}/${url}`, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
