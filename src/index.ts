import { XellarEWAccountOperations } from './account';
import { XellarEWAuth } from './auth';
import { Container } from './container';
import { XellarEWOffRamp } from './rampable/off-ramps';
import { XellarEWOnRamp } from './rampable/on-ramps';
import { XellarEWRampableRecipients } from './rampable/recipients';
import { XellarEWRampableReference } from './rampable/references';
import { Config } from './types/config';
import { TokenManager } from './utils/token-manager';
import { XellarEWWalletOperations } from './wallet';

// eslint-disable-next-line no-restricted-exports
export default class XellarSDK {
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
  }: Config) {
    const config: Config = {
      clientSecret,
      env,
      rampableClientSecret,
      rampable,
    };

    this.container = new Container();
    this.container.register('Config', config);
    this.container.register('TokenManager', new TokenManager());

    this.auth = new XellarEWAuth(this.container);
    this.account = new XellarEWAccountOperations(this.container);
    this.wallet = new XellarEWWalletOperations(this.container);
    this.offRamp = new XellarEWOffRamp(this.container);
    this.onRamp = new XellarEWOnRamp(this.container);
    this.rampableReference = new XellarEWRampableReference(this.container);
    this.rampableRecipients = new XellarEWRampableRecipients(this.container);
  }
}

export type {
  RampableRecipient,
  RecipientBank,
} from './rampable/recipients/types';
export type {
  RampableBank,
  RampableCrypto,
  RampableCurrency,
  RampablePaymentMethod,
} from './rampable/references/types';
export type { Network } from './types/chain';
export type { RampableAccount } from './types/http';
