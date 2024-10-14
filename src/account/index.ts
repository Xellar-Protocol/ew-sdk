import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarEWAccountWallet } from './wallet';

export class XellarEWAccountOperations extends XellarEWBase {
  protected accountWallet: XellarEWAccountWallet;

  constructor(container: Container) {
    super(container);

    this.accountWallet = new XellarEWAccountWallet(container);
  }

  get create() {
    return this.accountWallet.create.bind(this);
  }

  get recover() {
    return this.accountWallet.recover.bind(this);
  }
}
