import { FormalooTypes as Types } from "../../types";

export class Businesses {
  constructor(private _http: Types.HTTPClient) {}

  public list(
    args: Types.BaseReadRequestArgs
  ): Promise<Types.Response<{ customer: Types.Customer }>> {
    const { token } = args;

    return this._http.request({
      method: "get",
      url: `/businesses/`,
      token,
    });
  }

  public createGdprDeleteDataRequest({
    ...args
  }: { slug: string } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<{
      business_delete_request: {
        slug: string;
        status: string;
        description?: string;
        created_at: string;
        business: Types.Business;
      };
    }>
  > {
    return this._http.request({
      method: "post",
      url: `/businesses/business/gdpr-delete-requests`,
      ...args,
    });
  }
}
