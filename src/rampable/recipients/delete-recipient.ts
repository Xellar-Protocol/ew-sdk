import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { DeleteRecipientResponse } from './types';

export class XellarEWRampableDeleteRecipient extends XellarEWBase {
  /**
   * Allows you to delete an existing recipient in your recipient list in Rampable.
   *
   * @param recipientId - The ID of the recipient to delete.
   *
   * @example
   * ```typescript
   * const deletedRecipient = await xellar.rampableRecipient.deleteRecipient({
   *   recipientId: 'recipient_id',
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/recipients#delete-a-recipient Rampable Delete Recipient API}
   */
  async deleteRecipient({
    recipientId,
    rampableAccessToken,
  }: WithRampableAccessToken<{ recipientId: string }>) {
    try {
      const response = await this.rampableAxiosInstance.delete<
        BaseHttpResponse<DeleteRecipientResponse>
      >(`/recipient/${recipientId}`, {
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
