import { FormalooTypes as Types } from "../../types";

export class ActionTypes {
  constructor(private _http: Types.HTTPClient) {}

  public get(
    args: { slug: string } & Types.BaseReadRequestArgs
  ): Promise<Types.Response<Types.ActionType>> {
    const { slug, token } = args;

    return this._http.request({
      method: "get",
      url: `/action-types/${slug}/`,
      token,
    });
  }

  public list(
    args: Types.ListRequestArgs
  ): Promise<
    Types.Response<
      { action_types: Types.ActionType[] } & Types.PaginatedListMetaData
    >
  > {
    const { token, params = {} } = args;

    return this._http.request({
      method: "get",
      url: "/action-types",
      params,
      token,
    });
  }

  public create(
    args: {
      data: Omit<Types.ActionType, "slug">;
    } & Types.BaseWriteRequestArgs
  ): Promise<Types.Response<Types.ActionType>> {
    return this._http.request({
      method: "post",
      url: `/action-types/`,
      ...args,
    });
  }

  public update({
    slug,
    data,
    ...args
  }: {
    slug: string;
    data: Omit<Partial<Types.ActionType>, "slug">;
  } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<Partial<Types.ActionType>>
  > {
    return this._http.request({
      method: "patch",
      url: `/action-types/${slug}`,
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
      url: `/action-types/${slug}`,
      ...args,
    });
  }
}
