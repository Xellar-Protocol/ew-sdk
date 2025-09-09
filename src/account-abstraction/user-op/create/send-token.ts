import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import {
  CreateUserOpResponse,
  EstimateSendTokenOptions,
} from '../../interfaces';

export class XellarAACreateSendToken extends XellarEWBase {
  /**
   * Create a user operation for sending ERC20 tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to send from.
   *  - `tokenAddress` (required): The address of the ERC20 token contract.
   *  - `to` (required): The recipient address.
   *  - `amount` (required): The amount of tokens to send.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.create.sendToken({
   *   accountId: "67959f7927373a6808679de2",
   *   tokenAddress: "0x...",
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
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/hash/transfer_token/ Xellar Account Abstraction Create Send Token Docs}
   */
  async sendToken(
    options: EstimateSendTokenOptions,
    config?: AxiosRequestConfig,
  ): Promise<CreateUserOpResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<CreateUserOpResponse>
      >(
        '/userOp/sendToken/hash',
        {
          accountId: options.accountId,
          tokenAddress: options.tokenAddress,
          to: options.to,
          amount: options.amount,
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
