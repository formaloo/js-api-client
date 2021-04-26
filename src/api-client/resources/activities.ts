import { FormalooTypes as Types } from "../../types";

export class Activities {
  constructor(private _http: Types.HTTPClient) {}

  public list(args: Types.ListRequestArgs): Promise<unknown> {
    const { token, params = {} } = args;

    return this._http.request({
      method: "get",
      url: "/activities",
      params,
      token,
    });
  }

  public create(
    args: {
      data: Omit<Types.Activity, "slug" | "created_at" | "updated_at">;
    } & Types.BaseWriteRequestArgs
  ): Promise<unknown> {
    return this._http.request({
      method: "post",
      url: `/activities/`,
      ...args,
    });
  }

  /**
   * batch activity import
   * @summary create multiple activities at once
   */
  public batchImport({
    data,
    ...args
  }: {
    data: Omit<Types.Activity, "slug" | "created_at" | "updated_at">[];
  } & Types.BaseWriteRequestArgs): Promise<unknown> {
    return this._http.request({
      method: "post",
      url: "/activities/batch",
      data,
      ...args,
    });
  }
}
