import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import {
  OnRampTransaction,
  XellarOnRampTransactionListParams,
  XellarOnRampTransactionListResponse,
} from './types';

export class XellarEWOnRampTransactions extends XellarEWBase {
  /**
   * Allows you to retrieve a paginated list of all your onramp transactions. By default, a maximum of ten onramp transactions are shown per page.
   *
   * @param params - The parameters for listing on-ramp transactions.
   *
   * @example
   * const transactions = await sdk.onRamp.transactions({
   *   limit: 10,
   *   page: 1,
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   *
   * @see {@link https://docs.rampable.co/onramps#list-all-onramp-transactions Rampable On-Ramp List Transactions API}
   */
  async transactions({
    rampableAccessToken,
    ...params
  }: WithRampableAccessToken<XellarOnRampTransactionListParams>) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<XellarOnRampTransactionListResponse>
      >('/onramp', {
        params: { ...params },
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
   * allows you to retrieve a onramp transaction detail by onrampId.
   * @param transactionId - The ID of the on-ramp transaction.
   *
   * @example
   * const transaction = await sdk.onRamp.detailTransaction({
   *   transactionId: 'transactionId',
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   *
   * @see {@link https://docs.rampable.co/onramps#onramp-transaction-detail Rampable On-Ramp Transaction Details API}
   */

  async detailTransaction({
    rampableAccessToken,
    transactionId,
  }: WithRampableAccessToken<{ transactionId: string }>) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<OnRampTransaction>
      >(`/onramp/detail/${transactionId}`, {
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
}
