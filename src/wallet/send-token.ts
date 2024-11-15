import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  SendTokenConfig,
  TransactionReceipt,
  WithTokenResponse,
} from './types';

export class XellarEWSendToken extends XellarEWBase {
  /**
   * Allows you to send token (ERC20) from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `amount` (required): The amount of the transaction.
   *  - `tokenAddress` (required): The address of the token.
   *
   * @returns Object of transaction receipt. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `txReceipt`: The transaction receipt.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.sendToken({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: 0.123,
   *   tokenAddress: '0x1234567890123456789012345678901234567890',
   *   walletToken: "your-wallet-token",
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Token/ Xellar Wallet Send Token Docs}
   */
  async sendToken(
    config: SendTokenConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionReceipt>>;

  async sendToken(
    config: SendTokenConfig & { refreshToken?: undefined },
  ): Promise<TransactionReceipt>;

  async sendToken({
    walletToken,
    refreshToken,
    ...config
  }: SendTokenConfig): Promise<
    WithTokenResponse<TransactionReceipt> | TransactionReceipt
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >(
        '/wallet/send-token',
        {
          ...config,
        },
        {
          headers: {
            Authorization: `Bearer ${walletToken}`,
          },
        },
      );

      if (refreshToken) {
        const refreshTokenResult = await this._refreshToken(refreshToken);

        return {
          txReceipt: response.data.data.txReceipt,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return { txReceipt: response.data.data.txReceipt };
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
