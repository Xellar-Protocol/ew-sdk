import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import {
  CreateUserOpResponse,
  EstimateSignTransactionOptions,
} from '../../interfaces';

export class XellarAACreateSignTransaction extends XellarEWBase {
  /**
   * Create a user operation for signing a transaction
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to sign from.
   *  - `to` (required): The recipient address.
   *  - `value` (required): The amount of native tokens to send (in wei).
   *  - `callData` (required): The encoded function call data.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.create.signTransaction({
   *   accountId: "67959f7927373a6808679de2",
   *   to: "0x...",
   *   value: "0",
   *   callData: "0x..."
   * });
   * // Returns:
   * // {
   * //   userOpId: "...",
   * //   hash: "0x...",
   * //   validUntil: 1234567890
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/hash/sign_transaction/ Xellar Account Abstraction Create Sign Transaction Docs}
   */
  async signTransaction(
    options: EstimateSignTransactionOptions,
    config?: AxiosRequestConfig,
  ): Promise<CreateUserOpResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<CreateUserOpResponse>
      >(
        '/userOp/signTransaction/hash',
        {
          accountId: options.accountId,
          to: options.to,
          value: options.value,
          callData: options.callData,
        },
        config,
      );

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
}
