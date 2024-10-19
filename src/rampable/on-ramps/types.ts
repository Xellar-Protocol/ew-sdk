export type XellarOnRampTransactionListParams = {
  /** Limit the number of on-ramp transactions returned. */
  limit?: number;

  /** Specify the page number of the on-ramp transactions to retrieve. */
  page?: number;

  /**
   * Sort the on-ramp transactions by a specific field.
   * You can sort by createdAt or updatedAt. By default, on-ramp transactions are sorted by createdAt.
   * You can also sort in reverse order by adding a hyphen (-) before the field you want to sort by.
   */
  sort?: string;

  /** Search for an on-ramp transaction by name or email. */
  search?: string;

  /**
   * Filter on-ramp transactions by status.
   * This can be either pending, processed, completed, or failed.
   */
  status?: string;

  /** Filter on-ramp transactions by reason. */
  reason?: string;

  /** Filter on-ramp transactions by minimum input amount. */
  minInputAmount?: number;

  /** Filter on-ramp transactions by maximum input amount. */
  maxInputAmount?: number;

  /** Filter on-ramp transactions by minimum output amount. */
  minOutputAmount?: number;

  /** Filter on-ramp transactions by maximum output amount. */
  maxOutputAmount?: number;

  /** Filter on-ramp transactions by organization id. */
  organizationId?: string;

  /** Filter on-ramp transactions by organization name. */
  organizationName?: string;

  /** Filter on-ramp transactions by blockchain. */
  blockchain?: string;

  /** Filter on-ramp transactions by receiver name. */
  receiverName?: string;
};

export type CreateOnRampRequest = {
  /** The wallet address of the receiver. */
  receiverWalletAddress: string;

  /** The acceptance (payment of the fiat currency) method */
  acceptanceMethod: string;

  /** Phone number that would be used on acceptance method of e-wallet. */
  paymentPhoneNumber: string;

  /** The amount of onramp transaction (fiat currency). */
  inputAmount: number;

  /** The input currency (fiat) of the onramp */
  inputCurrency: string;

  /** The crypto ID of the onramp */
  outputCurrency: string;

  /** The reason for the onramp. */
  reason?: string;

  /** The description for the onramp. */
  description?: string;

  /** Memo that might be used on some blockchain network (e.g. Stellar). */
  memo?: string;
};

export type OnRampTransaction = {
  onrampId: string;
  acceptanceMethod: string;
  feeDetail: FeeDetail;
  receiver: Receiver;
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
  userId: string;
  externalOrderId: string;
  expiredDate: Date;
  cryptoId: string;
  useSmartContract: boolean;
  blockchainType: string;
  memo: string;
  activityHistory: ActivityHistory[];
  acceptanceDetail: AcceptanceDetail;
  clientName: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export type AcceptanceDetail = {
  trans_id: string;
  merchant_code: string;
  order_id: string;
  no_reference: string;
  amount: string;
  frontend_url: string;
  signature: string;
  is_custom_page: boolean;
};

export type ActivityHistory = {
  activity: string;
  status: string;
  description: string;
  _id: string;
  updatedAt: Date;
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
  phoneNumber: string;
  walletAddress: string;
};

export type XellarOnRampTransactionListResponse = {
  docs: Omit<OnRampTransaction, 'activityHistory'>[];
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
