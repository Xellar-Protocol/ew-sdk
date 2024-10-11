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
} & (WalletCreatedResponse | WalletNotCreatedResponse);

export interface AccountWalletResponse {
  walletToken: string;
  refreshToken: string;
  secret0: string;
  secret0Link: string;
  address: string;
}
