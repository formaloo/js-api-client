import axios from "axios";
import { API_URL } from "../constants";
import { FormalooTypes } from "../types";

// This can be used as client_credentials (API Key and Secret) or write-only (Write Key) api client
export const clientConstructor = ({
  apiKey,
  apiSecret,
  writeKey,
  ...options
}: FormalooTypes.ClientArg): FormalooTypes.HTTPClient => {
  return {
    request: (args: FormalooTypes.Request) => {
      const {
        url,
        data,
        headers: argsHeaders = {},
        params,
        token,
        useWriteKey,
        ...otherArgs
      } = args;

      const requestUrl = buildUrlWithParams(`${API_URL}${url}`, params);

      const { headers = {} } = options;

      const isWriteOnlyClient = useWriteKey || !apiKey;
      const authorization = isWriteOnlyClient
        ? {}
        : { Authorization: token ? `JWT ${token}` : `Basic ${apiSecret}` };
      const requestParameters = { ...options, ...otherArgs };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return axios({
        url: requestUrl,
        ...requestParameters,
        data,
        headers: {
          Accept: "application/json, text/plain, */*",
          "x-api-key": isWriteOnlyClient ? writeKey : apiKey,
          ...headers,
          ...argsHeaders,
          ...authorization,
        },
      })
        .then((response: any) => response.data)
        .catch((error: any) => {
          console.error(error);
          if (error && error.response && error.response.data) {
            if (error.response.data.errors) {
              throw new Error(error.response.data.errors);
            } else if (error.response.data.error) {
              throw new Error(error.response.data.error);
            } else {
              throw new Error(error.response.data);
            }
          } else {
            throw new Error("Couldn't make request");
          }
        });
    },
  };
};

export const buildUrlWithParams = (
  url: string,
  params: FormalooTypes.ObjectData = {}
): string => {
  // to prevent unnecessary django redirects
  const urlWithTrailingSlash = url.endsWith("/") ? url : url + "/";
  const queryParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return queryParams
    ? `${urlWithTrailingSlash}?${queryParams}`
    : urlWithTrailingSlash;
};
