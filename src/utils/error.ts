import { AxiosError, isAxiosError } from 'axios';

export interface ErrorResponse {
  message: string;
  code: string;
  details?: any;
}

export function formatAxiosError(error: AxiosError): ErrorResponse {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      // @ts-ignore
      message: error.response?.data?.message ?? 'An error occurred',
      code: error.response.status.toString(),
      details: error.response.data,
    };
  }
  if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response received from server',
      code: 'NO_RESPONSE',
    };
  }
  // Something happened in setting up the request that triggered an Error
  return {
    message: error.message,
    code: 'REQUEST_SETUP_ERROR',
  };
}

export function handleError(error: any): ErrorResponse {
  if (isAxiosError(error)) {
    return formatAxiosError(error);
  }
  return {
    message: error.message || 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
}

export class XellarError extends Error implements ErrorResponse {
  code: string;

  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}
