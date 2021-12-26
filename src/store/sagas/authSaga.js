import Auth from "apis/auth";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  authenticationError,
  authenticationSucess,
  authenticate,
  login,
  loginSuccess,
  loginError,
} from "store/slices/auth";

function* loginSaga(action) {
  try {
    const auth = new Auth();
    yield call(() => auth.login(action.payload));
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginError(error.response.data.message));
  }
}
function* getMe(action) {
  try {
    const auth = new Auth();
    const response = yield call(() => auth.getMe());
    yield put(authenticationSucess(response.objModel));
  } catch (error) {
    yield put(authenticationError(error.response.data.message));
  }
}

function* authSaga() {
  yield all([takeEvery(login, loginSaga), takeEvery(authenticate, getMe)]);
}

export default authSaga;
