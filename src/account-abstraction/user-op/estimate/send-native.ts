import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { EstimateResponse, EstimateSendNativeOptions } from '../../interfaces';

export class XellarAAEstimateSendNative extends XellarEWBase {
  /**
   * Estimate the cost of sending native tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate cost for.
   *  - `to` (required): The recipient address.
   *  - `amount` (required): The amount of native tokens to send in smallest unit.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.sendNative({
   *   accountId: "67959f7927373a6808679de2",
   *   to: "0x...",
   *   amount: "1000000000000"
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/transfer_coin/ Xellar Account Abstraction Estimate Send Native Docs}
   */
  async estimateSendNative(
    options: EstimateSendNativeOptions,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >(
        '/userOp/sendCoin/estimate',
        {
          accountId: options.accountId,
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
