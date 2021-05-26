import { FormalooTypes as Types } from "../../types";

/**
 *
 *
 * @export
 * @class Activities
 */
export class Activities {
  constructor(private _http: Types.HTTPClient) {}

  public list({
    token,
    params = {},
  }: Types.ListRequestArgs): Promise<
    Types.Response<
      { activities: Types.Activity[] } & Types.PaginatedListMetaData
    >
  > {
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
  ): Promise<Types.Response<{ activity: Types.Activity }>> {
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
    data: activities_data,
    ...args
  }: {
    data: Omit<Types.Activity, "slug" | "created_at" | "updated_at">[];
  } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<Types.ActivityBatchImportResponseObject>
  > {
    return this._http.request({
      method: "post",
      url: "/activities/batch",
      data: {
        activities_data,
      },
      ...args,
    });
  }

  public getBatchImportStatus(
    args: { slug: string } & Types.BaseReadRequestArgs
  ): Promise<Types.Response<Types.ActivityBatchImportResponseObject>> {
    const { slug, token } = args;

    return this._http.request({
      method: "get",
      url: `/activities/batch/${slug}/`,
      token,
    });
  }
}
