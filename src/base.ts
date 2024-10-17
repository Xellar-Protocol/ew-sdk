/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { Container } from './container';
import { Config } from './types/config';
import { BaseHttpResponse, RampableAccount } from './types/http';
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

        const currentToken = tokenManager.getWalletToken();
        if (currentToken) {
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${currentToken}`;
        }
        return cfg;
      },
      async error => {
        if (isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            const tokenManager =
              this.container.resolve<TokenManager>('TokenManager');

            const refreshToken = tokenManager.getRefreshToken();

            if (refreshToken) {
              let refreshTokenResponse: {
                walletToken: string;
                refreshToken: string;
              };

              try {
                refreshTokenResponse = await this._refreshToken(refreshToken);

                tokenManager.setWalletToken(refreshTokenResponse.walletToken);
                tokenManager.setRefreshToken(refreshTokenResponse.refreshToken);
              } catch (refreshTokenError) {
                return Promise.reject(refreshTokenError);
              }

              if (error.config) {
                // Repeat the failed request using the renewed access token

                error.config.headers.Authorization = `Bearer ${refreshTokenResponse.walletToken}`;

                return this.axiosInstance(error.config);
              }
            }
          }
        }

        return Promise.reject(error);
      },
    );
  }

  protected async _refreshToken(
    refreshToken: string,
  ): Promise<{ walletToken: string; refreshToken: string }> {
    const { baseURL, clientSecret, version } =
      this.container.resolve<Config>('Config');

    try {
      const response = await axios.request<
        BaseHttpResponse<{ walletToken: string; refreshToken: string }>
      >({
        method: 'POST',
        baseURL: `${baseURL}/api/${version}`,
        url: 'wallet/refresh',
        headers: {
          'Content-Type': 'application/json',
          'x-client-secret': clientSecret,
        },
        data: { refreshToken },
      });

      return response.data.data;
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }

  protected async createRampableAccount(
    rampable: RampableAccount,
  ): Promise<string> {
    const response = await this.axiosInstance.post<
      BaseHttpResponse<{ rampableAccessToken: string }>
    >('account/rampable/create', {
      ...rampable,
    });

    return response.data.data.rampableAccessToken;
  }
}
