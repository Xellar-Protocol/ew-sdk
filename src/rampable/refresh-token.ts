import { XellarEWBase } from '../base';
import { handleError, XellarError } from '../utils/error';

export class XellarEWRampableRefreshToken extends XellarEWBase {
  async refreshRampableToken(rampableAccessToken: string) {
    try {
      return this._refreshRampableToken(rampableAccessToken);
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
