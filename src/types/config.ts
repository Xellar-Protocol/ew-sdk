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
};

export type GenerateAssymetricSignatureParams = {
  body: Record<string, unknown>;
  timeStamp: string;
  method: 'GET' | 'DELETE' | 'POST' | 'PATCH' | 'PUT';
  clientID: string;
  privateKey: string;
};
