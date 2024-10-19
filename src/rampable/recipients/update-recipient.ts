import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { UpdateRecipientBody, UpdateRecipientResponse } from './types';

export class XellarEWRampableUpdateRecipient extends XellarEWBase {
  /**
   * Allows you to update an existing recipient in your recipient list in Rampable.
   *
   * @param recipientId - The ID of the recipient to update.
   * @param body - The parameters for updating the recipient.
   *
   * @example
   * ```typescript
   * const updatedRecipient = await xellar.rampableRecipient.updateRecipient('recipient_id', {
   *   name: "John Doe",
   *   bank: {
   *     currency: "USD"
   *   }
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/recipients#update-a-recipient Rampable Update Recipient API}
   */
  async updateRecipient(recipientId: string, body: UpdateRecipientBody) {
    try {
      const response = await this.rampableAxiosInstance.patch<
        BaseHttpResponse<UpdateRecipientResponse>
      >(`/recipient/${recipientId}`, body);

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
