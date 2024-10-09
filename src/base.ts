import axios, { AxiosInstance } from 'axios';

export class XellarEWBase {
  protected axiosInstance: AxiosInstance;

  //* default to use v2
  constructor(clientSecret: string, baseURL: string, version: string = 'v2') {
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/${version}`,
      headers: {
        'Content-Type': 'application/json',
        'x-client-secret': clientSecret,
      },
    });
  }
}
