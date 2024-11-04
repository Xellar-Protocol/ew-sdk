export type Config = {
  clientSecret: string;
  rampableClientSecret?: string;
  env?: 'sandbox' | 'production';
  /** Use this to perform HTTP Signature Authentication (Personal Token) on rampable
   * @see https://docs.rampable.co/authentication#http-signature-authentication-personal-token
   */
  rampable?: {
    clientId: string;
    privateKey: string;
  };
  platform?: 'react-native' | 'web' | 'node';
};
