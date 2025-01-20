import axios from 'axios';
import {
  interceptorErrorHandler,
  responseErrorHandler,
  responseSuccessHandler,
  setRequestToken,
} from './core/AxiosHelpers';

const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const httpInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 5 * 60 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

httpInstance.interceptors.request.use(setRequestToken, interceptorErrorHandler);
httpInstance.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);

/**
 * get methods
 * @param {*} url
 * @param {*} params
 */
export function get<T>(
  url: string,
  params: any,
  data: any,
  config = {}
): Promise<T> {
  return httpInstance.get(url, {
    params: params,
    ...config,
  });
}

// export function getWithOptions<T>(url, options): Promise<T> {
//   return httpInstanceWithOptions.get(url, options);
// }

export function put<T>(url, params, data, options = {}): Promise<T> {
  return httpInstance.put(url, data, {
    params: params,
    ...options,
  });
}

export function remove<T>(url, params, data, options = {}): Promise<T> {
  return httpInstance.delete(url, {
    params: params,
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...options,
  });
}

export function post<T>(url, params, data, options = {}): Promise<T> {
  return httpInstance.post(url, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params: params,
    ...options,
  });
}
