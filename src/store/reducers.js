import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";

const createRootReducer = () =>
  combineReducers({
    // add reducers here
    auth,
  });

export default createRootReducer;
