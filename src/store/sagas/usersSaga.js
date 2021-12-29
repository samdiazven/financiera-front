import Users from "apis/Users";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
  createUser,
  createUserError,
  createUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
  deleteUser,
  deleteUserError,
  deleteUserSuccess,
} from "store/slices/users";

function* loadUsersSaga(action) {
  try {
    const users = new Users();
    const response = yield call(() => users.getUsers());
    yield put(loadUsersSuccess(response.objModel));
  } catch (error) {
    yield put(loadUsersError(error.response.data.description));
  }
}

function* createUsersSaga(action) {
  try {
    const users = new Users();
    const response = yield call(() => users.createUser(action.payload));
    yield put(createUserSuccess(response.objModel));
  } catch (error) {
    yield put(createUserError(error.response.data.description));
  }
}

function* updateUserSaga(action) {
  try {
    const users = new Users();
    const response = yield call(() => users.updateUser(action.payload));
    yield put(updateUserSuccess(response.objModel));
  } catch (error) {
    yield put(updateUserError(error.response.data.description));
  }
}

function* deleteUserSaga(action) {
  try {
    const users = new Users();
    yield call(() => users.deleteUser(action.payload));
    yield put(deleteUserSuccess({ id: action.payload }));
  } catch (error) {
    yield put(deleteUserError(error.response.data.description));
  }
}

function* usersSaga() {
  yield all([
    takeEvery(loadUsers, loadUsersSaga),
    takeEvery(createUser, createUsersSaga),
    takeEvery(updateUser, updateUserSaga),
    takeEvery(deleteUser, deleteUserSaga),
  ]);
}

export default usersSaga;
