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
};

// "txReceipt": {
//             "_type": "TransactionReceipt",
//             "accessList": null,
//             "blockNumber": null,
//             "blockHash": null,
//             "chainId": "1",
//             "data": "0x",
//             "from": "0xBfE64B4b628E0998A03e2522B051Cf1B4661c964",
//             "gasLimit": "21000",
//             "gasPrice": "10000000000",
//             "hash": "0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675",
//             "maxFeePerGas": null,
//             "maxPriorityFeePerGas": null,
//             "nonce": 0,
//             "signature": {
//                 "_type": "signature",
//                 "networkV": "230",
//                 "r": "0xa68e03c27544801a8b6b80fb78be4f9cc2c9aeeeb189e3ae177a0a1155647dee",
//                 "s": "0x097e8fd0d6922c0766c14279289d0076fdcff8d29f893ce7b78b82e499341cb7",
//                 "v": 28
//             },
//             "to": "0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3",
//             "type": 0,
//             "value": "15000000000000000"
//         }

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
      networkV: string;
      r: string;
      s: string;
      v: number;
    };
    to: string;
    type: number;
    value: string;
  };
};
