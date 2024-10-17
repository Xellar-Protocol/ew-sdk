import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { TokenManager } from '../../utils/token-manager';
import { TelegramAuthOptions, TelegramAuthorizeBody } from './types';

export class XellarEWTelegramAuthorize extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using telegram account.
   * @param body (required): The body object containing the user's Telegram information.
   * @param options (optional): Telegram authorize options.
   *    - rampable (optional): Rampable account configuration.
   * @description
   *   * `data` **(required if dataString empty)**: The data object containing the user's Telegram information. It should include the following fields:
   *     - `id`: User's Telegram ID
   *     - `first_name`: User's first name
   *     - `last_name`: User's last name (if available)
   *     - `username`: User's Telegram username (if available)
   *     - `photo_url`: URL of user's profile photo (if available)
   *     - `auth_date`: Authentication date
   *     - `hash`: Authentication hash
   *   * `dataString` **(required if data empty)**: If you are using **Telegram Mini App**, you can use this parameter instead. The dataString is the Telegram initData that you get from the Telegram Mini App.
   *   * `botUsername` **(required)**: The bot username which was generated when you created a bot on Telegram.
   *   * `expireDate` **(optional)**: The expiration date for the JWT token generated from the response.
   *
   * @example
   * // Basic usage
   * const body = {
   *    data: {
   *       id: "123456789",
   *       first_name: "John",
   *       last_name: "Doe",
   *       username: "johndoe",
   *       photo_url: "https://t.me/i/userpic/320/johndoe.jpg",
   *       auth_date: "1630510000",
   *       hash: "f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7"
   *    },
   *    botUsername: "your_bot_username",
   *    expireDate: "2024-01-02"
   * };
   * const response = await sdk.auth.telegram.authorize(body);
   *
   * // OR for Telegram Mini App
   * const body = {
   *    dataString: "auth_date=1696600040&query_id=XXxxXXXXXXXxxxx&id=123456789&first_name=John&last_name=Doe&username=johndoe&is_premium=true&hash=f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7",
   *    botUsername: "your_bot_username",
   *    expireDate: "2024-01-02"
   * };
   * const response = await sdk.auth.telegram.authorize(body);
   *
   * // With rampable option
   * const response = await sdk.auth.telegram.authorize(body, {
   *   rampable: {
   *     userName: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/telegram/authorize/ Xellar Auth Telegram Docs}
   */
  async authorize(body: TelegramAuthorizeBody, options?: TelegramAuthOptions) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/telegram', {
        ...body,
      });

      const token = response.data.data.isWalletCreated
        ? response.data.data.walletToken
        : response.data.data.accessToken;

      const { refreshToken } = response.data.data;
      const tokenManager = this.container.resolve<TokenManager>('TokenManager');

      tokenManager.setWalletToken(token);
      tokenManager.setRefreshToken(refreshToken);

      if (!response.data?.data?.rampableAccessToken && options?.rampable) {
        const rampableAccessToken = await this.createRampableAccount(
          options.rampable,
        );

        return {
          ...response.data.data,
          rampableAccessToken,
        };
      }
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
