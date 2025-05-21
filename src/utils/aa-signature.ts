import crypto from 'crypto';

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
async function hashMinifiedJSON(inputJSON: string) {
  const minified = minifiedJSON(inputJSON);

  if (typeof window !== 'undefined') {
    const encoder = new TextEncoder();
    const data = encoder.encode(minified);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash)); // convert buffer to byte array
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''); // convert bytes to hex string
    return hashHex.toLowerCase();
  }

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
async function generateSignature({
  method,
  url,
  clientSecret,
  hashedMinifiedJSON,
  timestamp,
}: GenerateSignatureParams) {
  const stringToSign = `${method.toUpperCase()}:${url}:${hashedMinifiedJSON}:${timestamp}`;

  if (typeof window !== 'undefined') {
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(clientSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const signature = await window.crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(stringToSign),
    );
    const signatureArray = Array.from(new Uint8Array(signature)); // convert buffer to byte array
    const signatureBase64 = Buffer.from(signatureArray).toString('base64');
    return signatureBase64;
  }

  const hmac = crypto
    .createHmac('sha256', clientSecret)
    .update(stringToSign)
    .digest();
  return hmac.toString('base64');
}

/**
 * Prepares headers for an authorized request.
 */
export async function prepareHeaders({
  method,
  url,
  appId,
  clientSecret,
  requestBody,
}: PrepareAAHeadersParams) {
  const timestamp = new Date().toISOString();
  // Hash the minified JSON
  const hashedMinifiedJSON = await hashMinifiedJSON(requestBody);

  // Generate signature
  const signature = await generateSignature({
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
