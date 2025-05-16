import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarAAAuth } from './auth';
import { XellarAAEstimateActivate } from './user-op/estimate/activate';
import { XellarAAEstimateSendERC721 } from './user-op/estimate/send-erc721';
import { XellarAAEstimateSendERC1155 } from './user-op/estimate/send-erc1155';
import { XellarAAEstimateSendNative } from './user-op/estimate/send-native';
import { XellarAAEstimateSendToken } from './user-op/estimate/send-token';
import { XellarAAEstimateSignTransaction } from './user-op/estimate/sign-transaction';
import { XellarAASubmit } from './user-op/submit';

export class XellarAccountAbstraction extends XellarEWBase {
  protected authInstance: XellarAAAuth;

  protected submitInstance: XellarAASubmit;

  protected estimateActivateInstance: XellarAAEstimateActivate;

  protected estimateSendTokenInstance: XellarAAEstimateSendToken;

  protected estimateSendNativeInstance: XellarAAEstimateSendNative;

  protected estimateSendERC721Instance: XellarAAEstimateSendERC721;

  protected estimateSendERC1155Instance: XellarAAEstimateSendERC1155;

  protected estimateSignTransactionInstance: XellarAAEstimateSignTransaction;

  constructor(container: Container) {
    super(container);

    this.authInstance = new XellarAAAuth(container);
    this.submitInstance = new XellarAASubmit(container);
    this.estimateActivateInstance = new XellarAAEstimateActivate(container);
    this.estimateSendTokenInstance = new XellarAAEstimateSendToken(container);
    this.estimateSendNativeInstance = new XellarAAEstimateSendNative(container);
    this.estimateSendERC721Instance = new XellarAAEstimateSendERC721(container);
    this.estimateSendERC1155Instance = new XellarAAEstimateSendERC1155(
      container,
    );
    this.estimateSignTransactionInstance = new XellarAAEstimateSignTransaction(
      container,
    );
  }

  get auth() {
    return {
      createAccount: this.authInstance.createAccount.bind(this),
    };
  }

  get submitUserOp() {
    return this.submitInstance.submitUserOp.bind(this);
  }

  get estimate() {
    return {
      activate: this.estimateActivateInstance.estimateActivate.bind(this),
      sendToken: this.estimateSendTokenInstance.estimateSendToken.bind(this),
      sendNative: this.estimateSendNativeInstance.estimateSendNative.bind(this),
      sendERC721: this.estimateSendERC721Instance.estimateSendERC721.bind(this),
      sendERC1155:
        this.estimateSendERC1155Instance.estimateSendERC1155.bind(this),
      signTransaction:
        this.estimateSignTransactionInstance.estimateSignTransaction.bind(this),
    };
  }
}
