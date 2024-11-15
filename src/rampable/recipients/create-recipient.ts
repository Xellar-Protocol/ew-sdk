import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { CreateRecipientBody, CreateRecipientResponse } from './types';

export class XellarEWRampableCreateRecipient extends XellarEWBase {
  /**
   * Allows you to add a new recipient to your recipient list in Rampable. To add a recipient, you must provide their Rampable name and email also bank country and currency.
   *
   * @param body - The parameters for creating recipient.
   *
   * @example
   * ```typescript
   * const recipients = await xellar.rampableRecipient.createRecipient({
   *   name: "XXXXX",
   *   recipientType: "Individual",
   *   email: "XXXXX@mail.com",
   *   organizationId: "XXXXX",
   *   bank: {
   *     currency: "USD",
   *     country: "UNITED STATES",
   *     accountNumber: "23123232123",
   *     accountName: "XXXXX",
   *     paymentCode: "XXXXX",
   *     bankName: "XXXXX",
   *     ifsc: "",
   *     ibanNumber: "1",
   *     achNumber: "1",
   *     fedwireNumber: "1",
   *     accountType: "Checking"
   *   },
   *   city: "New York",
   *   postCode: "1234",
   *   address: "NY Street 123",
   *   reference: "XXXXX",
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/recipients#create-a-recipient Rampable Create Recipient API}
   */
  async createRecipient({
    rampableAccessToken,
    ...body
  }: WithRampableAccessToken<CreateRecipientBody>) {
    try {
      const response = await this.rampableAxiosInstance.post<
        BaseHttpResponse<CreateRecipientResponse>
      >(
        '/recipient',
        { ...body },
        {
          headers: {
            ...(rampableAccessToken
              ? { Authorization: `Bearer ${rampableAccessToken}` }
              : {}),
          },
        },
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
