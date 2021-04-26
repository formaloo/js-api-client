import { Method } from "axios";

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

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
export type BaseWriteRequestArgs = RequireAtLeastOne<{
  token?: string;
  useWriteKey?: boolean;
}>;
export interface BaseReadRequestArgs {
  token: string;
}
export interface RequestArgs extends ObjectData {
  data?: unknown;
  argsHeaders?: ObjectData;
  params?: ObjectData;
  token?: string;
  useWriteKey?: boolean;
}

/**
 * Formaloo list request object.
 */
export interface BaseListRequestParams {
  search?: string;
  page?: number;
  page_size?: number;
}
export interface ListRequestArgs extends BaseReadRequestArgs {
  params?: BaseListRequestParams & ObjectData;
}

/**
 * Formaloo request object.
 */
export interface Request extends RequestArgs {
  url: string;
  method: Method;
}

export interface PaginatedListMetaData {
  count: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  page_count: number;
  current_page: number;
}

export interface ResponseError {
  errors: {
    general_errors: string[];
    form_errors: { [key: string]: string[] };
  };
}

/**
 *
 * @export
 * @interface Tag
 */
export interface Tag {
  readonly slug: string;
  title: string;
  description?: string;
}

/**
 *
 * @export
 * @interface Customer
 */
export interface Customer {
  readonly code: string;
  customer_data?: ObjectData[];
  full_name?: string | null;
  email?: string;
  phone_number?: string | null;
  tags?: Partial<Tag>[];
  readonly score?: number;
  readonly created_at?: string;
  readonly updated_at?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum OperationType {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

/**
 * ActivityRelationInstance
 */
interface ActivityRelationInstance {
  identifier_value: string | number;
  title?: string;
  instance_data: ObjectData;
  entity: {
    readonly slug: string;
    model_name: string;
    title?: string | null;
    description?: string | null;
  };
}

/**
 * @export
 * @interface ActivityRelation
 */
interface ActivityRelation {
  relation_name: string;
  instance: ActivityRelationInstance;
}

/**
 * @export
 * @interface Activity
 */
export interface Activity {
  readonly slug: string;
  action: string;
  description?: string;
  customer: RequireAtLeastOne<{
    code?: string;
    email?: string;
    phone_number?: string;
  }>;
  activity_data: ObjectData;
  relations?: ActivityRelation[];
  currency?: string;
  monetary_value?: unknown;
  activity_date?: Date | string;
  tags?: RequireAtLeastOne<Omit<Tag, "description">>[];
  readonly created_at: string;
  readonly updated_at: string;
  operation_type?: OperationType;
}
