import axios, { type InternalAxiosRequestConfig } from "axios";
import { site } from "./site";

/**
 * Creates an Axios instance with a predefined base URL.
 */
const instance = axios.create({
  baseURL: site.apiUrl,
});

/**
 * Throttle time (in milliseconds) to prevent duplicate `POST` or `PUT` requests.
 */
const THROTTLE_TIME = 2000;
let lastRequestTime = 0;

/**
 * Throttles `POST` and `PUT` requests to prevent duplicate submissions.
 *
 * @param {InternalAxiosRequestConfig<any>} request - The outgoing Axios request.
 * @returns {Promise<InternalAxiosRequestConfig<any>>} The processed request or a rejection if throttled.
 */
const throttleRequest = (request: InternalAxiosRequestConfig<any>) => {
  const now = Date.now();

  if (request.method === "post" || request.method === "put") {
    if (now - lastRequestTime < THROTTLE_TIME) {
      return Promise.reject({
        id: null,
        message: "درخواست تکراری میباشد، لطفا کمی صبر کنید.", // "Duplicate request detected. Please wait a moment."
        code: 429,
        type: "throttle",
      });
    }
    lastRequestTime = now;
  }

  return request;
};

/**
 * Axios request interceptor.
 * - Removes empty query parameters (`""` or `undefined` values).
 * - Applies throttling for `POST` and `PUT` requests.
 */
instance.interceptors.request.use(
  async (request) => {
    if (request.params && Object.keys(request.params).length) {
      for (const key of Object.keys(request.params)) {
        if (request.params[key] === "" || request.params[key] === undefined) {
          delete request.params[key]; // Remove empty parameters
        }
      }
    }

    return throttleRequest(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios response interceptor.
 * - Directly returns the response.
 * - Handles errors by forwarding them for centralized error handling.
 */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export { instance as api };
