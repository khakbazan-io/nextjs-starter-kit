import axios, { type InternalAxiosRequestConfig } from "axios";
import { site } from "./site";

const instance = axios.create({
  baseURL: site.apiUrl,
});

const THROTTLE_TIME = 2000;
let lastRequestTime = 0;

const throttleRequest = (request: InternalAxiosRequestConfig<any>) => {
  const now = Date.now();

  if (request.method === "post" || request.method === "put") {
    if (now - lastRequestTime < THROTTLE_TIME) {
      return Promise.reject({
        id: null,
        message: "درخواست تکراری میباشد، لطفا کمی صبر کنید.",
        code: 429,
        type: "throttle",
      });
    }
    lastRequestTime = now;
  }

  return request;
};

instance.interceptors.request.use(
  async (request) => {
    request.headers["CLIENT-TYPE"] = "WEB-CLIENT";

    if (Object.keys(request.params ?? {}).length) {
      for (const key of Object.keys(request.params)) {
        if (request.params[key] === "" || !request.params) {
          delete request.params[key];
        }
      }
    }

    return throttleRequest(request);
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export { instance as api };
