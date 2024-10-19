import { XellarEWBase } from '../../base';
import { Container } from '../../container';
import { XellarEWOffRampCreate } from './create';
import { XellarEWOffRampQuote } from './quote';
import { XellarEWOffRampTransactions } from './transactions';

export class XellarEWOffRamp extends XellarEWBase {
  protected xellarOffRampQuote: XellarEWOffRampQuote;

  protected xellarOffRampTransactions: XellarEWOffRampTransactions;

  protected xellarOffRampCreate: XellarEWOffRampCreate;

  constructor(container: Container) {
    super(container);

    this.xellarOffRampQuote = new XellarEWOffRampQuote(container);
    this.xellarOffRampTransactions = new XellarEWOffRampTransactions(container);
    this.xellarOffRampCreate = new XellarEWOffRampCreate(container);
  }

  get quote() {
    return this.xellarOffRampQuote.quote.bind(this);
  }

  get transactions() {
    return this.xellarOffRampTransactions.transactions.bind(this);
  }

  get detailTransaction() {
    return this.xellarOffRampTransactions.detailTransaction.bind(this);
  }

  get create() {
    return this.xellarOffRampCreate.create.bind(this);
  }
}
