import crypto from 'react-native-quick-crypto';

import { PrepareAAHeadersParams } from '../types/config';

/**
 * Minifies a JSON string by removing unnecessary spaces.
 */
function minifiedJSON(inputJSON: string) {
  if (!inputJSON) {
    return '';
  }
  try {
    const parsed = JSON.parse(inputJSON);
    return JSON.stringify(parsed); // Minified JSON
  } catch (error) {
    throw new Error(`Invalid JSON input: ${(error as Error).message}`);
  }
}

/**
 * Hashes the minified JSON using SHA256 and converts it to lowercase.
 */
function hashMinifiedJSON(inputJSON: string) {
  const minified = minifiedJSON(inputJSON);
  const hash = crypto.createHash('sha256').update(minified).digest('hex');
  return hash.toLowerCase();
}

interface GenerateSignatureParams {
  method: string;
  url: string;
  clientSecret: string;
  hashedMinifiedJSON: string;
  timestamp: string;
}

/**
 * Generates the HMAC signature using the provided inputs.
 */
function generateSignature({
  method,
  url,
  clientSecret,
  hashedMinifiedJSON,
  timestamp,
}: GenerateSignatureParams) {
  const stringToSign = `${method.toUpperCase()}:${url}:${hashedMinifiedJSON}:${timestamp}`;
  const hmac = crypto
    .createHmac('sha256', clientSecret)
    .update(stringToSign)
    .digest();
  return hmac.toString('base64');
}

/**
 * Prepares headers for an authorized request.
 */
export async function prepareHeadersReactNative({
  method,
  url,
  appId,
  clientSecret,
  requestBody,
}: PrepareAAHeadersParams) {
  const timestamp = new Date().toISOString();
  // Hash the minified JSON
  const hashedMinifiedJSON = hashMinifiedJSON(requestBody);

  // Generate signature
  const signature = generateSignature({
    method,
    url,
    clientSecret,
    hashedMinifiedJSON,
    timestamp,
  });

  // Prepare headers
  return {
    'Content-Type': 'application/json',
    'X-TIMESTAMP': timestamp,
    'X-APP-ID': appId,
    'X-SIGNATURE': signature,
  };
}
