import { AxiosError } from "axios";

export interface ApiError {
  status: boolean;
  error: {
    id: number;
    message: string;
    code: number;
  };
}

interface HandledError {
  id: number | null;
  message: string;
  code: number | null;
  type: "backend" | "network" | "unknown";
}

export function finalizeError(error: unknown): HandledError {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiError;

    if (errorData?.error) {
      return {
        id: errorData.error.id || null,
        message: errorData.error.message || "خطای ناشناخته‌ای رخ داده است",
        code: errorData.error.code || null,
        type: "backend",
      };
    }

    if (!error.response) {
      return {
        id: null,
        message:
          "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.",
        code: null,
        type: "network",
      };
    }
  }

  return {
    id: null,
    message: (error as any)?.message ?? "خطای ناشناخته‌ای رخ داده است",
    code: (error as any)?.code ?? null,
    type: "unknown",
  };
}
