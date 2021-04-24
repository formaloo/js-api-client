/**
 * Generic object document.
 */
export interface ObjectData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * HTTP Client for API requests.
 */
export interface HTTPClient {
  request: (args: Request) => Promise<unknown>;
}

/**
 * Argument object for Formaloo API client
 */
export interface ClientArg extends ObjectData {
  apiKey?: string;
  apiSecret?: string;
  writeKey: string;
}

/**
 * Formaloo request data object.
 */

export interface RequestData extends ObjectData {
  data?: unknown;
  argsHeaders?: ObjectData;
  params?: ObjectData;
  token?: string;
  useWriteKey?: boolean;
}

/**
 * Formaloo request object.
 */

export interface Request extends RequestData {
  url: string;
  method: string;
}
