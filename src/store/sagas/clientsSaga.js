import Clients from "apis/clients";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  loadClients,
  loadClientsSuccess,
  loadClientsError,
  createClient,
  createClientError,
  createClientSuccess,
  updateClient,
  updateClientError,
  updateClientSuccess,
  deleteClient,
  deleteClientError,
  deleteClientSuccess,
} from "store/slices/clients";

function* loadClientsSaga(action) {
  try {
    const clients = new Clients();
    const response = yield call(() => clients.getClients());
    yield put(loadClientsSuccess(response.objModel));
  } catch (error) {
    yield put(loadClientsError(error.response.data.description));
  }
}

function* createClientSaga(action) {
  try {
    const clients = new Clients();
    const response = yield call(() => clients.createClient(action.payload));
    yield put(createClientSuccess(response.objModel));
  } catch (error) {
    yield put(createClientError(error.response.data.description));
  }
}

function* updateClientSaga(action) {
  try {
    const clients = new Clients();
    const response = yield call(() => clients.updateClient(action.payload));
    yield put(updateClientSuccess(response.objModel));
  } catch (error) {
    yield put(updateClientError(error.response.data.description));
  }
}

function* deleteClientSaga(action) {
  try {
    const clients = new Clients();
    yield call(() => clients.deleteClient(action.payload));
    yield put(deleteClientSuccess({ id: action.payload }));
  } catch (error) {
    yield put(deleteClientError(error.response.data.description));
  }
}

function* clientsSaga() {
  yield all([
    takeEvery(loadClients, loadClientsSaga),
    takeEvery(createClient, createClientSaga),
    takeEvery(updateClient, updateClientSaga),
    takeEvery(deleteClient, deleteClientSaga),
  ]);
}

export default clientsSaga;
