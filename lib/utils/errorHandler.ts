import { showErrorToast, showToast } from "./toast";

/**
 * Standard API Error Response Structure from Backend
 */
interface ApiErrorResponse {
  success: boolean;
  message: string;
  error?: string; // Technical error detail/code
}

type ParsedApiError = {
  response?: { status?: number; data?: ApiErrorResponse };
  message?: string;
  success?: boolean;
  error?: string;
  isBusinessError?: boolean;
};

/** Auth failures are handled by axios logout — no error toast needed. */
export function isAuthSessionError(error: unknown): boolean {
  const errObj = error as ParsedApiError;

  const status = errObj?.response?.status;
  if (status === 401 || status === 403) return true;

  let message = "";
  let errorCode = "";

  if (errObj?.response?.data) {
    message = errObj.response.data.message || "";
    errorCode = errObj.response.data.error || "";
  } else if (errObj?.success === false || errObj?.isBusinessError) {
    message = errObj.message || "";
    errorCode = errObj.error || "";
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  const combined = `${message} ${errorCode}`.toLowerCase();
  const authPatterns = [
    "could not validate credentials",
    "token has expired",
    "token expired",
    "invalid token",
    "not authenticated",
    "unauthorized",
    "http_401",
    "session expired",
  ];

  return authPatterns.some((pattern) => combined.includes(pattern));
}

/**
 * Professional API Error Handler
 * 
 * RECOMMENDED USAGE:
 * - Use this in `catch` blocks for API calls to automatically parse the standardized 
 *   backend error format: {"success": false, "message": "...", "error": "..."}
 * - For simple frontend-only validation or fixed string messages, use `showErrorToast` directly.
 * 
 * @param error The error object (usually from axios catch block)
 * @param fallback Default message if no specific message is found in the response
 */
export function handleApiError(error: unknown, fallback: string = "An unexpected error occurred.") {
  let message = fallback;
  let technicalDetail = "";
  const skipToast = isAuthSessionError(error);

  // 1. Handle Axios or Standardization Errors (objects with response.data)
  const errObj = error as ParsedApiError;
  
  if (errObj?.response?.data) {
    const data = errObj.response.data;
    message = data.message || message;
    technicalDetail = data.error || "";
  } 
  // 2. Handle Business Errors (already parsed objects or rejected by axiosInstance)
  else if (errObj?.success === false || errObj?.isBusinessError) {
    message = errObj.message || message;
    technicalDetail = errObj.error || "";
  }
  // 3. Handle generic Error objects
  else if (error instanceof Error) {
    message = error.message;
  }
  // 4. Handle direct string messages (graceful degradation)
  else if (typeof error === "string") {
    message = error;
  }

  // Log technical detail to console for debugging
  if (technicalDetail) {
    console.error("API Technical Error:", technicalDetail);
  } else if (error !== message) {
    console.error("API Error:", error);
  }

  // Auth/session errors: axios interceptor redirects to login — don't flash a toast
  if (!skipToast) {
    showErrorToast(message);
  }

  return message;
}

/** Clear visible toasts before forced session logout redirect. */
export function dismissErrorToasts(): void {
  showToast.dismiss();
}
