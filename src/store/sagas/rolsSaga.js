import Rols from "apis/Rols";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  loadRols,
  loadRolsSuccess,
  loadRolsError,
  createRol,
  createRolError,
  createRolSuccess,
  updateRol,
  updateRolError,
  updateRolSuccess,
  deleteRol,
  deleteRolSucess,
  deleteRolError,
} from "store/slices/rols";

function* loadRolsSaga(action) {
  try {
    const rols = new Rols();
    const response = yield call(() => rols.getRols());
    yield put(loadRolsSuccess(response.objModel));
  } catch (error) {
    yield put(loadRolsError(error.response.data.description));
  }
}

function* createRolsSaga(action) {
  try {
    const rols = new Rols();
    const response = yield call(() => rols.createRol(action.payload));
    yield put(createRolSuccess(response.objModel));
  } catch (error) {
    yield put(createRolError(error.response.data.description));
  }
}

function* updateRolSaga(action) {
  try {
    const rols = new Rols();
    const response = yield call(() => rols.updateRol(action.payload));
    yield put(updateRolSuccess(response.objModel));
  } catch (error) {
    yield put(updateRolError(error.response.data.description));
  }
}

function* deleteRolSaga(action) {
  try {
    const rols = new Rols();
    yield call(() => rols.deleteRol(action.payload));
    yield put(deleteRolSucess({ id: action.payload }));
  } catch (error) {
    yield put(deleteRolError(error.response.data.description));
  }
}

function* authSaga() {
  yield all([
    takeEvery(loadRols, loadRolsSaga),
    takeEvery(createRol, createRolsSaga),
    takeEvery(updateRol, updateRolSaga),
    takeEvery(deleteRol, deleteRolSaga),
  ]);
}

export default authSaga;
