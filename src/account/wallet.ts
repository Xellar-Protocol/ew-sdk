import { XellarEWBase } from '../base';
import { AccountWalletResponse, BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { CreateWalletOptions, RecoverWalletOptions } from './types';

export class XellarEWAccountWallet extends XellarEWBase {
  /**
   * Allows you to create a new MPC wallet for a particular account
   * @param options - Options for creating a wallet
   *  - expiredDate (optional): The expiration date for the JWT token generated from the response
   *  - rampable (optional): Rampable account configuration
   *  - accessToken (required): The access token for authentication
   *
   * @returns An object containing the user access token, secret0, secret0Link & wallet address
   *  - `walletToken`: JWT token used to access the Wallet Operation endpoint.
   *  - `refreshToken`: Refresh token used to generate a new wallet token.
   *  - `secret0`:  The encrypted secret that user’s need to save in order to recover their wallet if user lose access to the account.
   *  - `secret0Link`: Temporary link to download recovery file. The value is same as secret0 value, but it is already saved in .xellar file. **The link will be expired in 5 minutes after being created.**
   *  - `address`: User’s MPC wallet address.
   *
   * @example
   * const response = await sdk.account.wallet.create();
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/account_operation/Create_New_Wallet/ Xellar Create New Wallet Docs}
   */
  async create({ expiredDate, rampable, accessToken }: CreateWalletOptions) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AccountWalletResponse>
      >(
        '/account/create',
        {
          expireDate: expiredDate,
          rampable,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  /**
   * Allows you to recover an MPC wallet by secret file which was generated when create a new MPC wallet. This API endpoint is useful when user loses access to their existing account but have their own secret and want to recover their existing account to a new account
   * @param options - Options for recovering a wallet
   *  - `formData` (required): FormData object containing the secret file and optional expireDate
   *      * `file`: (required): The file containing the secret from the end user's device, created when initially creating the wallet.
   *      * `expireDate`: (optional): The expiration date for the JWT token generated from the response.
   *  - `accessToken` (required): The access token for authentication
   *
   * @returns An object containing the user access token, secret0, secret0Link & wallet address
   *  - `walletToken`: JWT token used to access the Wallet Operation endpoint.
   *  - `refreshToken`: Refresh token used to generate a new wallet token.
   *  - `secret0`:  The encrypted secret that user’s need to save in order to recover their wallet if user lose access to the account.
   *  - `secret0Link`: Temporary link to download recovery file. The value is same as secret0 value, but it is already saved in .xellar file. **The link will be expired in 5 minutes after being created.**
   *  - `address`: User’s MPC wallet address.
   *
   * @example
   * const formData = new FormData();
   * formData.append("file", fs.createReadStream("/path/to/secret_file"));
   * formData.append("expireDate", "2024-10-02");
   *
   * const response = await sdk.account.wallet.recover({
   *   formData,
   *   accessToken: "your-access-token"
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/account_operation/Recover_Wallet_By_Secret/ Xellar Recover Wallet Docs}
   */
  async recover({ formData, accessToken }: RecoverWalletOptions) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AccountWalletResponse>
      >('/account/recover', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
