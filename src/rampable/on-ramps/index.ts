import { XellarEWBase } from '../../base';
import { Container } from '../../container';
import { XellarEWOnRampCreate } from './create';
import { XellarEWOnRampTransactions } from './transactions';

export class XellarEWOnRamp extends XellarEWBase {
  protected xellarOnRampCreate: XellarEWOnRampCreate;

  protected xellarOnRampTransactions: XellarEWOnRampTransactions;

  constructor(container: Container) {
    super(container);
    this.xellarOnRampCreate = new XellarEWOnRampCreate(container);
    this.xellarOnRampTransactions = new XellarEWOnRampTransactions(container);
  }

  get create() {
    return this.xellarOnRampCreate.create.bind(this);
  }

  get transactions() {
    return this.xellarOnRampTransactions.transactions.bind(this);
  }

  get detailTransaction() {
    return this.xellarOnRampTransactions.detailTransaction.bind(this);
  }
}
