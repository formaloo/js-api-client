import { clientConstructor } from "./client";
import { FormalooTypes } from "../types";
import { Auth } from "./auth";
import {
  Customers,
  Activities,
  ActionTypeGroups,
  ActionTypes,
  Tags,
} from "./resources";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const create = (args: FormalooTypes.ClientArg) => {
  const http = clientConstructor(args);

  return {
    auth: new Auth(http),
    tags: new Tags(http),
    customers: new Customers(http),
    activities: new Activities(http),
    actionTypes: new ActionTypes(http),
    actionTypeGroups: new ActionTypeGroups(http),
  };
};
