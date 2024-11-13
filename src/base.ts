/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import {
  RAMPABLE_ACCESS_TOKEN_KEY,
  RAMPABLE_API_URL,
  REFRESH_TOKEN_KEY,
  WALLET_OR_ACCESS_TOKEN_KEY,
  XELLAR_API_URL,
} from './constants';
import { Container } from './container';
import { Config, GenerateAssymetricSignatureParams } from './types/config';
import { BaseHttpResponse, RampableAccount } from './types/http';
import { handleError, XellarError } from './utils/error';
import { StateStorage } from './utils/storage';
import { TokenManager } from './utils/token-manager';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  protected rampableAxiosInstance: AxiosInstance;

  protected container: Container;

  protected generateAssymetricSignature: (
    // eslint-disable-next-line no-unused-vars
    _params: GenerateAssymetricSignatureParams,
  ) => string;

  protected storage: StateStorage;

  protected tokenManager: TokenManager;

  constructor(container: Container) {
    this.container = container;
    this.axiosInstance = this._setupAxiosInstance();
    this.rampableAxiosInstance = this._setupRampableAxiosInstance();
    this.generateAssymetricSignature = this.container.resolve(
      'GenerateAssymetricSignature',
    );
    this.storage = this.container.resolve('Storage');
    this.tokenManager = this.container.resolve('TokenManager');
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
        const currentToken = await this.storage.getItem(
          WALLET_OR_ACCESS_TOKEN_KEY,
        );

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

          const refreshToken = await this.storage.getItem(REFRESH_TOKEN_KEY);

          if (refreshToken) {
            try {
              const refreshTokenResponse =
                await this._refreshToken(refreshToken);

              await this.storage.setItem(
                WALLET_OR_ACCESS_TOKEN_KEY,
                refreshTokenResponse.walletToken,
              );

              await this.storage.setItem(
                REFRESH_TOKEN_KEY,
                refreshTokenResponse.refreshToken,
              );

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
        const { rampableClientSecret, rampable } =
          this.container.resolve<Config>('Config');

        const accessToken = await this.storage.getItem(
          RAMPABLE_ACCESS_TOKEN_KEY,
        );

        if (rampable) {
          const timeStamp = new Date().toISOString();
          const generateSignatureFn = this.generateAssymetricSignature;

          const signature = generateSignatureFn({
            body: cfg.data,
            timeStamp,
            method: cfg.method?.toUpperCase() as
              | 'GET'
              | 'DELETE'
              | 'POST'
              | 'PUT'
              | 'PATCH',
            clientID: rampable.clientId,
            privateKey: rampable.privateKey,
          });

          cfg.headers = cfg.headers || {};
          cfg.headers['x-timestamp'] = timeStamp;
          cfg.headers['x-signature'] = signature;
          cfg.headers['x-client-id'] = rampable.clientId;
        } else {
          if (accessToken) {
            cfg.headers = cfg.headers || {};
            cfg.headers.Authorization = `Bearer ${accessToken}`;
          }

          const storageRampableClientSecret =
            this.tokenManager.getRampableClientSecret();

          let rampableClientSecretFromStorage =
            rampableClientSecret || storageRampableClientSecret;

          if (!rampableClientSecretFromStorage) {
            const organizationInfo = await this.getOrganizationInfo();
            rampableClientSecretFromStorage =
              organizationInfo.rampableClientSecret;

            this.tokenManager.setRampableClientSecret(
              organizationInfo.rampableClientSecret,
            );
          }

          if (rampableClientSecretFromStorage) {
            cfg.headers = cfg.headers || {};
            cfg.headers['x-client-secret'] = rampableClientSecretFromStorage;
          }
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

            await this.storage.setItem(
              RAMPABLE_ACCESS_TOKEN_KEY,
              newAccessToken,
            );

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
      const rampableAccessToken = await this.storage.getItem(
        RAMPABLE_ACCESS_TOKEN_KEY,
      );

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
        data: { rampableAccessToken },
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

    await this.storage.setItem(
      RAMPABLE_ACCESS_TOKEN_KEY,
      response.data.data.rampableAccessToken,
    );

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

      if (!response.data.data.isRampableEnabled) {
        this.tokenManager.setRampableClientSecret(undefined);

        throw new XellarError(
          'Please enable the rampable integration through the xellar client dashboard',
          'RAMPABLE_NOT_ENABLED',
        );
      }

      this.tokenManager.setRampableClientSecret(
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
