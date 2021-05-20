import { GenericObject } from "../../types/types";

export const encodeAsQuerystring = (data: GenericObject): string =>
  Object.keys(data)
    .map((k) => k + "=" + encodeURIComponent(data[k]))
    .join("&");
