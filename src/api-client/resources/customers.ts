import { FormalooTypes as Types } from "../../types";
export class Customers {
  constructor(private _http: Types.HTTPClient) {}

  public get(
    args: { slug: string } & Types.BaseReadRequestArgs
  ): Promise<Types.Response<{ customer: Types.Customer }>> {
    const { slug, token } = args;

    return this._http.request({
      method: "get",
      url: `/customers/${slug}/`,
      token,
    });
  }

  public list(
    args: Types.ListRequestArgs
  ): Promise<
    Types.Response<
      { customers: Types.Customer[] } & Types.PaginatedListMetaData
    >
  > {
    const { token, params = {} } = args;

    return this._http.request({
      method: "get",
      url: "/customers",
      params,
      token,
    });
  }

  public create(
    args: {
      data: Omit<Types.Customer, "code" | "created_at" | "updated_at">;
    } & Types.BaseWriteRequestArgs
  ): Promise<Types.Response<{ customer: Types.Customer }>> {
    return this._http.request({
      method: "post",
      url: `/customers/`,
      ...args,
    });
  }

  public update({
    code,
    data,
    ...args
  }: {
    code: string;
    data: Omit<Types.Customer, "code" | "created_at" | "updated_at" | "score">;
  } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<{ customer: Partial<Types.Customer> }>
  > {
    return this._http.request({
      method: "patch",
      url: `/customers/${code}`,
      data,
      ...args,
    });
  }

  public delete({
    code,
    ...args
  }: { code: string } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<Types.EmptyObject>
  > {
    return this._http.request({
      method: "delete",
      url: `/customers/${code}`,
      ...args,
    });
  }

  /**
   * batch customer import
   * @summary create multiple customers using `customers_data` in body
   */
  public batchImport({
    data: customer_data,
    ...args
  }: {
    data: Omit<Types.Customer, "code" | "created_at" | "updated_at">[];
  } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<Types.CustomerBatchImportResponseObject>
  > {
    return this._http.request({
      method: "post",
      url: "/customers/batch",
      data: {
        customer_data,
      },
      ...args,
    });
  }

  public createGdprStoredDataRequest({
    code,
    ...args
  }: { code: string } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<{
      customer_data_request: {
        slug: string;
        status: string;
        description?: string;
        created_at: string;
        customer: Types.Customer;
        business: Types.Business;
      };
    }>
  > {
    return this._http.request({
      method: "post",
      url: `/customers/${code}/gdpr-data-requests`,
      ...args,
    });
  }

  public createGdprDeleteDataRequest({
    code,
    ...args
  }: { code: string } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<{
      customer_delete_request: {
        slug: string;
        status: string;
        description?: string;
        created_at: string;
        customer: Types.Customer;
        business: Types.Business;
      };
    }>
  > {
    return this._http.request({
      method: "post",
      url: `/customers/${code}/gdpr-delete-requests`,
      ...args,
    });
  }
}
