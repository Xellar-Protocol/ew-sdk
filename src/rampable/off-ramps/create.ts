import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import {
  CreateOffRampRequest,
  XellarOffRampTransactionDetailResponse,
} from './types';

export class XellarEWOffRampCreate extends XellarEWBase {
  /**
   * Allows you to add a new transaction to your offramp transaction list in Rampable.
   * To add a offramp transaction, you must provide their Rampable name and
   * email also bank country and currency which automatically bind using recipient id.
   *
   * @param request - The request object for creating an off-ramp transaction.
   * @returns A promise that resolves to the off-ramp transaction details.
   *
   * @example
   * ```ts
   * const transaction = await sdk.offRamp.create({
   *   amount: 100,
   *   inputCurrency: 'usdc-polygon',
   *   outputCurrency: 'IDR',
   * });
   * ```
   *
   * After the create offramp process was done, the offramp will be in pending status.
   * The offramp will be processed automatically after the requested crypto asset has been received by Rampable.
   * If the offramp is successful, the status will be updated to `processed`.
   *
   * > Users need to send the crypto to the `payOutWallet`
   *
   * > If a `partnerRedirectUrl` is provided, the payment will be processed on the specified redirect URL
   *
   * @see {@link https://docs.rampable.co/offramps#create-offramp Rampable Create Off-Ramp API}
   */
  async create(request: CreateOffRampRequest) {
    try {
      const response = await this.rampableAxiosInstance.post<
        BaseHttpResponse<XellarOffRampTransactionDetailResponse>
      >('/offramp', request);

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
