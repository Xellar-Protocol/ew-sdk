/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { RAMPABLE_API_URL, XELLAR_API_URL } from './constants';
import { Container } from './container';
import { Config } from './types/config';
import { BaseHttpResponse, RampableAccount } from './types/http';
import { handleError, XellarError } from './utils/error';
import { TokenManager } from './utils/token-manager';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  protected rampableAxiosInstance: AxiosInstance;

  protected container: Container;

  constructor(container: Container) {
    this.container = container;
    this.axiosInstance = this._setupAxiosInstance();
    this.rampableAxiosInstance = this._setupRampableAxiosInstance();
  }

  private _setupAxiosInstance() {
    const { clientSecret, env = 'sandbox' } =
      this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    const instance = axios.create({
      baseURL: `${baseURL}/api/v2`,
      headers: {
        'Content-Type': 'application/json',
        'x-client-secret': clientSecret,
      },
    });

    // Add request interceptor
    instance.interceptors.request.use(
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
      error => Promise.reject(error),
    );

    // Interceptor for handling 401 errors
    instance.interceptors.response.use(
      response => response, // Pass successful responses through
      async error => {
        if (isAxiosError(error) && error.response?.status === 401) {
          const tokenManager =
            this.container.resolve<TokenManager>('TokenManager');
          const refreshToken = tokenManager.getRefreshToken();

          if (refreshToken) {
            try {
              const refreshTokenResponse =
                await this._refreshToken(refreshToken);
              tokenManager.setWalletToken(refreshTokenResponse.walletToken);
              tokenManager.setRefreshToken(refreshTokenResponse.refreshToken);

              // Retry the original request with the new token
              if (error.config) {
                error.config.headers.Authorization = `Bearer ${refreshTokenResponse.walletToken}`;
                return instance(error.config);
              }
            } catch (refreshTokenError) {
              return Promise.reject(refreshTokenError);
            }
          }
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }

  private _setupRampableAxiosInstance() {
    const { env = 'sandbox' } = this.container.resolve<Config>('Config');

    const baseURL = RAMPABLE_API_URL[env];

    const instance = axios.create({
      baseURL: `${baseURL}/api/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    instance.interceptors.request.use(
      async (cfg: InternalAxiosRequestConfig) => {
        const tokenManager =
          this.container.resolve<TokenManager>('TokenManager');

        const accessToken = tokenManager.getRampableAccessToken();
        if (accessToken) {
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${accessToken}`;
        }
        return cfg;
      },
      error => Promise.reject(error),
    );

    return instance;
  }

  protected async _refreshToken(
    refreshToken: string,
  ): Promise<{ walletToken: string; refreshToken: string }> {
    const { clientSecret, env = 'sandbox' } =
      this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    try {
      const response = await axios.request<
        BaseHttpResponse<{ walletToken: string; refreshToken: string }>
      >({
        method: 'POST',
        baseURL: `${baseURL}/api/v2`,
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

    const tokenManager = this.container.resolve<TokenManager>('TokenManager');

    tokenManager.setRampableAccessToken(response.data.data.rampableAccessToken);

    return response.data.data.rampableAccessToken;
  }
}
