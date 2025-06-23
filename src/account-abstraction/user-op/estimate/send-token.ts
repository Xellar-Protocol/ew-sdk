import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { EstimateResponse, EstimateSendTokenOptions } from '../../interfaces';

export class XellarAAEstimateSendToken extends XellarEWBase {
  /**
   * Estimate the cost of sending tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate cost for.
   *  - `tokenAddress` (required): The address of the token to send.
   *  - `to` (required): The recipient address.
   *  - `amount` (required): The amount of tokens to send in smallest unit.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.sendToken({
   *   accountId: "67959f7927373a6808679de2",
   *   tokenAddress: "0x...",
   *   to: "0x...",
   *   amount: "1000000000000"
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/transfer_erc20/ Xellar Account Abstraction Estimate Send Token Docs}
   */
  async estimateSendToken(
    options: EstimateSendTokenOptions,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >(
        '/userOp/sendToken/estimate',
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
