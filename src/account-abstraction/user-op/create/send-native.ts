import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import {
  CreateUserOpResponse,
  EstimateSendNativeOptions,
} from '../../interfaces';

export class XellarAACreateSendNative extends XellarEWBase {
  /**
   * Create a user operation for sending native tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to send from.
   *  - `to` (required): The recipient address.
   *  - `amount` (required): The amount of native tokens to send.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.aa.create.sendNative({
   *   accountId: "67959f7927373a6808679de2",
   *   to: "0x...",
   *   amount: "1000000000000000000"
   * });
   * // Returns:
   * // {
   * //   userOpId: "...",
   * //   hash: "0x...",
   * //   validUntil: 1234567890
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/hash/transfer_coin/ Xellar Account Abstraction Create Send Native Docs}
   */
  async sendNative(
    options: EstimateSendNativeOptions,
  ): Promise<CreateUserOpResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<CreateUserOpResponse>
      >('/userOp/sendCoin/hash', {
        accountId: options.accountId,
        to: options.to,
        amount: options.amount,
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
}
