import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  BuildSignatureOptions,
  SignMessageHashOptions,
  SignMessageHashResponse,
  SignTypedDataHashOptions,
  SignTypedDataHashResponse,
} from './interfaces';

export class XellarAASignature extends XellarEWBase {
  /**
   * Get the hash of a message to be signed
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to sign with.
   *  - `message` (required): The message to sign.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.aa.signature.getSignMessageHash({
   *   accountId: "67b1f9310521667c3e94d625",
   *   message: "Hello World"
   * });
   * // Returns:
   * // {
   * //   hash: "0xdc6aa1aa485ce299c85fac982630d670c85a688ee70760c402a94417fe28e1bd"
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/signing/get_sign_message_hash/ Xellar Account Abstraction Sign Message Hash Docs}
   */
  async getSignMessageHash(
    options: SignMessageHashOptions,
  ): Promise<SignMessageHashResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<SignMessageHashResponse>
      >('/smart-account/signMessage/hash', {
        accountId: options.accountId,
        message: options.message,
      });

      return response.data.data;
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }

  /**
   * Get the hash of typed data to be signed
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to sign with.
   *  - `typedData` (required): The typed data to sign.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.aa.signature.getSignTypedDataHash({
   *   accountId: "67b1f9310521667c3e94d625",
   *   typedData: {
   *     domain: {
   *       name: "EIP712Domain",
   *       version: "1",
   *       chainId: 11155111,
   *       verifyingContract: "0x5CCB14a189684CbFB2B0f41Ef5594ac7BC80796A"
   *     },
   *     types: {
   *       Person: [
   *         {
   *           name: "name",
   *           type: "string"
   *         },
   *         {
   *           name: "wallet",
   *           type: "address"
   *         }
   *       ]
   *     },
   *     primaryType: "Person",
   *     message: {
   *       name: "John Doe",
   *       wallet: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
   *     }
   *   }
   * });
   * // Returns:
   * // {
   * //   hash: "0x2da87bf63a0fd3a0855b7894369503b5ef73305257b18b96d4d3ecec88ccf13d"
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/signing/get_sign_typed_data_hash/ Xellar Account Abstraction Sign Typed Data Hash Docs}
   */
  async getSignTypedDataHash(
    options: SignTypedDataHashOptions,
  ): Promise<SignTypedDataHashResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<SignTypedDataHashResponse>
      >('/smart-account/signTypedData/hash', {
        accountId: options.accountId,
        typedData: options.typedData,
      });

      return response.data.data;
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }

  /**
   * Build a signature for a message or typed data
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to sign with.
   *  - `signature` (required): The signature to build.
   *  - `typedData` (optional): The typed data if signing typed data.
   *
   * @example
   *
   * ```typescript
   * // For message signature
   * const result = await sdk.aa.signature.buildSignature({
   *   accountId: "67b1f9310521667c3e94d625",
   *   signature: "0xd32432583645f69b7ef2f38dbfe6d9dc9a99fc0949222a8a6c37645bb5ae2eff646e193c6970ecab6b7e63e81fdc6546f146eda932b78d8f41b869524d4238ec00"
   * });
   *
   * // For typed data signature
   * const result = await sdk.aa.signature.buildSignature({
   *   accountId: "67b1f9310521667c3e94d625",
   *   signature: "0xd32432583645f69b7ef2f38dbfe6d9dc9a99fc0949222a8a6c37645bb5ae2eff646e193c6970ecab6b7e63e81fdc6546f146eda932b78d8f41b869524d4238ec00",
   *   typedData: {
   *     domain: {
   *       name: "EIP712Domain",
   *       version: "1",
   *       chainId: 11155111,
   *       verifyingContract: "0x5CCB14a189684CbFB2B0f41Ef5594ac7BC80796A"
   *     },
   *     types: {
   *       Person: [
   *         {
   *           name: "name",
   *           type: "string"
   *         },
   *         {
   *           name: "wallet",
   *           type: "address"
   *         }
   *       ]
   *     },
   *     primaryType: "Person",
   *     message: {
   *       name: "John Doe",
   *       wallet: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
   *     }
   *   }
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/signing/build_signature/ Xellar Account Abstraction Build Signature Docs}
   */
  async buildSignature(options: BuildSignatureOptions): Promise<void> {
    try {
      await this.aaInstance.post('/smart-account/buildSignature', {
        accountId: options.accountId,
        signature: options.signature,
        typedData: options.typedData,
      });
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }
}
