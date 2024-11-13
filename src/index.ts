import { XellarSDK } from './sdk-web';

// eslint-disable-next-line no-restricted-exports
export default XellarSDK;

export type * from './rampable/off-ramps/types';
export type {
  XellarOnRampQuoteRequest,
  XellarOnRampQuoteResponse,
  XellarOnRampTransactionListParams,
  XellarOnRampTransactionListResponse,
} from './rampable/on-ramps/types';
export type * from './rampable/recipients/types';
export type * from './rampable/references/types';
export { Network } from './types/chain';
export type {
  AccountWalletResponse,
  AuthSuccessResponse,
  RampableAccount,
} from './types/http';
export { type StateStorage } from './utils/storage';
export type * from './wallet/types';
