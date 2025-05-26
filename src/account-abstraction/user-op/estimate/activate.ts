import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { EstimateActivateOptions, EstimateResponse } from '../../interfaces';

export class XellarAAEstimateActivate extends XellarEWBase {
  /**
   * Estimate the cost of activating a smart account
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate activation cost for.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.activate({
   *   accountId: "67b1f9310521667c3e94d625"
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/activate/ Xellar Account Abstraction Estimate Activate Docs}
   */
  async estimateActivate(options: EstimateActivateOptions) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >('/userOp/deploy/estimate', {
        accountId: options.accountId,
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
