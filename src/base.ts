import axios, { AxiosInstance } from 'axios';

import { Config } from './types/config';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  // eslint-disable-next-line no-unused-vars

  protected accessToken: string | undefined;

  //* default to use v2
  constructor(config: Config) {
    const { baseURL, clientSecret, version } = config;

    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/${version}`,
      headers: {
        'Content-Type': 'application/json',
        'x-client-secret': clientSecret,
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {}),
      },
    });
  }
}
