import crypto from 'react-native-quick-crypto';

import { GenerateAssymetricSignatureParams } from '../types/config';

export const generateAssymetricSignatureRN = ({
  body,
  timeStamp,
  method,
  clientID,
  privateKey,
}: GenerateAssymetricSignatureParams) => {
  const myPemKey = privateKey;

  // Asymmetric Key Generation

  // Minify the HTTP body
  const minfiedBodyEncrypted = JSON.stringify(body || {});

  // Create a SHA-256 hash object
  const hash = crypto.createHash('sha256');

  // Add the data to the hash object
  hash.update(minfiedBodyEncrypted);

  // Calculate the SHA-256 hash
  const hexSHA = hash.digest('hex');
  const minfiedBodyEncryptedLower = hexSHA.toLowerCase();

  // Generate the string to be signed
  let stringToSign = '';

  // POST, PATCH, PUT = <X-CLIENT-ID> + “:“ + <X-TIMESTAMP> + “:“ + LowerCase(HexEncode(SHA-256(Minify(<HTTP BODY>))))
  // GET, DELETE = <X-CLIENT-ID> + “:“ + <X-TIMESTAMP>

  switch (method) {
    case 'GET':
      stringToSign = `${clientID}:${timeStamp}`;
      break;
    case 'DELETE':
      stringToSign = `${clientID}:${timeStamp}`;
      break;
    case 'POST':
      stringToSign = `${clientID}:${timeStamp}:${minfiedBodyEncryptedLower}`;
      break;
    case 'PATCH':
      stringToSign = `${clientID}:${timeStamp}:${minfiedBodyEncryptedLower}`;
      break;
    case 'PUT':
      stringToSign = `${clientID}:${timeStamp}:${minfiedBodyEncryptedLower}`;
      break;
    default:
      stringToSign = '';
      break;
  }

  // Throw error if stringToSign is empty
  if (!stringToSign) throw new Error('method not allowed');

  // Create a signer object
  const sign = crypto.createSign('SHA256');

  // Update the signer object with the data to be signed
  sign.update(stringToSign);

  // Sign the data
  const signature = sign.sign(
    {
      key: myPemKey,
    },
    'hex',
  ) as string;

  // Encode the signature to base64
  const base64Signature = Buffer.from(signature, 'hex').toString('base64');

  return base64Signature;
};
