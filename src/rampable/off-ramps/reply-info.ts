import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WithRampableAccessToken } from '../types';
import { XelalrOffRampsReplyInfo } from './types';

export class XellarEWOffRampReplyInfo extends XellarEWBase {
  /**
   * Reply to an off-ramp transaction that requires additional information.
   * @param message - The information to reply. Maximum length is 300 characters.
   *
   * @remarks
   * > This method can only be used when the transaction status is 'need_information'.
   * The sender will receive an email notification when additional information is required.
   *
   * > After replying, the status may change to 'completed' if the information is sufficient.
   *
   * @example
   * const updatedTransaction = await sdk.offRamp.replyInfo('Additional information here');
   *
   * @see {@link https://docs.rampable.co/offramps#reply-info Rampable Off-Ramp Reply Info API}
   */

  async detailTransaction({
    rampableAccessToken,
    message,
  }: WithRampableAccessToken<{ message: string }>) {
    try {
      const response = await this.rampableAxiosInstance.patch<
        BaseHttpResponse<XelalrOffRampsReplyInfo>
      >(
        `/offramp/reply`,
        {
          message,
        },
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
