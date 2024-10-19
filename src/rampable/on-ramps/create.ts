import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { CreateOnRampRequest, OnRampTransaction } from './types';

export class XellarEWOnRampCreate extends XellarEWBase {
  /**
   * Allows you to add a new transaction to your onramp transaction list in Rampable.
   * To add an onramp transaction, you must provide the recipient's Rampable name, email,
   * bank country, and currency. These details are automatically bound using the recipient id.
   *
   * > **Note:** Recipient must be created first before you get started with this endpoint.
   *
   * > **Note:** After the create onramp process is done, the onramp will be in pending status.
   * The onramp will be processed automatically after the payment page has been paid by the user.
   * If the onramp is successful, the status will be updated to processed.
   *
   * @param request - An object of type CreateOnRampRequest containing the necessary information
   *                  for creating a new onramp transaction.
   *
   * @example
   * ```ts
   * const request: CreateOnRampRequest = {
   *   receiverWalletAddress: '0x1234567890123456789012345678901234567890',
   *   acceptanceMethod: 'virtual_account',
   *   paymentPhoneNumber: '+1234567890',
   *   inputAmount: 1000,
   *   inputCurrency: 'USD',
   *   outputCurrency: 'ETH',
   *   reason: 'Investment',
   *   description: 'Monthly crypto purchase',
   *   memo: 'Optional memo for the transaction'
   * };
   * const onrampTransaction = await sdk.onRamp.create(request);
   * ```
   *
   * > **Note:** Users need to send the fiat currency to the payment details provided in the acceptanceDetail.
   * > **Note:** If the response contains txData, the user must sign the transaction on-chain using the provided txData.
   *
   * @see {@link https://docs.rampable.co/onramps#create-onramp Rampable Create On-Ramp API}
   */
  async create(request: CreateOnRampRequest) {
    try {
      const response = await this.rampableAxiosInstance.post<
        BaseHttpResponse<OnRampTransaction>
      >('/onramp', request);

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
