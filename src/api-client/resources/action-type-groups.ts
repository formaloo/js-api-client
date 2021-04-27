import { FormalooTypes as Types } from "../../types";

export class ActionTypeGroups {
  constructor(private _http: Types.HTTPClient) {}

  public list(
    args: Types.ListRequestArgs
  ): Promise<
    Types.Response<
      { action_types: Types.ActionTypeGroup[] } & Types.PaginatedListMetaData
    >
  > {
    const { token, params = {} } = args;

    return this._http.request({
      method: "get",
      url: "/action-type-groups",
      params,
      token,
    });
  }
}
