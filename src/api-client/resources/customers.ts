import { ResponseError } from "src/types/types";
import { FormalooTypes as Types } from "../../types";

export class Customers {
  constructor(private _http: Types.HTTPClient) {}

  public get(args: { slug: string }): Promise<unknown> {
    const { slug } = args;

    return this._http.request({
      method: "get",
      url: `/customers/${slug}/`,
    });
  }

  public list(args: Types.ListRequestData): Promise<unknown> {
    const { page, page_size, search, params, ...requestArgs } = args;

    return this._http.request({
      method: "get",
      url: "/customers",
      params: {
        ...params,
        page,
        page_size,
        search,
      },
      ...requestArgs,
    });
  }

  public create(args: Types.RequestData): Promise<unknown> {
    return this._http.request({
      method: "post",
      url: `/customers/`,
      ...args,
    });
  }

  public update({ slug, ...args }: Types.UpdateRequestData): Promise<unknown> {
    return this._http.request({
      method: "patch",
      url: `/customers/${slug}`,
      ...args,
    });
  }

  public delete(args: { slug: string }): Promise<unknown> {
    const { slug } = args;

    return this._http.request({
      method: "delete",
      url: `/customers/${slug}`,
    });
  }

  /**
   * batch customer import
   * @summary create multiple customers using `customers_data` in body
   */
  public batchImport(args: Types.RequestData): Promise<unknown> {
    return this._http.request({
      method: "post",
      url: "/customers/batch",
      ...args,
    });
  }
}
