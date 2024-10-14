/* eslint-disable no-underscore-dangle */
import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarEWCancelTransaction } from './cancel-transaction';
import { XellarEWCheckCoinBalance } from './coin-balance';
import { XellarEWEstimateGas } from './estimate-gas';
import { XellarEWSendCoin } from './send-coin';
import { XellarEWSendToken } from './send-token';
import { XellarEWSign } from './sign';
import { XellarEWCheckTokenBalance } from './token-balance';

export class XellarEWWalletOperations extends XellarEWBase {
  protected sign: XellarEWSign;

  protected xellarCancelTransaction: XellarEWCancelTransaction;

  protected checkTokenBalance: XellarEWCheckTokenBalance;

  protected checkCoinBalance: XellarEWCheckCoinBalance;

  protected xellarEstimateGas: XellarEWEstimateGas;

  protected xellarSendCoin: XellarEWSendCoin;

  protected xellarSendToken: XellarEWSendToken;

  constructor(container: Container) {
    super(container);

    this.sign = new XellarEWSign(container);
    this.xellarCancelTransaction = new XellarEWCancelTransaction(container);
    this.checkTokenBalance = new XellarEWCheckTokenBalance(container);
    this.checkCoinBalance = new XellarEWCheckCoinBalance(container);
    this.xellarEstimateGas = new XellarEWEstimateGas(container);
    this.xellarSendCoin = new XellarEWSendCoin(container);
    this.xellarSendToken = new XellarEWSendToken(container);
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

  get sendCoin() {
    return this.xellarSendCoin.sendCoin.bind(this);
  }

  get sendToken() {
    return this.xellarSendToken.sendToken.bind(this);
  }

  get refreshToken() {
    return this._refreshToken.bind(this);
  }
}
