import Auth from "apis/auth";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  authenticationError,
  authenticationSucess,
  authenticate,
  login,
  loginSuccess,
  loginError,
  signOut,
} from "store/slices/auth";

function* loginSaga(action) {
  const auth = new Auth();
  const response = yield call(() => auth.login(action.payload));
  if (response !== "error") {
    yield put(loginSuccess());
  } else {
    yield put(
      loginError({
        error: "Contraseña o usuario incorrecto",
      })
    );
  }
}
function* getMe() {
  const auth = new Auth();
  const response = yield call(() => auth.getMe());
  if (!response) {
    // yield put(signOut());
    // window.location.href = "/auth";
    console.log(response);
  }
  try {
    yield put(authenticationSucess(response));
  } catch {
    yield put(authenticationError("Lo sentimos, no se pudo autenticar"));
  }
}

function* authSaga() {
  yield all([takeEvery(login, loginSaga), takeEvery(authenticate, getMe)]);
}

export default authSaga;
