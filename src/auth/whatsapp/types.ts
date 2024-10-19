import { RampableAccount } from '../../types/http';

export type WhatsAppLoginResponse = {
  verifyToken: string;
  isWalletCreated: boolean;
};

export type WhatsAppAuthOptions = {
  rampable?: RampableAccount;
};
