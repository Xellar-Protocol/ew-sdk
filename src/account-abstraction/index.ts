import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarAAAuth } from './auth';
import { XellarAAGasTankTopUp } from './gas-tank/top-up';
import { XellarAASignature } from './signature';
import { XellarAACreateActivate } from './user-op/create/activate';
import { XellarAACreateSendERC721 } from './user-op/create/send-erc721';
import { XellarAACreateSendERC1155 } from './user-op/create/send-erc1155';
import { XellarAACreateSendNative } from './user-op/create/send-native';
import { XellarAACreateSendToken } from './user-op/create/send-token';
import { XellarAACreateSignTransaction } from './user-op/create/sign-transaction';
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

  protected createActivateInstance: XellarAACreateActivate;

  protected createSendTokenInstance: XellarAACreateSendToken;

  protected createSendNativeInstance: XellarAACreateSendNative;

  protected createSendERC721Instance: XellarAACreateSendERC721;

  protected createSendERC1155Instance: XellarAACreateSendERC1155;

  protected createSignTransactionInstance: XellarAACreateSignTransaction;

  protected signatureInstance: XellarAASignature;

  protected gasTankTopUpInstance: XellarAAGasTankTopUp;

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
    this.createActivateInstance = new XellarAACreateActivate(container);
    this.createSendTokenInstance = new XellarAACreateSendToken(container);
    this.createSendNativeInstance = new XellarAACreateSendNative(container);
    this.createSendERC721Instance = new XellarAACreateSendERC721(container);
    this.createSendERC1155Instance = new XellarAACreateSendERC1155(container);
    this.createSignTransactionInstance = new XellarAACreateSignTransaction(
      container,
    );
    this.signatureInstance = new XellarAASignature(container);
    this.gasTankTopUpInstance = new XellarAAGasTankTopUp(container);
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

  get create() {
    return {
      activate: this.createActivateInstance.activate.bind(this),
      sendToken: this.createSendTokenInstance.sendToken.bind(this),
      sendNative: this.createSendNativeInstance.sendNative.bind(this),
      sendERC721: this.createSendERC721Instance.sendERC721.bind(this),
      sendERC1155: this.createSendERC1155Instance.sendERC1155.bind(this),
      signTransaction:
        this.createSignTransactionInstance.signTransaction.bind(this),
    };
  }

  get signature() {
    return {
      getSignMessageHash: this.signatureInstance.getSignMessageHash.bind(this),
      getSignTypedDataHash:
        this.signatureInstance.getSignTypedDataHash.bind(this),
      buildSignature: this.signatureInstance.buildSignature.bind(this),
    };
  }

  get gasTank() {
    return {
      topUp: this.gasTankTopUpInstance.topUp.bind(this),
    };
  }
}
