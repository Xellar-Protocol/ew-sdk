import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarAAAuth } from './auth';

export class XellarAccountAbstraction extends XellarEWBase {
  protected authInstance: XellarAAAuth;

  constructor(container: Container) {
    super(container);

    this.authInstance = new XellarAAAuth(container);
  }

  get auth() {
    return {
      createAccount: this.authInstance.createAccount.bind(this),
    };
  }
}
