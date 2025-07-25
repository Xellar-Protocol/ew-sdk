/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import {
  RAMPABLE_API_URL,
  XELLAR_AA_API_URL,
  XELLAR_API_URL,
} from './constants';
import { Container } from './container';
import {
  AAHeaders,
  Config,
  GenerateAssymetricSignatureParams,
  PrepareAAHeadersParams,
} from './types/config';
import { BaseHttpResponse, RampableAccount } from './types/http';
import { handleError, XellarError } from './utils/error';
import { TokenManager } from './utils/token-manager';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  protected rampableAxiosInstance: AxiosInstance;

  protected aaInstance: AxiosInstance;

  protected container: Container;

  protected generateAssymetricSignature: (
    // eslint-disable-next-line no-unused-vars
    _params: GenerateAssymetricSignatureParams,
  ) => string;

  protected prepareAAHeader: (
    // eslint-disable-next-line no-unused-vars
    _params: PrepareAAHeadersParams,
  ) => Promise<AAHeaders>;

  protected tokenManager: TokenManager;

  constructor(container: Container) {
    this.container = container;
    this.axiosInstance = this._setupAxiosInstance();
    this.rampableAxiosInstance = this._setupRampableAxiosInstance();
    this.generateAssymetricSignature = this.container.resolve(
      'GenerateAssymetricSignature',
    );
    this.prepareAAHeader = this.container.resolve('PrepareAAHeader');
    this.tokenManager = this.container.resolve('TokenManager');
    this.aaInstance = this._setupAaInstance();
  }

  private _setupAxiosInstance() {
    const {
      clientSecret,
      env = 'sandbox',
      appId,
    } = this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    const appIdHeader = appId
      ? {
          'x-app-id': appId,
        }
      : {};

    const instance = axios.create({
      baseURL: `${baseURL}/api/v2`,
      headers: {
        'Content-Type': 'application/json',
        ...appIdHeader,
      },
    });

    return instance;
  }

  private _setupAaInstance() {
    const {
      clientSecret,
      env = 'sandbox',
      appId,
    } = this.container.resolve<Config>('Config');

    const baseURL = XELLAR_AA_API_URL[env];

    const instance = axios.create({
      baseURL: `${baseURL}/api/v1`,
    });

    instance.interceptors.request.use(
      async (cfg: InternalAxiosRequestConfig) => {
        cfg.headers = cfg.headers || {};

        const referer = cfg.headers['x-referer'];

        if (referer === 'xellar-kit') {
          cfg.headers['x-referer'] = 'xellar-kit';
          cfg.headers['x-app-id'] = appId;

          return cfg;
        }

        const headers = await this.prepareAAHeader({
          appId,
          clientSecret: clientSecret || '',
          method: cfg.method?.toUpperCase() || '',
          url: `/api/v1${cfg.url || ''}`,
          requestBody: JSON.stringify(cfg.data),
        });

        cfg.headers['Content-Type'] = headers['Content-Type'];
        cfg.headers['X-TIMESTAMP'] = headers['X-TIMESTAMP'];
        cfg.headers['X-APP-ID'] = headers['X-APP-ID'];
        cfg.headers['X-SIGNATURE'] = headers['X-SIGNATURE'];

        return cfg;
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

    return instance;
  }

  protected async _refreshToken(
    refreshToken: string,
  ): Promise<{ walletToken: string; refreshToken: string }> {
    const {
      clientSecret,
      env = 'sandbox',
      appId,
    } = this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    try {
      const appIdHeader = appId
        ? {
            'x-app-id': appId,
          }
        : {};

      const response = await axios.request<
        BaseHttpResponse<{ walletToken: string; refreshToken: string }>
      >({
        method: 'POST',
        baseURL: `${baseURL}/api/v2`,
        url: 'wallet/refresh',
        headers: {
          'Content-Type': 'application/json',
          ...appIdHeader,
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

  protected async _refreshRampableToken(
    rampableAccessToken: string,
  ): Promise<string> {
    const { clientSecret, env = 'sandbox' } =
      this.container.resolve<Config>('Config');

    const baseURL = XELLAR_API_URL[env];

    try {
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
    walletToken: string,
  ): Promise<string> {
    const response = await this.axiosInstance.post<
      BaseHttpResponse<{ rampableAccessToken: string }>
    >(
      'account/rampable/create',
      {
        ...rampable,
      },
      {
        headers: {
          Authorization: `Bearer ${walletToken}`,
        },
      },
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
        throw new XellarError(
          'Please enable the rampable integration through the xellar client dashboard',
          'RAMPABLE_NOT_ENABLED',
        );
      }

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
