import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '@/config';

export const jsonToParam = (json: any, first_str = '?') => {
  const parts = [];
  for (const i in json) {
    if (json.hasOwnProperty(i) && json[i]) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(json[i])}`);
    }
  }
  return parts.length ? first_str + parts.join('&') : '';
};

const sleep = async (ms: number) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
};

const formatError = async (error: any) => {
  const { response } = error;
  const { errors } = response.data;

  sleep(10);
};

const getClient = (baseURL: string) => {
  const client = axios.create({ baseURL });
  client.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      formatError(error);
      return Promise.reject(error);
    },
  );
  return client;
};

class ApiClient {
  private client: AxiosInstance;
  constructor() {
    this.client = getClient(config.api_url);
  }

  async get(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.get(
        url + jsonToParam(data, url.includes('?') ? '&' : '?'),
        conf,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.delete(
        url,
        {
          data,
          ...conf,
        },
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async head(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.head(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async options(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.options(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.post(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.put(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.patch(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiClient;
