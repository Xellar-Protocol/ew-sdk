import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarEWCancelTransaction } from './cancel-transaction';
import { XellarEWCheckCoinBalance } from './coin-balance';
import { XellarEWEstimateGas } from './estimate-gas';
import { XellarEWSign } from './sign';
import { XellarEWCheckTokenBalance } from './token-balance';

export class XellarEWWalletOperations extends XellarEWBase {
  protected sign: XellarEWSign;

  protected xellarCancelTransaction: XellarEWCancelTransaction;

  protected checkTokenBalance: XellarEWCheckTokenBalance;

  protected checkCoinBalance: XellarEWCheckCoinBalance;

  protected xellarEstimateGas: XellarEWEstimateGas;

  constructor(container: Container) {
    super(container);

    this.sign = new XellarEWSign(container);
    this.xellarCancelTransaction = new XellarEWCancelTransaction(container);
    this.checkTokenBalance = new XellarEWCheckTokenBalance(container);
    this.checkCoinBalance = new XellarEWCheckCoinBalance(container);
    this.xellarEstimateGas = new XellarEWEstimateGas(container);
  }

  get signMessage() {
    return this.sign.signMessage.bind(this);
  }

  get signTransaction() {
    return this.sign.signTransaction.bind(this);
  }

  get signTypedData() {
    return this.sign.signTypedData.bind(this);
  }

  get cancelTransaction() {
    return this.xellarCancelTransaction.cancelTransaction.bind(this);
  }

  get balanceToken() {
    return this.checkTokenBalance.balanceToken.bind(this);
  }

  get balanceCoin() {
    return this.checkCoinBalance.balanceCoin.bind(this);
  }

  get estimateGas() {
    return this.xellarEstimateGas.estimateGas.bind(this);
  }
}
