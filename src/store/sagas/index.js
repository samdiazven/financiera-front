import { all, fork } from "redux-saga/effects";

import authSaga from "store/sagas/authSaga";
import rolsSaga from "store/sagas/rolsSaga";
import clientsSaga from "./clientsSaga";
import usersSaga from "./usersSaga";
import loansSaga from "./loanSaga";
import messagesSaga from "./messagesSaga";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(rolsSaga),
    fork(usersSaga),
    fork(clientsSaga),
    fork(loansSaga),
    fork(messagesSaga),
  ]);
}

export default rootSaga;
