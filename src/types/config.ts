export type Config = {
  clientSecret: string;
  rampableClientSecret?: string;
  env?: 'sandbox' | 'production';
};
