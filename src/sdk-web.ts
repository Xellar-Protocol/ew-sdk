import { XellarEWAccountOperations } from './account';
import { XellarEWAuth } from './auth';
import { Container } from './container';
import { XellarEWOffRamp } from './rampable/off-ramps';
import { XellarEWOnRamp } from './rampable/on-ramps';
import { XellarEWRampableRecipients } from './rampable/recipients';
import { XellarEWRampableReference } from './rampable/references';
import { XellarEWRampableRefreshToken } from './rampable/refresh-token';
import { Config } from './types/config';
import { generateAssymetricSignature } from './utils/generate-signature';
import { TokenManager } from './utils/token-manager';
import { XellarEWWalletOperations } from './wallet';

export class XellarSDK {
  public auth: XellarEWAuth;

  public account: XellarEWAccountOperations;

  public wallet: XellarEWWalletOperations;

  private container: Container;

  public offRamp: XellarEWOffRamp;

  public onRamp: XellarEWOnRamp;

  public rampableReference: XellarEWRampableReference;

  public rampableRecipients: XellarEWRampableRecipients;

  private rampableRefreshToken: XellarEWRampableRefreshToken;

  constructor({
    clientSecret,
    env = 'sandbox',
    rampableClientSecret,
    rampable,
    appId,
  }: Config) {
    const config: Config = {
      clientSecret,
      env,
      rampableClientSecret,
      rampable,
      appId,
    };

    this.container = new Container();
    this.container.register('Config', config);
    this.container.register('TokenManager', new TokenManager());
    this.container.register(
      'GenerateAssymetricSignature',
      generateAssymetricSignature,
    );

    this.auth = new XellarEWAuth(this.container);
    this.account = new XellarEWAccountOperations(this.container);
    this.wallet = new XellarEWWalletOperations(this.container);
    this.offRamp = new XellarEWOffRamp(this.container);
    this.onRamp = new XellarEWOnRamp(this.container);
    this.rampableReference = new XellarEWRampableReference(this.container);
    this.rampableRecipients = new XellarEWRampableRecipients(this.container);
    this.rampableRefreshToken = new XellarEWRampableRefreshToken(
      this.container,
    );
  }

  get refreshRampableToken() {
    return this.rampableRefreshToken.refreshRampableToken;
  }
}
