/* eslint-disable no-underscore-dangle */
import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarEWCancelTransaction } from './cancel-transaction';
import { XellarEWCheckCoinBalance } from './coin-balance';
import { XellarEWEstimateGas } from './estimate-gas';
import { XellarEWGetAddresses } from './get-address';
import { XellarEWSendCoin } from './send-coin';
import { XellarEWSendToken } from './send-token';
import { XellarEWSendTransaction } from './send-transaction';
import { XellarEWSign } from './sign';
import { XellarEWCheckTokenBalance } from './token-balance';
import { XellarEWTransferERC721 } from './transfer-erc721';
import { XellarEWTransferERC1155 } from './transfer-erc1155';

export class XellarEWWalletOperations extends XellarEWBase {
  protected sign: XellarEWSign;

  protected xellarCancelTransaction: XellarEWCancelTransaction;

  protected checkTokenBalance: XellarEWCheckTokenBalance;

  protected checkCoinBalance: XellarEWCheckCoinBalance;

  protected xellarEstimateGas: XellarEWEstimateGas;

  protected xellarSendCoin: XellarEWSendCoin;

  protected xellarSendToken: XellarEWSendToken;

  protected xellarSendTransaction: XellarEWSendTransaction;

  protected xellarTransferERC721: XellarEWTransferERC721;

  protected xellarTransferERC1155: XellarEWTransferERC1155;

  constructor(container: Container) {
    super(container);

    this.sign = new XellarEWSign(container);
    this.xellarCancelTransaction = new XellarEWCancelTransaction(container);
    this.checkTokenBalance = new XellarEWCheckTokenBalance(container);
    this.checkCoinBalance = new XellarEWCheckCoinBalance(container);
    this.xellarEstimateGas = new XellarEWEstimateGas(container);
    this.xellarSendCoin = new XellarEWSendCoin(container);
    this.xellarSendToken = new XellarEWSendToken(container);
    this.xellarSendTransaction = new XellarEWSendTransaction(container);
    this.xellarTransferERC721 = new XellarEWTransferERC721(container);
    this.xellarTransferERC1155 = new XellarEWTransferERC1155(container);
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

  get balanceTokenBatch() {
    return this.checkTokenBalance.balanceTokenBatch.bind(this);
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

  get sendTransaction() {
    return this.xellarSendTransaction.sendTransaction.bind(this);
  }

  get transferERC721() {
    return this.xellarTransferERC721.transferERC721.bind(this);
  }

  get transferERC1155() {
    return this.xellarTransferERC1155.transferERC1155.bind(this);
  }

  get refreshToken() {
    return this._refreshToken.bind(this);
  }

  get getAddresses() {
    return XellarEWGetAddresses.getAddresses.bind(this);
  }
}
