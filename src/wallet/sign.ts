/* eslint-disable no-unused-vars */
import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  SignMessageConfig,
  SignTransactionConfig,
  SignTypedDataConfig,
  WithTokenResponse,
} from './types';

export class XellarEWSign extends XellarEWBase {
  /**
   * Allows users to sign some message using their MPC wallet.
   * @param config Configuration object.
   *  - `network` (required): The network used for transactions.
   *  - `message` (required): The message to sign.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of signature. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `signature`: The signature of the message.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   * const signature = await sdk.wallet.signMessage({
   *   network: Network.ETHEREUM,
   *   message: 'Hello, world!',
   *   walletToken: "your-wallet-token",
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Sign_Message/ Xellar Wallet Sign Message Docs}
   */
  async signMessage(
    config: SignMessageConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<{ signature: string }>>;

  async signMessage(
    config: SignMessageConfig & { refreshToken?: undefined },
  ): Promise<{ signature: string }>;

  async signMessage({
    walletToken,
    refreshToken,
    ...config
  }: SignMessageConfig): Promise<
    WithTokenResponse<{ signature: string }> | { signature: string }
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ signature: string }>
      >(
        '/wallet/sign-message',
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
          signature: response.data.data.signature,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return { signature: response.data.data.signature };
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }

  /**
   * Allows users to sign some message using their MPC wallet.
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `transaction` (required): Raw transaction data user want to sign.
   *     - `from` (required): The address of the sender.
   *     - `to` (required): The address of the recipient.
   *     - `value` (optional): The amount of value to send.
   *     - `data` (optional): The data to send.
   *     - `nonce` (optional): The number used once to prevent duplicate transactions (this will be calculated automatically if not provided).
   *     - `gasPrice` (optional): Gas price in Wei (this will be calculated automatically if not provided).
   *     - `gasLimit` (optional): Gas limit for single transaction, transaction will be reverted if actual gas consumption is higher than gas limit (this will be calculated automatically if not provided).
   *     - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas you are willing to pay, this only used in EIP1559 support blockchain
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of signed transaction hash. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `signedTransaction`: The signed transaction hash.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const body: SignTransactionConfig= {
   *   network: "ethereum",
   *   chainId: "1",
   *   transaction: {
   *     from: "0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9",
   *     to: "0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9",
   *     data: "0x",
   *     nonce: "0x00",
   *     gasPrice: "0x1cb3fa334b",
   *     gasLimit: "0x5208",
   *     value: "0x00"
   *   }
   * }
   *
   * const signature = await sdk.wallet.signTransaction(body);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Sign_Message/ Xellar Wallet Sign Message Docs}
   */
  async signTransaction({
    walletToken,
    refreshToken,
    ...config
  }: SignTransactionConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ signedTransaction: string }>
      >(
        '/wallet/sign-message',
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
          signedTransaction: response.data.data.signedTransaction,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return { signedTransaction: response.data.data.signedTransaction };
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }

  /**
   * Allow users to sign some typed data message using their MPC wallet.
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `data` (required): The raw data you get from dApps or WalletConnect.
   *
   * @returns The signature of the typed data.
   *
   * @example
   *
   * ```typescript
   * const body: SignTypedDataConfig = {
   *   network: 'ethereum',
   *   data: '0x',
   * };
   *
   * const signature = await sdk.wallet.sign.signTypedData(body);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Sign_Typed_Data/ Xellar Wallet Signed Typed Data Docs}
   */
  async signTypedData(config: SignTypedDataConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ signature: string }>
      >('/wallet/sign-message', {
        ...config,
      });

      return response.data.data.signature;
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
