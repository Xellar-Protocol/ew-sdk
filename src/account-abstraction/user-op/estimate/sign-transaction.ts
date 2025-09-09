import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import {
  EstimateResponse,
  EstimateSignTransactionOptions,
} from '../../interfaces';

export class XellarAAEstimateSignTransaction extends XellarEWBase {
  /**
   * Estimate the cost of signing a transaction
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate cost for.
   *  - `to` (required): The recipient address.
   *  - `value` (required): The amount of native tokens to send (in wei).
   *  - `callData` (required): The encoded function call data.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.signTransaction({
   *   accountId: "67959f7927373a6808679de2",
   *   to: "0x...",
   *   value: "0",
   *   callData: "0x..."
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/sign_transaction/ Xellar Account Abstraction Estimate Sign Transaction Docs}
   */
  async estimateSignTransaction(
    options: EstimateSignTransactionOptions,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >(
        '/userOp/signTransaction/estimate',
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
