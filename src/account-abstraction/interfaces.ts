export interface AACreateAccountOptions {
  owner: {
    id: string;
    provider: string;
  };
}

export interface AACreateAccountResponse {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  ownerId: string;
  provider: string;
  clientId: string;
  gasTanks: GasTank[];
  accounts: Account[];
}

export interface Account {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  ownerId: string;
  status: string;
  aaAddress: string;
  chainId: number;
  network: string;
  clientId: string;
  version: string;
}

export interface GasTank {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  ownerId: string;
  balance: string;
  type: string;
  tokenName: string;
  decimals: number;
}

export interface AASubmitUserOpOptions {
  signature: string;
  userOpId: string;
  hash: string;
  isSponsored?: boolean;
}

export interface BaseDTO {
  id: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface GasTankUsageHistoryDTO {
  id: string;
  accountId: string;
  ownerId: string;
  userOpId: string;
  gasTankId: string;
  nativeToGasTankRate: number;
  amountInNative: string | null;
  amountInGasTank: string | null;
  initialDeductedAmountInNative: string | null;
  initialDeductedAmountInGasTank: string | null;
  refundedAmountInNative: string | null;
  refundedAmountInGasTank: string | null;
  clientFeeInGasTank: string | null;
  createdAt: string;
  refundedAt: string | null;
}

export interface ClientGasTankUsageHistoryDTO {
  id: string;
  clientId: string;
  appId: string;
  clientGasTankId: string;
  userOpId: string;
  nativeToGasTankRate: number;
  amountInNative: string | null;
  amountInGasTank: string | null;
  initialDeductedAmountInNative: string | null;
  initialDeductedAmountInGasTank: string | null;
  refundedAmountInNative: string | null;
  refundedAmountInGasTank: string | null;
  clientFeeInGasTank: string | null;
  createdAt: string;
  refundedAt: string | null;
}

export interface AASubmitUserOpResponse extends BaseDTO {
  accountId: string;
  ownerId: string;
  clientId: string;
  appId: string;
  signature: string | null;
  userOpHash: string;
  status: string;
  type: string;
  network: string;
  chainId: number;
  payer: string;
  validUntil: string;
  failedReason: string | null;
  bundlerVersion: string;
  successAt: string | null;
  failedAt: string | null;
  sentAt: string | null;
  gasTankUsageHistory?: GasTankUsageHistoryDTO;
  clientGasTankUsageHistory?: ClientGasTankUsageHistoryDTO;
}

export interface EstimateResponse {
  requiredNative: string;
  requiredGasTankBalance: string;
  decimal: number;
}

export interface EstimateSendTokenOptions {
  accountId: string;
  tokenAddress: string;
  to: string;
  amount: string;
}

export interface EstimateActivateOptions {
  accountId: string;
}

export interface EstimateSendNativeOptions {
  accountId: string;
  to: string;
  amount: string;
}

export interface EstimateSendERC721Options {
  accountId: string;
  tokenAddress: string;
  to: string;
  tokenId: string;
}

export interface EstimateSendERC1155Options {
  accountId: string;
  tokenAddress: string;
  to: string;
  tokenId: string;
  amount: string;
  data?: string;
}

export interface EstimateSignTransactionOptions {
  accountId: string;
  to: string;
  value: string;
  callData: string;
}
