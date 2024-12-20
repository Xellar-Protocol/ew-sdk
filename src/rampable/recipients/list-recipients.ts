import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { ListRecipientsParams, ListRecipientsResponse } from './types';

export class XellarEWRampableListRecipients extends XellarEWBase {
  /**
   * Allows you to retrieve a paginated list of all your recipients. By default, a maximum of ten recipients are shown per page.
   *
   * @param params - The parameters for listing recipients.
   *
   * @example
   * ```typescript
   * const recipients = await xellar.rampableRecipient.listRecipients({
   *   limit: 10,
   *   page: 1,
   *   sort: '-createdAt',
   *   search: 'John',
   *   rampableAccessToken: 'your_rampable_access_token'
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/recipients#list-all-recipients Rampable List Recipients API}
   */
  async listRecipients({
    rampableAccessToken,
    ...params
  }: WithRampableAccessToken<ListRecipientsParams> = {}) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<ListRecipientsResponse>
      >('/recipient', {
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
