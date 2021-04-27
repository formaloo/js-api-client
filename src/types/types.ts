import { Method } from "axios";
import { HttpStatusCode } from "src/utils/network";

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type EmptyObject = Record<string, never>;
/**
 * Generic Object
 *
 * @export
 * @interface ObjectData
 */
export interface ObjectData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 *
 * @export
 * @interface HTTPClient
 */
export interface HTTPClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (args: Request) => Promise<any>;
}

/**
 *
 * Argument object for Formaloo API client
 *
 * @export
 * @interface ClientArg
 * @extends {ObjectData}
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

/**
 *
 *
 * @export
 * @interface BaseReadRequestArgs
 */
export interface BaseReadRequestArgs {
  token: string;
}

/**
 *
 *
 * @export
 * @interface RequestArgs
 * @extends {ObjectData}
 */
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

export interface ResponseData<T> {
  data: T;
}
export interface ResponseError {
  errors: {
    general_errors: string[];
    form_errors: { [key: string]: string[] };
  };
}

export interface Response<T> extends ResponseData<T>, ResponseError {
  status: HttpStatusCode;
}

/**
 *
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
 * Action Operation Type
 *
 * @export
 * @enum {number}
 */
export enum OperationType {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

/**
 *
 *
 * @interface ActivityRelationInstance
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
 *
 *
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
  activity_date?: string;
  tags?: RequireAtLeastOne<Omit<Tag, "description">>[];
  readonly created_at: string;
  readonly updated_at: string;
  operation_type?: OperationType;
}

/**
 *
 * @export
 * @interface ActionTypeGroup
 */
export interface ActionTypeGroup {
  readonly slug: string;
  title: string;
  description?: string;
  default_text_template?: ObjectData;
}

/**
 *
 *
 * @export
 * @interface ActionType
 */
export interface ActionType {
  title: string;
  description?: string | null;
  /**
   * integration slug on which this action type is created
   *
   * @type {string}
   * @memberof ActionType
   */
  integration: string;
  /**
   * an array of tag slugs
   *
   * @type {string[]}
   * @memberof ActionType
   */
  tags: string[];
  /**
   *
   * @type {string}
   * @memberof ActionType
   */
  readonly slug: string;
  /**
   *
   * @type {Date}
   * @memberof ActionType
   */
  readonly created_at: string;
  /**
   *
   * @type {Date}
   * @memberof ActionType
   */
  readonly updated_at: string;
  /**
   * shows the default operation type for the activities with this action type.
   * @type {OperationType}
   * @memberof ActionType
   */
  default_operation_type?: OperationType;
  /**
   * add a series of text templates for the activities with this action type.
   * for example {"en": "An order with was the order code {order_code} was created."}
   *
   * @type {ObjectData}
   * @memberof ActionType
   */
  activity_text_template?: ObjectData;
  /**
   * how much score will a customer gain by performing an
   * activity with this action type? (as defined by action type owner.)
   *
   * @type {number}
   * @memberof ActionType
   */
  action_score?: number;
  /**
   * action type group slug
   *
   * @type {string}
   * @memberof ActionType
   */
  group?: string;
}
