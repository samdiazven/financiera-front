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
  const auth = new Auth();
  const response = yield call(() => auth.login(action.payload));
  if (response !== "error") {
    yield put(loginSuccess());
    window.location.href = "/admin/dashboard";
  } else {
    yield put(
      loginError({
        error: "Contraseña o usuario incorrecto",
      })
    );
  }
}
function* getMe() {
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
