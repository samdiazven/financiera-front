import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import rols from "./slices/rols";
import users from "./slices/users";
import clients from "./slices/clients";
import loans from "./slices/loan";
import messages from "./slices/messages";
const createRootReducer = () =>
  combineReducers({
    // add reducers here
    auth,
    rols,
    users,
    clients,
    loans,
    messages,
  });

export default createRootReducer;
