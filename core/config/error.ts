import { AxiosError } from "axios";

/**
 * Defines the structure of an API error response.
 */
export interface ApiError {
  status: boolean; // Indicates whether the request was successful (false for errors)
  error: {
    id: number; // Unique error identifier from the backend
    message: string; // Human-readable error message
    code: number; // Error code for categorization
  };
}

/**
 * Represents a structured error object returned by `finalizeError`.
 */
interface HandledError {
  id: number | null; // Error ID (null if not provided)
  message: string; // Error message for display
  code: number | null; // Error code (null if unknown)
  type: "backend" | "network" | "unknown"; // Error type classification
}

/**
 * Normalizes and finalizes an error object, ensuring a consistent format.
 *
 * - Detects **Axios errors** (backend & network issues)
 * - Detects **Fetch API errors** (serverFetch, failed responses)
 * - Provides a **default message** for unknown errors
 * - Handles missing response data properly
 *
 * @param {unknown} error - The error object to process.
 * @returns {HandledError} A structured error object with relevant details.
 */
export function finalizeError(error: unknown): HandledError {
  /** Handle **Axios Errors** */
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiError;

    if (errorData?.error) {
      return {
        id: errorData.error.id || null,
        message: errorData.error.message || "خطای ناشناخته‌ای رخ داده است", // "An unknown error occurred."
        code: errorData.error.code || null,
        type: "backend",
      };
    }

    if (!error.response) {
      return {
        id: null,
        message:
          "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.", // "Could not connect to the server. Please check your internet connection."
        code: null,
        type: "network",
      };
    }
  }

  /** Handle **Fetch API Errors** */
  if (error instanceof Response) {
    return {
      id: null,
      message: `خطای سرور: ${error.statusText} (${error.status})`, // "Server error: statusText (statusCode)"
      code: error.status || null,
      type: "backend",
    };
  }

  /** Handle **Network Errors in Fetch Requests** */
  if (error instanceof Error && error.message.includes("Failed to fetch")) {
    return {
      id: null,
      message: "اتصال به سرور برقرار نشد. لطفاً اینترنت خود را بررسی کنید.", // "Could not connect to the server. Please check your internet connection."
      code: null,
      type: "network",
    };
  }

  /** Handle **Unknown Errors** */
  return {
    id: null,
    message: (error as any)?.message ?? "خطای ناشناخته‌ای رخ داده است", // "An unknown error occurred."
    code: (error as any)?.code ?? null,
    type: "unknown",
  };
}
