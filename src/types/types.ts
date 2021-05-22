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
 * @interface GenericObject
 */
export interface GenericObject {
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
 * @extends {GenericObject}
 */
export interface ClientArg extends GenericObject {
  apiKey?: string;
  apiSecret?: string;
  writeKey: string;
  baseUrl?: string;
  apiVersion?: string;
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
 * @extends {GenericObject}
 */
export interface RequestArgs extends GenericObject {
  data?: unknown;
  argsHeaders?: GenericObject;
  params?: GenericObject;
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
  params?: BaseListRequestParams & GenericObject;
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
  customer_data?: GenericObject[];
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

export enum BatchImportStatus {
  NEW = "new",
  QUEUED = "queued",
  INPROGRESS = "inprogress",
  IMPORTED = "imported",
  FAILED = "failed",
  CANCELED = "canceled",
}

type BatchImportResultBase<TypeKey extends string> = {
  [key in TypeKey]: Array<string | number>;
} & {
  imported_count: number;
  total_count: number;
};

interface BaseBatchImportResponseDataObject<K extends string> {
  readonly slug: string;
  status: "new" | "queued" | "imported" | "failed" | "inprogress" | "canceled";
  file: string;
  file_type: "json" | "excel";
  import_results?: BatchImportResultBase<K>;
  error_log?: GenericObject;
  error_log_file?: string | null;
  readonly imported_at: string | null;
  readonly created_at: string;
}

export interface NewImportResponseDataObject<K extends string>
  extends BaseBatchImportResponseDataObject<K> {
  status: "new";
}

export interface QueuedImportResponseDataObject<K extends string>
  extends BaseBatchImportResponseDataObject<K> {
  status: "queued";
}

export interface FailedImportResponseDataObject<K extends string>
  extends BaseBatchImportResponseDataObject<K> {
  status: "failed";
}

export interface ImportedImportResponseDataObject<K extends string>
  extends BaseBatchImportResponseDataObject<K> {
  status: "imported";
  import_results: BatchImportResultBase<K>;
  error_log: GenericObject;
  error_log_file: string | null;
}

export type BatchImportResponseDataObject<K extends string> =
  | NewImportResponseDataObject<K>
  | QueuedImportResponseDataObject<K>
  | ImportedImportResponseDataObject<K>
  | FailedImportResponseDataObject<K>;

export interface ActivityBatchImportResponseObject {
  activity_batch: BatchImportResponseDataObject<"activities">;
}

export interface CustomerBatchImportResponseObject {
  customer_batch: BatchImportResponseDataObject<"customers">;
}

/**
 *
 *
 * @interface ActivityRelationInstance
 */
interface ActivityRelationInstance {
  identifier_value: string | number;
  title?: string;
  instance_data: GenericObject;
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
  activity_data: GenericObject;
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
  default_text_template?: GenericObject;
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
   * @type {GenericObject}
   * @memberof ActionType
   */
  activity_text_template?: GenericObject;
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

export interface Business {
  readonly slug: string;
  readonly business_identifier: string;
  title?: string;
  description?: string;
}

export interface GamificationSettings {
  cash_back_minimum: string;
  cash_back_maximum: string;
}
