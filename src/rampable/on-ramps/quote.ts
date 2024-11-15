import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { XellarOnRampQuoteRequest, XellarOnRampQuoteResponse } from './types';

export class XellarEWOnRampQuote extends XellarEWBase {
  /**
   * Get a quote for an on-ramp transaction.
   * @param params - The parameters for the quote request.
   * @param params.amount - (required) The amount of the on-ramp transaction in the input currency.
   * @param params.inputCurrency - (required) The currency of the on-ramp transaction (e.g. "IDR"). See Reference.
   * @param params.outputCurrency - (required) The crypto id of the on-ramp transaction (e.g. "usdt-polygon"). See Reference.
   * @param params.withLimit - (optional) When set to false, no daily limit calculation is applied to the quote based on the user's limits (pure quote only).
   * @returns A promise that resolves to the on-ramp quote response.
   *
   * @example
   * const quote = await sdk.onRamp.quote({
   *   amount: 100,
   *   inputCurrency: 'IDR',
   *   outputCurrency: 'usdt-polygon',
   *   withLimit: true,
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   *
   * @see {@link https://docs.rampable.co/onramps#quote Rampable On-Ramp Quote API}
   */
  async quote({
    rampableAccessToken,
    ...params
  }: WithRampableAccessToken<XellarOnRampQuoteRequest>) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<XellarOnRampQuoteResponse>
      >('/onramp/quote', {
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
}
