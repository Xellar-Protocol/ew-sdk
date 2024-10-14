import { Network } from '../types/chain';

export type SignMessageConfig = {
  /** (required): Some message user want to sign.  */
  message: string;
  /** (required): The network used for transactions. */
  network: Network;
};

export type SignTransactionConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): Raw transaction data user want to sign. */
  transaction: {
    /** (required): The address of the sender. */
    from: string;
    /** (required): The address of the recipient. */
    to: string;
    /** (optional): The amount of value to send. */
    value?: string;
    /** (optional): The data to send. */
    data?: string;
    /** (optional): The number used once to prevent duplicate transactions (this will be calculated automatically if not provided). */
    nonce?: string;
    /**  (optional): Gas price in Wei (this will be calculated automatically if not provided). */
    gasPrice?: string;
    /** (optional): Gas limit for single transaction, transaction will be reverted if actual gas consumption is higher than gas limit (this will be calculated automatically if not provided). */
    gasLimit?: string;
    /** (optional): Maximum priority fee per gas you are willing to pay, this only used in EIP1559 support blockchain */
    maxPriorityFeePerGas?: string;
  };
};

export type SignTypedDataConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The raw data you get from dApps or WalletConnect. */
  data: string;
};

export type CancelTransactionConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): This is a number that must be unique for each transaction, please provide the nonce of the transaction you want to cancel. */
  nonce: number;
};

export type EstimateGasConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The raw data you get from dApps or WalletConnect. */
  data: string;
  /** (required): Type of transaction user want to estimate the gas. Available options are send-coin, send-token, transfer-erc721, transfer-erc1155, custom. */
  type:
    | 'send-coin'
    | 'send-token'
    | 'transfer-erc721'
    | 'transfer-erc1155'
    | 'custom';
  /** (optional): Recipient wallet address. */
  to?: string;
  /** (optional): Amount to send in decimal units (e.g., 0.123) (e.g., [2, 4] for batch transfer of ERC-1155 tokens) */
  amount?: number | number[];
  /** (optional): Token id of the ERC-721 or ERC-1155 token user want to send (input array of tokenId for batch transfer, input single tokenId for single transfer). */
  tokenId?: number | number[];
  /** (optional): Address of the token user want to send. */
  tokenAddress?: string;
  /** (optional): Raw transaction data user want to estimate the gas. */
  transaction?: object;
};

export type EstimateGasResponse = {
  gasLimit: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export type CheckBalanceResponse = {
  balance: string;
  symbol: string;
  address: string;
};

export type CheckBalanceBatchResponse = {
  address: string;
  tokens: {
    balance: string;
    symbol: string;
    decimals: number;
  }[];
};
