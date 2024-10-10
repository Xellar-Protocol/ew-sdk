/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { Container } from './container';
import { Config } from './types/config';
import { TokenManager } from './utils/token-manager';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  protected container: Container;

  constructor(container: Container) {
    const { baseURL, clientSecret, version } =
      container.resolve<Config>('Config');

    this.container = container;

    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/${version}`,
      headers: {
        'Content-Type': 'application/json',
        'x-client-secret': clientSecret,
      },
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      (cfg: InternalAxiosRequestConfig) => {
        const tokenManager = container.resolve<TokenManager>('TokenManager');
        const currentToken = tokenManager.getToken();
        if (currentToken) {
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${currentToken}`;
        }
        return cfg;
      },
      error => Promise.reject(error),
    );
  }
}
