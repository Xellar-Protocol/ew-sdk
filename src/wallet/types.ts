import { Network } from '../types/chain';

export type SignMessageConfig = {
  /** (required): Some message user want to sign.  */
  message: string;
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type SignHashConfig = {
  /** (required): Some hash user want to sign.  */
  hash: string;
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
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
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type BalanceTokenConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The address of the token. */
  tokenAddress: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type BalanceTokenBatchConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The addresses of the token. */
  tokenAddresses: string[];
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type SignTypedDataConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The raw data you get from dApps or WalletConnect. */
  data: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type CancelTransactionConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): This is a number that must be unique for each transaction, please provide the nonce of the transaction you want to cancel. */
  nonce: number;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type GetCoinBalanceConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (optional): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type EstimateGasConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): Type of transaction user want to estimate the gas. */
  type:
    | 'send-coin'
    | 'send-token'
    | 'transfer-erc721'
    | 'transfer-erc1155'
    | 'custom';
  /** (required for send-coin, send-token, transfer-erc721, transfer-erc1155): Recipient wallet address. */
  to?: string;
  /** (required for send-coin, send-token): Amount to send in decimal units (e.g., 0.123). */
  amount?: string;
  /** (required for transfer-erc721, transfer-erc1155): Token id of the ERC-721 or ERC-1155 token user want to send. For ERC-1155, use an array for batch transfer. */
  tokenId?: string | string[];
  /** (required for send-token, transfer-erc721, transfer-erc1155): Address of the token contract. */
  tokenAddress?: string;
  /** (required for transfer-erc1155): Amount of tokens to transfer. Use an array for batch transfer. */
  tokenAmount?: string | string[];
  /** (required for custom): Raw transaction data user want to estimate the gas. */
  transaction?: {
    from: string;
    to: string;
    data: string;
    nonce?: string;
    gasPrice?: string;
    gasLimit?: string;
    value?: string;
  };
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
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

export type SendCoinConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The address of the recipient. */
  to: string;
  /** (required): The amount of the transaction. */
  amount: string;
  /** (optional): The number used once to prevent duplicate transactions (this will be calculated automatically if not provided). */
  nonce?: string;
  /** (optional): Gas price in Wei (this will be calculated automatically if not provided). */
  gasPrice?: string;
  /** (optional): Gas limit for single transaction, transaction will be reverted if actual gas consumption is higher than gas limit (this will be calculated automatically if not provided). */
  gasLimit?: string;
  /** (optional): Maximum priority fee per gas you are willing to pay, this only used in EIP1559 support blockchain */
  maxPriorityFeePerGas?: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type SendTokenConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The address of the recipient. */
  to: string;
  /** (required): The amount of the transaction. */
  amount: string;
  /** (required): The address of the token user want to send. */
  tokenAddress: string;
  /** (optional): The number used once to prevent duplicate transactions (this will be calculated automatically if not provided). */
  nonce?: string;
  /** (optional): Gas price in Wei (this will be calculated automatically if not provided). */
  gasPrice?: string;
  /** (optional): Gas limit for single transaction, transaction will be reverted if actual gas consumption is higher than gas limit (this will be calculated automatically if not provided). */
  gasLimit?: string;
  /** (optional): Maximum priority fee per gas you are willing to pay, this only used in EIP1559 support blockchain */
  maxPriorityFeePerGas?: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type TransactionReceipt = {
  txReceipt: {
    _type: string;
    accessList?: string | null;
    blockNumber?: string | null;
    blockHash?: string | null;
    chainId: string;
    data: string;
    from: string;
    gasLimit: string;
    gasPrice: string;
    hash: string;
    maxFeePerGas?: string | null;
    maxPriorityFeePerGas?: string | null;
    nonce: number;
    signature: {
      _type: string;
      network: string;
      r: string;
      s: string;
      v: number;
    };
    to: string;
    type: number;
    value: string;
  };
};

export type SendTransactionConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The raw transaction data. */
  transaction: {
    /** The address of the sender. */
    from: string;
    /** The address of the recipient. */
    to: string;
    /** The data payload of the transaction. */
    data: string;
    /** The amount of native currency to send with the transaction. */
    value?: string;
    /** The gas price in Wei. */
    gasPrice?: string;
    /** The gas limit for the transaction. */
    gasLimit?: string;
    /** The nonce for the transaction. */
    nonce?: string;
    /** The maximum fee per gas (for EIP-1559 transactions). */
    maxFeePerGas?: string;
    /** The maximum priority fee per gas (for EIP-1559 transactions). */
    maxPriorityFeePerGas?: string;
  };
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type TransactionDetailConfig = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The transaction hash. */
  transactionHash: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type TransactionDetailResponse = {
  _type: string;
  blockHash: string;
  blockNumber: number;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  from: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  index: number;
  logs: any[];
  logsBloom: string;
  status: number;
  to: string;
};

export type TransferERC721Config = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The address of the recipient. */
  to: string;
  /** (required): The ID of the ERC721 token to transfer. */
  tokenId: string;
  /** (required): The address of the ERC721 token contract. */
  tokenAddress: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type TransferERC1155Config = {
  /** (required): The network used for transactions. */
  network: Network;
  /** (required): The address of the recipient. */
  to: string;
  /** (required): Token amount(s) to transfer. Array for batch transfer, single value for single transfer. */
  amount: string | string[];
  /** (required): Token ID(s) to transfer. Array for batch transfer, single value for single transfer. */
  tokenId: string | string[];
  /** (required): The address of the ERC1155 token contract. */
  tokenAddress: string;
  /** (required): The wallet token for authentication. */
  walletToken: string;
  /** (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token. */
  refreshToken?: string;
};

export type DecodedWalletToken = {
  version: number;
  uid: string;
  username: string;
  provider: string;
  address: Address[];
  mode: string;
  iat: number;
};

export type Address = {
  network: string;
  address: string;
};

export type WithTokenResponse<T> = T & {
  refreshToken: string;
  walletToken: string;
};
