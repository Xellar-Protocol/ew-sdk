import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { ListBanksParams, ListBanksResponse } from './types';

export class XellarEWRampableBank extends XellarEWBase {
  /**
   *
   * Allows you to retrieve a list of all banks supported by the API.
   *
   * @example
   * ```typescript
   * const banks = await xellar.rampableReference.listBanks({
   *   country: 'US',
   *   currency: 'USD',
   *   limit: 10,
   *   sort: 'createdAt',
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/references#list-all-banks Rampable Bank API}
   */
  async listBanks({
    rampableAccessToken,
    ...params
  }: WithRampableAccessToken<ListBanksParams> = {}) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<ListBanksResponse>
      >('/reference/banks', {
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
}
