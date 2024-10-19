import { XellarEWBase } from '../../base';
import { Container } from '../../container';
import { XellarEWOnRampCreate } from './create';
import { XellarEWOnRampQuote } from './quote';
import { XellarEWOnRampTransactions } from './transactions';

export class XellarEWOnRamp extends XellarEWBase {
  protected xellarOnRampCreate: XellarEWOnRampCreate;

  protected xellarOnRampTransactions: XellarEWOnRampTransactions;

  protected xellarOnRampQuote: XellarEWOnRampQuote;

  constructor(container: Container) {
    super(container);
    this.xellarOnRampCreate = new XellarEWOnRampCreate(container);
    this.xellarOnRampTransactions = new XellarEWOnRampTransactions(container);
    this.xellarOnRampQuote = new XellarEWOnRampQuote(container);
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

  get quote() {
    return this.xellarOnRampQuote.quote.bind(this);
  }
}
