export type APIVersion = 'v1' | 'v2';

export type Config = {
  clientSecret: string;
  baseURL: string;
  version: APIVersion;
};
