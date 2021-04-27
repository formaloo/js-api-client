import { FormalooTypes as Types } from "../../types";

export class Tags {
  constructor(private _http: Types.HTTPClient) {}

  public get(
    args: { slug: string } & Types.BaseReadRequestArgs
  ): Promise<Types.Response<Types.Tag>> {
    const { slug, token } = args;

    return this._http.request({
      method: "get",
      url: `/tags/${slug}/`,
      token,
    });
  }

  public list(
    args: Types.ListRequestArgs
  ): Promise<
    Types.Response<{ tags: Types.Tag[] } & Types.PaginatedListMetaData>
  > {
    const { token, params = {} } = args;

    return this._http.request({
      method: "get",
      url: "/tags",
      params,
      token,
    });
  }

  public create(
    args: {
      data: Omit<Types.Tag, "slug">;
    } & Types.BaseWriteRequestArgs
  ): Promise<Types.Response<Types.Tag>> {
    return this._http.request({
      method: "post",
      url: `/tags/`,
      ...args,
    });
  }

  public update({
    slug,
    data,
    ...args
  }: {
    slug: string;
    data: Omit<Partial<Types.Tag>, "slug">;
  } & Types.BaseWriteRequestArgs): Promise<Types.Response<Partial<Types.Tag>>> {
    return this._http.request({
      method: "patch",
      url: `/tags/${slug}`,
      data,
      ...args,
    });
  }

  public delete({
    slug,
    ...args
  }: { slug: string } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<Types.EmptyObject>
  > {
    return this._http.request({
      method: "delete",
      url: `/tags/${slug}`,
      ...args,
    });
  }
}
