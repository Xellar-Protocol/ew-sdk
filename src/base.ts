import axios, { AxiosInstance } from 'axios';

import { Config } from './types/config';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  protected accessOrWalletToken: string | undefined;

  constructor(config: Config) {
    const { baseURL, clientSecret, version } = config;

    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/${version}`,
      headers: {
        'Content-Type': 'application/json',
        'x-client-secret': clientSecret,
        ...(this.accessOrWalletToken
          ? { Authorization: `Bearer ${this.accessOrWalletToken}` }
          : {}),
      },
    });
  }
}
