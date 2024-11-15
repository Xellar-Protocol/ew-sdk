import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { RampableCurrency } from './types';

export class XellarEWRampableCurrency extends XellarEWBase {
  /**
   *
   * Allows you to retrieve a list of all currencies supported by the API.
   *
   * @example
   * ```typescript
   * const currencies = await xellar.rampableReference.listCurrencies({
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/references#list-all-currencies Rampable Currency API}
   */
  async listCurrencies({
    rampableAccessToken,
  }: WithRampableAccessToken<{}> = {}) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<RampableCurrency[]>
      >('/reference/currencies', {
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
