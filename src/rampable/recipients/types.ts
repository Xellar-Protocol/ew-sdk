export type RecipientBank = {
  accountName: string;
  bankName: string;
  accountNumber: number;
  paymentCode: string;
  currency: string;
  country: string;
  achNumber: string;
  fedwireNumber: string;
  ibanNumber: string;
  accountType: 'Checking' | 'Savings';
  _id: string;
};

export type RampableRecipient = {
  name: string;
  recipientType: string;
  email: string;
  bank: RecipientBank[];
  organizationId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  city: string;
  postCode: string;
  reference: string;
  id: string;
};

export type ListRecipientsResponse = {
  docs: RampableRecipient[];
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

export type ListRecipientsParams = {
  /**
   * Limit the number of recipients returned.
   */
  limit?: number;

  /**
   * Sort the recipients by a specific field. You can sort by createdAt or updatedAt.
   * By default, recipients are sorted by createdAt.
   * You can also sort in reverse order by adding a hyphen (-) before the field you want to sort by.
   */
  sort?: string;

  /**
   * Search for a recipient by name or email.
   */
  search?: string;

  /**
   * Filter recipients by bank country and currency.
   */
  country?: string;

  /**
   * Filter recipients by bank country and currency.
   */
  currency?: string;
};

export type CreateRecipientBody = {
  name: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  bank: {
    accountName: string;
    currency: string;
    country: string;
    bankName?: string;
    accountNumber?: string;
    paymentCode?: string;
    achNumber?: string;
    fedwireNumber?: string;
    ibanNumber?: string;
    accountType?: 'Checking' | 'Savings';
  };
  recipientType?: string;
  organizationId?: string;
  reference?: string;
};

export type CreateRecipientResponse = {
  name: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  bank: RecipientBank[];
  recipientType?: string;
  organizationId?: string;
  reference?: string;
  id: string;
};

export type UpdateRecipientBody = Partial<CreateRecipientBody>;

export type UpdateRecipientResponse = CreateRecipientResponse;

export type DeleteRecipientResponse = CreateRecipientResponse;
