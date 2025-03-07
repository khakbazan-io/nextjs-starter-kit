import { finalizeError } from "./error";
import { site } from "./site";

/**
 * Performs a **server-side fetch request** to the provided API endpoint.
 *
 * - Automatically prepends the **base API URL** (`site.apiUrl`).
 * - Ensures **proper error handling** via `finalizeError`.
 * - Supports **custom fetch options** (e.g., headers, method, body).
 *
 * @template T - The expected response data type.
 * @param {string} url - The API endpoint (relative to `site.apiUrl`).
 * @param {RequestInit} [options] - Optional fetch configuration (e.g., headers, method).
 * @returns {Promise<T>} A promise resolving to the response data.
 * @throws {HandledError} Throws a structured error object from `finalizeError`.
 */
export async function serverFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const baseUrl = site.apiUrl;
    const fullUrl = `${baseUrl}/${url}`.replace(/([^:]\/)\/+/g, "$1"); // Prevents double slashes

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Attempt to parse error response
      throw finalizeError({ response, data: errorData });
    }

    return (await response.json()) as T;
  } catch (error) {
    throw finalizeError(error); // Ensure all errors are processed consistently
  }
}
