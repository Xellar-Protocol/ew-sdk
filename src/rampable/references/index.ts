import { XellarEWBase } from '../../base';
import { Container } from '../../container';
import { XellarEWRampableBank } from './bank';
import { XellarEWRampableCrypto } from './crypto';
import { XellarEWRampableCurrency } from './currency';
import { XellarEWRampablePaymentMethod } from './peyment-methods';

export class XellarEWRampableReference extends XellarEWBase {
  protected bank: XellarEWRampableBank;

  protected crypto: XellarEWRampableCrypto;

  protected paymentMethod: XellarEWRampablePaymentMethod;

  protected currency: XellarEWRampableCurrency;

  constructor(container: Container) {
    super(container);

    this.bank = new XellarEWRampableBank(container);
    this.crypto = new XellarEWRampableCrypto(container);
    this.paymentMethod = new XellarEWRampablePaymentMethod(container);
    this.currency = new XellarEWRampableCurrency(container);
  }

  get listBanks() {
    return this.bank.listBanks.bind(this);
  }

  get listCryptos() {
    return this.crypto.listCryptos.bind(this);
  }

  get listPaymentMethods() {
    return this.paymentMethod.listPaymentMethods.bind(this);
  }

  get listCurrencies() {
    return this.currency.listCurrencies.bind(this);
  }
}
