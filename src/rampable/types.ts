export type WithRampableAccessToken<T> = T & {
  /**
   * The rampable access token for the rampable operations.
   * Required if you want to use rampable operations and not setup HTTP Signature Authentication (Personal Token)
   */
  rampableAccessToken?: string;
};
