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
        const originalRequest = error.config;
        if (
          isAxiosError(error) &&
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

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
      baseURL: `${baseURL}/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    instance.interceptors.request.use(
      async (cfg: InternalAxiosRequestConfig) => {
        const tokenManager =
          this.container.resolve<TokenManager>('TokenManager');

        const { rampableClientSecret } =
          this.container.resolve<Config>('Config');

        const accessToken = tokenManager.getRampableAccessToken();

        if (accessToken) {
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${accessToken}`;
        }

        let rampableClientSecretFromTokenManager =
          rampableClientSecret || tokenManager.getRampableClientSecret();

        if (!rampableClientSecretFromTokenManager) {
          const organizationInfo = await this.getOrganizationInfo();
          rampableClientSecretFromTokenManager =
            organizationInfo.rampableClientSecret;
          tokenManager.setRampableClientSecret(
            organizationInfo.rampableClientSecret,
          );
        }

        if (rampableClientSecretFromTokenManager) {
          cfg.headers = cfg.headers || {};
          cfg.headers['x-client-secret'] = rampableClientSecretFromTokenManager;
        }

        return cfg;
      },
      error => Promise.reject(error),
    );

    // Interceptor for handling 401 errors
    instance.interceptors.response.use(
      response => response, // Pass successful responses through
      async error => {
        const originalRequest = error.config;
        if (
          isAxiosError(error) &&
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          if (error?.response?.data?.message === 'Unauthorized Client') {
            throw new XellarError(
              'Unauthorized Client',
              'RAMPABLE_UNAUTHORIZED_CLIENT',
            );
          }

          try {
            const newAccessToken = await this._refreshRampableToken();
            const tokenManager =
              this.container.resolve<TokenManager>('TokenManager');
            tokenManager.setRampableAccessToken(newAccessToken);

            // Retry the original request with the new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return instance(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
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

  protected async _refreshRampableToken(): Promise<string> {
    const { clientSecret, env = 'sandbox' } =
      this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    try {
      const tokenManager = this.container.resolve<TokenManager>('TokenManager');

      const response = await axios.request<
        BaseHttpResponse<{ rampableAccessToken: string }>
      >({
        method: 'POST',
        baseURL: `${baseURL}/api/v2`,
        url: 'wallet/refresh-rampable',
        headers: {
          'Content-Type': 'application/json',
          'x-client-secret': clientSecret,
        },
        data: { rampableAccessToken: tokenManager.getRampableAccessToken() },
      });

      return response.data.data.rampableAccessToken;
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

  protected async getOrganizationInfo(): Promise<{
    name: string;
    clientId: string;
    clientSecret: string;
    isRampableEnabled: boolean;
    rampableClientSecret: string;
  }> {
    const { clientSecret, env = 'sandbox' } =
      this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    try {
      const response = await axios.request<
        BaseHttpResponse<{
          name: string;
          clientId: string;
          clientSecret: string;
          isRampableEnabled: boolean;
          rampableClientSecret: string;
        }>
      >({
        method: 'GET',
        baseURL: `${baseURL}/api/v2`,
        url: 'organization',
        headers: {
          'Content-Type': 'application/json',
          'x-client-secret': clientSecret,
        },
      });

      const tokenManager = this.container.resolve<TokenManager>('TokenManager');

      if (!response.data.data.isRampableEnabled) {
        tokenManager.setRampableClientSecret(undefined);

        throw new XellarError(
          'Please enable the rampable integration through the xellar client dashboard',
          'RAMPABLE_NOT_ENABLED',
        );
      }

      tokenManager.setRampableClientSecret(
        response.data.data.rampableClientSecret,
      );

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
}
