import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import {
  XellarOffRampTransactionDetailResponse,
  XellarOffRampTransactionListParams,
  XellarOffRampTransactionListResponse,
} from './types';

export class XellarEWOffRampTransactions extends XellarEWBase {
  /**
   * Allows you to retrieve a paginated list of all your offramp transactions.
   * By default, a maximum of ten offramp transactions are shown per page.
   *
   * @param params - The parameters for listing off-ramp transactions.
   *
   * @example
   * const transactions = await sdk.offRamp.transactions({
   *   limit: 10,
   *   page: 1,
   * });
   *
   * @see {@link https://docs.rampable.co/offramps#list-all-offramp-transactions Rampable Off-Ramp List Transactions API}
   */
  async transactions({
    rampableAccessToken,
    ...params
  }: WithRampableAccessToken<XellarOffRampTransactionListParams>) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<XellarOffRampTransactionListResponse>
      >('/offramp', {
        params,
        headers: {
          ...(rampableAccessToken
            ? { Authorization: `Bearer ${rampableAccessToken}` }
            : {}),
        },
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
   * Get the details of an off-ramp transaction.
   * @param transactionId - The ID of the off-ramp transaction.
   * @returns A promise that resolves to the off-ramp transaction details.
   *
   * @example
   * const transaction = await sdk.offRamp.detailTransaction('transactionId');
   *
   * @see {@link https://docs.rampable.co/offramps#offramp-transaction-detail Rampable Off-Ramp Transaction Details API}
   */

  async detailTransaction(transactionId: string) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<XellarOffRampTransactionDetailResponse>
      >(`/offramp/detail/${transactionId}`);

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
