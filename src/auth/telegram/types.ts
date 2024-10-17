import { RampableAccount } from '../../types/http';

export type BaseTelegramBody = {
  botUsername: string;
  expiredDate?: string;
};

export type TelegramBodyData = {
  data: {
    id: string;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: string;
    hash: string;
  };
} & BaseTelegramBody;

export type TelegramBodyDataString = {
  dataString: string;
} & BaseTelegramBody;

export type TelegramAuthorizeBody = TelegramBodyData | TelegramBodyDataString;

export type TelegramAuthOptions = {
  rampable?: RampableAccount;
};
