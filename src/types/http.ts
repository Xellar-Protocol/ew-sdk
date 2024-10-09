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
