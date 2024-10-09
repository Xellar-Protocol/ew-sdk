import { XellarEWAuth } from './auth';
import { APIVersion, Config } from './types/config';

// eslint-disable-next-line no-restricted-exports
export default class XellarSDK {
  public auth: XellarEWAuth;

  constructor(
    clientSecret: string,
    baseURL: string,
    version: APIVersion = 'v2',
  ) {
    const config: Config = {
      baseURL,
      clientSecret,
      version,
    };

    this.auth = new XellarEWAuth(config);
  }
}
