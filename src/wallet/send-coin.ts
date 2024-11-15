import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { SendCoinConfig, TransactionReceipt, WithTokenResponse } from './types';

export class XellarEWSendCoin extends XellarEWBase {
  /**
   * Allows you to send coin (native currency) from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `amount` (required): The amount of the transaction.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of transaction receipt. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `txReceipt`: The transaction receipt.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.sendCoin({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: 0.123,
   *   walletToken: "your-wallet-token",
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Coin/ Xellar Wallet Send Coin Docs}
   */
  async sendCoin(
    config: SendCoinConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionReceipt>>;

  async sendCoin(
    config: SendCoinConfig & { refreshToken?: undefined },
  ): Promise<TransactionReceipt>;

  async sendCoin({
    walletToken,
    refreshToken,
    ...config
  }: SendCoinConfig): Promise<
    TransactionReceipt | WithTokenResponse<TransactionReceipt>
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >(
        '/wallet/send-coin',
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
