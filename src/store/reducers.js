import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import rols from "./slices/rols";
import users from "./slices/users";
const createRootReducer = () =>
  combineReducers({
    // add reducers here
    auth,
    rols,
    users,
  });

export default createRootReducer;
