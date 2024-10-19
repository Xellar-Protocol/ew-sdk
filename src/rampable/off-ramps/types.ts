export type XellarOffRampQuoteResponse = {
  status: boolean;
  coin: string;
  currency: string;
  amount: number;
  rate_amount: number;
  amount_in_currency: number;
  total_fee_percentage: number;
  total_fee_amount: number;
  total_fee_amount_in_currency: number;
  total_received_amount: number;
  total_received_amount_in_currency: number;
  payout_wallet: string;
  expiry_time: number;
};

export type XellarOffRampQuoteRequest = {
  /** (requried) The amount of the offramp transaction in the input currency. */
  amount: number;
  /** (required) The crypto id of the offramp transaction (e.g. "usdc-polygon") */
  inputCurrency: string;
  /** (required) The currency of the offramp transaction (e.g. "IDR") */
  outputCurrency: string;

  /**
   * Using the withLimit option allows you to get a quote using only the client secret,
   * without including your user access token in request headers. This is useful for
   * client-side applications.
   *
   * When withLimit is set to false, no daily limit calculation is applied to the quote
   * based on the user's limits (pure quote only).
   */
  withLimit?: boolean;
};

export type XellarOffRampTransactionListParams = {
  /** Limit the number of offramp transactions returned. */
  limit?: number;

  /** Specify the page number of the offramp transactions to retrieve. */
  page?: number;

  /**
   * Sort the offramp transactions by a specific field.
   * You can sort by createdAt or updatedAt. By default, offramp transactions are sorted by createdAt.
   * You can also sort in reverse order by adding a hyphen (-) before the field you want to sort by.
   */
  sort?: string;

  /** Search for a offramp transaction by name or email. */
  search?: string;

  /** Filter offramp transactions by status. This can be either pending, processed, completed, refund or failed. */
  status?: 'pending' | 'processed' | 'completed' | 'refund' | 'failed';

  /** Filter offramp transactions by reason. */
  reason?: string;

  /** Filter offramp transactions by minimum input amount. */
  minInputAmount?: number;

  /** Filter offramp transactions by maximum input amount. */
  maxInputAmount?: number;

  /** Filter offramp transactions by minimum output amount. */
  minOutputAmount?: number;

  /** Filter offramp transactions by maximum output amount. */
  maxOutputAmount?: number;

  /** Filter offramp transactions by organization id. */
  organizationId?: string;

  /** Filter offramp transactions by organization name. */
  organizationName?: string;

  /** Filter offramp transactions by blockchain. */
  blockchain?: string;

  /** Filter offramp transactions by receiver name. */
  receiverName?: string;
};

export type TransactionDocs = {
  feeDetail: FeeDetail;
  sender: Sender;
  receiver: Receiver;
  offrampId: string;
  inputAmount: number;
  inputAmountExact: number;
  inputCurrency: string;
  outputCurrency: string;
  outputAmount: number;
  outputAmountExact: number;
  reason: string;
  description: string;
  status: string;
  organizationId: string;
  organizationName: string;
  blockchain: string;
  routeId: string;
  payOutWallet: string;
  memo: string;
  expiredDate: Date;
  cryptoId: string;
  useSmartContract: boolean;
  blockchainType: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export type FeeDetail = {
  rate_amount: number;
  total_fee_amount: number;
  total_fee_amount_in_currency: number;
};

export type Receiver = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  ifsc: string;
  achNumber: string;
  fedwireNumber: string;
  ibanNumber: string;
};

export type Sender = {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
};

export type ActivityHistory = {
  activity: string;
  status: string;
  description: string;
  _id: string;
  updatedAt: Date;
};

export type XellarOffRampTransactionDetailResponse = TransactionDocs & {
  activityHistory: ActivityHistory[];
};

export type AdminNoteActivity = {
  message: string;
  time: Date;
  sender: string;
  _id: string;
};

export type XelalrOffRampsReplyInfo = TransactionDocs & {
  activityHistory: ActivityHistory[];
  adminNotesActivities: AdminNoteActivity[];
  createdAt: Date;
  updatedAt: Date;
  transactionHash: string;
  adminNotesDate: string;
  adminNotesReply: string | null;
  adminNotesReplyDate: string | null;
};

export type XellarOffRampTransactionListResponse = {
  docs: TransactionDocs[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type CreateOffRampRequest = {
  /**
   * The email address of the sender.
   */
  senderEmail: string;

  /**
   * Unique identifier for the receiver refer to recipient.id
   */
  receiverId: string;

  /**
   * The crypto ID of the offramp. See Reference
   */
  inputCurrency: string;

  /**
   * The output currency (fiat) of the offramp. See Reference
   */
  outputCurrency: string;

  /**
   * The reason for the offramp.
   */
  reason?: string;

  /**
   * The description for the offramp.
   */
  description?: string;

  /**
   * The us network for the offramp. This can be either ach or wire.
   */
  usNetwork?: string;
};
