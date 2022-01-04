import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import rols from "./slices/rols";
import users from "./slices/users";
import clients from "./slices/clients";
const createRootReducer = () =>
  combineReducers({
    // add reducers here
    auth,
    rols,
    users,
    clients,
  });

export default createRootReducer;
