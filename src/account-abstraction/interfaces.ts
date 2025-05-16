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
