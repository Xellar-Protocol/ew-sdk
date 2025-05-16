import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarAAAuth } from './auth';
import { XellarAASubmit } from './user-op/submit';

export class XellarAccountAbstraction extends XellarEWBase {
  protected authInstance: XellarAAAuth;

  protected submitInstance: XellarAASubmit;

  constructor(container: Container) {
    super(container);

    this.authInstance = new XellarAAAuth(container);
    this.submitInstance = new XellarAASubmit(container);
  }

  get auth() {
    return {
      createAccount: this.authInstance.createAccount.bind(this),
    };
  }

  get submitUserOp() {
    return this.submitInstance.submitUserOp.bind(this);
  }
}
