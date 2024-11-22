export interface BaseHttpResponse<T> {
  satus: number;
  message: string;
  data: T;
}

export interface EmailLoginResponse {
  verificationToken: string;
}

export interface UsernameRegisterResponse {
  accessToken: string;
  isWalletCreated: boolean;
}

type WalletCreatedResponse = {
  isWalletCreated: true;
  walletToken: string;
};

type WalletNotCreatedResponse = {
  isWalletCreated: false;
  accessToken: string;
};

export type AuthSuccessResponse = {
  refreshToken: string;
  /** (optional)
   * JWT token used to access the Rampable Operation endpoint.
   * This token will only be available if the account already create a rampable account
   * and the organization has enabled the rampable feature.
   */
  rampableAccessToken?: string;
} & (WalletCreatedResponse | WalletNotCreatedResponse);

export type XellarAddress = {
  network: string;
  address: string;
};

export interface AccountWalletResponse {
  walletToken: string;
  refreshToken: string;
  secret0: string;
  secret0Link: string;
  address: XellarAddress[];
  /** (optional)
   * JWT token used to access the Rampable Operation endpoint.
   * This token will only be available if the account already create a rampable account
   * and the organization has enabled the rampable feature.
   */
  rampableAccessToken?: string;
}

export type RampableAccount = {
  username: string;
  fullName: string;
  password: string;
};
