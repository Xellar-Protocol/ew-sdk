import { XellarEWAccountOperations } from '../account';
import { XellarAccountAbstraction } from '../account-abstraction';
import { XellarEWAuth } from '../auth';
import { Container } from '../container';
import { XellarEWOffRamp } from '../rampable/off-ramps';
import { XellarEWOnRamp } from '../rampable/on-ramps';
import { XellarEWRampableRecipients } from '../rampable/recipients';
import { XellarEWRampableReference } from '../rampable/references';
import { XellarEWRampableRefreshToken } from '../rampable/refresh-token';
import { Config } from '../types/config';
import { prepareHeadersReactNative } from '../utils/aa-signature-react-native';
import { generateAssymetricSignatureRN } from '../utils/generate-signature-react-native';
import { TokenManager } from '../utils/token-manager';
import { XellarEWWalletOperations } from '../wallet';

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

  public accountAbstraction: XellarAccountAbstraction;

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
      generateAssymetricSignatureRN,
    );
    this.container.register('PrepareAAHeader', prepareHeadersReactNative);
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
    this.accountAbstraction = new XellarAccountAbstraction(this.container);
  }

  get refreshRampableToken() {
    return this.rampableRefreshToken.refreshRampableToken;
  }
}

export type * from '../account-abstraction/interfaces';
export type * from '../rampable/off-ramps/types';
export type {
  XellarOnRampQuoteRequest,
  XellarOnRampQuoteResponse,
  XellarOnRampTransactionListParams,
  XellarOnRampTransactionListResponse,
} from '../rampable/on-ramps/types';
export type * from '../rampable/recipients/types';
export type * from '../rampable/references/types';
export { ChainId, Network } from '../types/chain';
export type {
  AccountWalletResponse,
  AuthSuccessResponse,
  RampableAccount,
} from '../types/http';
export { type StateStorage } from '../utils/storage';
export type * from '../wallet/types';
