import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import saga from "./sagas/";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      .concat(logger)
      .concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

sagaMiddleware.run(saga);

export default store;
