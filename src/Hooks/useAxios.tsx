import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { API_URL } from "../Utils";

interface FetchDataParams {
  endpoint: string;
  method: AxiosRequestConfig["method"];
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

interface Response<T = Record<string, unknown>> {
  status: number;
  info: T;
}

interface UseAxiosReturn {
  response: Response | null;
  hasError: AxiosError | null;
  isLoading: boolean;
  get: (endpoint: string, params?: Record<string, unknown>) => Promise<boolean>;
  post: (endpoint: string, data?: Record<string, unknown>) => Promise<boolean>;
  put: (endpoint: string, data?: Record<string, unknown>) => Promise<boolean>;
  delete: (endpoint: string, params?: Record<string, unknown>) => Promise<boolean>;
}

export const useAxios = (baseURL: string = API_URL): UseAxiosReturn => {
  const [response, setResponse] = useState<Response | null>(null);
  const [hasError, setHasError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cache and queue
  const cache = useRef<Record<string, Response>>({});
  const queue = useRef<Record<string, Array<(value: boolean) => void>>>({});

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const fetchData = async ({
    endpoint,
    method,
    data = {},
    params = {},
  }: FetchDataParams): Promise<boolean> => {
    setIsLoading(true);
    setHasError(null);
    const cacheKey = JSON.stringify({ endpoint, method, data, params });

    if (cache.current[cacheKey]) {
      setResponse(cache.current[cacheKey]);
      setIsLoading(false);
      return true;
    }

    // Queue logic
    if (queue.current[cacheKey]) {
      return new Promise(resolve => {
        queue.current[cacheKey].push(resolve);
      });
    } else {
      queue.current[cacheKey] = [];
    }

    try {
      const result = await axios({
        url: `${baseURL}${endpoint}`,
        method,
        data,
        params,
        withCredentials: true,
      });
      cache.current[cacheKey] = result.data;
      setResponse(result.data);
      queue.current[cacheKey].forEach(callback => callback(true));
      queue.current[cacheKey] = [];
      return true;
    } catch (error) {
      setHasError(error as AxiosError);
      queue.current[cacheKey].forEach(callback => callback(false));
      queue.current[cacheKey] = [];
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const get = async (
    endpoint: string,
    params: Record<string, unknown> = {}
  ): Promise<boolean> => fetchData({ endpoint, method: "GET", params });

  const post = async (
    endpoint: string,
    data: Record<string, unknown> = {}
  ): Promise<boolean> => fetchData({ endpoint, method: "POST", data });

  const put = async (
    endpoint: string,
    data: Record<string, unknown> = {}
  ): Promise<boolean> => fetchData({ endpoint, method: "PUT", data });

  const deleteRequest = async (
    endpoint: string,
    params: Record<string, unknown> = {}
  ): Promise<boolean> => fetchData({ endpoint, method: "DELETE", params });

  return {
    response,
    hasError,
    isLoading,
    
    get,
    post,
    put,
    delete: deleteRequest,
  };
};
