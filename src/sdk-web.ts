import { XellarEWAccountOperations } from './account';
import { XellarEWAuth } from './auth';
import { Container } from './container';
import { XellarEWOffRamp } from './rampable/off-ramps';
import { XellarEWOnRamp } from './rampable/on-ramps';
import { XellarEWRampableRecipients } from './rampable/recipients';
import { XellarEWRampableReference } from './rampable/references';
import { Config } from './types/config';
import { generateAssymetricSignature } from './utils/generate-signature';
import { Storage } from './utils/storage';
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

  constructor({
    clientSecret,
    env = 'sandbox',
    rampableClientSecret,
    rampable,
    storage,
  }: Config) {
    const config: Config = {
      clientSecret,
      env,
      rampableClientSecret,
      rampable,
      storage,
    };

    this.container = new Container();
    this.container.register('Config', config);
    this.container.register('TokenManager', new TokenManager());
    this.container.register(
      'GenerateAssymetricSignature',
      generateAssymetricSignature,
    );
    this.container.register('Storage', new Storage());

    this.auth = new XellarEWAuth(this.container);
    this.account = new XellarEWAccountOperations(this.container);
    this.wallet = new XellarEWWalletOperations(this.container);
    this.offRamp = new XellarEWOffRamp(this.container);
    this.onRamp = new XellarEWOnRamp(this.container);
    this.rampableReference = new XellarEWRampableReference(this.container);
    this.rampableRecipients = new XellarEWRampableRecipients(this.container);
  }
}
