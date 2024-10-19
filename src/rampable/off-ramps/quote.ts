import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { XellarOffRampQuoteRequest, XellarOffRampQuoteResponse } from './types';

export class XellarEWOffRampQuote extends XellarEWBase {
  /**
   * Get a quote for an off-ramp transaction.
   * @param params - The parameters for the quote request.
   * @param params.amount - (required) The amount of the off-ramp transaction in the input currency.
   * @param params.inputCurrency - (required) The crypto id of the off-ramp transaction (e.g. "usdc-polygon").
   * @param params.outputCurrency - (required) The currency of the off-ramp transaction (e.g. "IDR").
   * @param params.withLimit - (optional) When set to false, no daily limit calculation is applied to the quote based on the user's limits (pure quote only).
   * @returns A promise that resolves to the off-ramp quote response.
   *
   * @example
   * const quote = await sdk.offRamp.quote({
   *   amount: 100,
   *   inputCurrency: 'usdc-polygon',
   *   outputCurrency: 'IDR',
   *   withLimit: true
   * });
   *
   * @see {@link https://docs.rampable.co/offramps#quote Rampable Off-Ramp Quote API}
   */
  async quote(params: XellarOffRampQuoteRequest) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<XellarOffRampQuoteResponse>
      >('/offramp/quote', {
        params,
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
