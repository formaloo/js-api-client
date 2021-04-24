import { ObjectData } from "../../types/types";

export const encodeAsQuerystring = (data: ObjectData): string =>
  Object.keys(data)
    .map((k) => k + "=" + encodeURIComponent(data[k]))
    .join("&");
