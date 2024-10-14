/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { Container } from './container';
import { Config } from './types/config';
import { BaseHttpResponse } from './types/http';
import { handleError, XellarError } from './utils/error';
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
      async (cfg: InternalAxiosRequestConfig) => {
        const tokenManager =
          this.container.resolve<TokenManager>('TokenManager');

        if (tokenManager.isWalletTokenUsed()) {
          await this.refreshToken();
        }

        const currentToken = tokenManager.getWalletToken();
        if (currentToken) {
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${currentToken}`;
        }
        return cfg;
      },
      error => Promise.reject(error),
    );
  }

  async refreshToken(): Promise<void> {
    try {
      const tokenManager = this.container.resolve<TokenManager>('TokenManager');
      const refreshToken = tokenManager.getRefreshToken();

      if (refreshToken) {
        const response = await this.axiosInstance.post<
          BaseHttpResponse<{ walletToken: string; refreshToken: string }>
        >('/wallet/refresh', { refreshToken });

        const newWalletToken = response.data.data.walletToken;
        const newRefreshToken = response.data.data.refreshToken;
        tokenManager.setWalletToken(newWalletToken);
        tokenManager.setRefreshToken(newRefreshToken);
      }
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }
}
