import { FormalooTypes } from "../../types";
import { encodeAsQuerystring } from "../../utils";

export class Auth {
  constructor(private _http: FormalooTypes.HTTPClient) {}

  // get or refresh access token (client credentials)
  public getAccessToken(): Promise<unknown> {
    const data = encodeAsQuerystring({
      grant_type: "client_credentials",
    });

    return this._http.request({
      method: "post",
      url: `/oauth2/authorization-token/`,
      argsHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
  }
}
