import { all, call, put, take, takeEvery } from "redux-saga/effects";
import {
  authenticationError,
  authenticationSucess,
  setAuthUser,
  authenticate,
} from "store/slices/auth";

function* login(action) {
  try {
    const response = yield call(fetch, "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();
    if (data.success) {
      yield put(setAuthUser(data.user));
    } else {
      yield put(authenticationSucess());
    }
  } catch (e) {
    yield put(authenticationError(err.data.message));
  }
}
function* authSaga() {
  yield all([takeEvery(authenticate, login)]);
}

export default authSaga;
