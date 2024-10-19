export type RampableCurrency = {
  value: string;
  currency: string;
  countryCode: string;
  logo: string;
  name: string;
  requireBankName: boolean;
  requireIfsc: boolean;
  requireIban: boolean;
  requireAchOrWire: boolean;
  requireAccountNumber: boolean;
  country: string;
  symbol: string;
  id: string;
};

export type RampableCrypto = {
  _id: string;
  symbol: string;
  id: string;
  name: string;
  label: string;
  address: string;
  chainId: number;
  is_native: boolean;
  logo: string;
  currencies: string[];
  decimal: number;
  priceId: string;
};

export type ListCryptosParams = {
  /**
   * Whether the results are filtered based on tokens that use Rampable smart contract proxy or not.
   * By default, if the params is empty it will response all results.
   */
  useSmartContract?: boolean;

  /**
   * Whether the results are filtered based on blockchain type.
   * By default, if the params is empty it will response all results Possible values are `EVM`, `STELLAR`
   */
  blockchainType?: 'EVM' | 'STELLAR';
};

export type RampableBank = {
  _id: string;
  name: string;
  paymentCode: string;
  country: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export type ListBanksResponse = {
  docs: RampableBank[];
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

export type ListBanksParams = {
  /**
   * Limit the number of recipients returned.
   */
  limit?: number;

  /**
   * Sort the recipients by a specific field. You can sort by createdAt or updatedAt. By default, recipients are sorted by createdAt. You can also sort in reverse order by adding a hyphen (-) before the field you want to sort by.
   */
  sort?: string;

  /**
   * Filter recipients by bank country and currency.
   */
  country?: string;

  /**
   * Filter recipients by bank country and currency.
   */
  currency?: string;
};

export type RampablePaymentMethod = {
  name: string;
  code: string;
  group: string;
  currency: string;
  image: string;
  isActive: boolean;
  flatFeeAmount: number;
  percentFeeAmount: number;
  id: string;
};
