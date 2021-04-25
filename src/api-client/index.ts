import { clientConstructor } from "./client";
import { FormalooTypes } from "../types";
import { Auth } from "./auth";
import { Customers } from "./resources";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createClient = (args: FormalooTypes.ClientArg) => {
  const http = clientConstructor(args);

  return {
    auth: new Auth(http),
    customers: new Customers(http),
  };
};
