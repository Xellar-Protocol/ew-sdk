import { XellarEWAccount } from './account';
import { XellarEWAuth } from './auth';
import { Container } from './container';
import { APIVersion, Config } from './types/config';
import { TokenManager } from './utils/token-manager';

// eslint-disable-next-line no-restricted-exports
export default class XellarSDK {
  public auth: XellarEWAuth;

  public account: XellarEWAccount;

  private container: Container;

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

    this.container = new Container();
    this.container.register('Config', config);
    this.container.register('TokenManager', new TokenManager());

    this.auth = new XellarEWAuth(this.container);
    this.account = new XellarEWAccount(this.container);
  }
}
