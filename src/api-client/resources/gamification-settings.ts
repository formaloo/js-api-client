import { FormalooTypes as Types } from "../../types";

export class GamificationSettings {
  constructor(private _http: Types.HTTPClient) {}

  public get({
    ...args
  }: Types.BaseReadRequestArgs): Promise<
    Types.Response<{
      gamification_settings: Types.GamificationSettings;
    }>
  > {
    return this._http.request({
      method: "get",
      url: `/gamification-settings/`,
      ...args,
    });
  }

  public update({
    data,
    ...args
  }: {
    data: Partial<Types.GamificationSettings>;
  } & Types.BaseWriteRequestArgs): Promise<
    Types.Response<{
      gamification_settings: Partial<Types.GamificationSettings>;
    }>
  > {
    return this._http.request({
      method: "patch",
      url: `/gamification-settings/`,
      data,
      ...args,
    });
  }
}
