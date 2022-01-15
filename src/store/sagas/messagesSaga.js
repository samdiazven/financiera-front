import Messages from "apis/messages";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesError,
  createMessage,
  createMessageError,
  createMessageSuccess,
  updateMessage,
  updateMessageError,
  updateMessageSuccess,
  deleteMessage,
  deleteMessageError,
  deleteMessageSuccess,
} from "store/slices/messages";

function* loadMessagesSaga(action) {
  try {
    const messages = new Messages();
    const response = yield call(() => messages.getMessages());
    yield put(loadMessagesSuccess(response));
  } catch (error) {
    yield put(loadMessagesError("Error al cargar los mensajes"));
  }
}

function* createMessageSaga(action) {
  try {
    const messages = new Messages();
    const response = yield call(() => messages.createMessage(action.payload));
    yield put(createMessageSuccess(response));
  } catch (error) {
    yield put(createMessageError("Error al crear el mensaje"));
  }
}

function* updateMessageSaga(action) {
  try {
    const messages = new Messages();
    const response = yield call(() => messages.updateMessage(action.payload));
    yield put(updateMessageSuccess(response));
  } catch (error) {
    yield put(updateMessageError("Error al actualizar el mensaje"));
  }
}

function* deleteMessageSaga(action) {
  try {
    const messages = new Messages();
    yield call(() => messages.deleteMessage(action.payload));
    yield put(deleteMessageSuccess({ id: action.payload }));
  } catch (error) {
    yield put(deleteMessageError("Error al eliminar el mensaje"));
  }
}

function* messageSaga() {
  yield all([
    takeEvery(loadMessages, loadMessagesSaga),
    takeEvery(createMessage, createMessageSaga),
    takeEvery(updateMessage, updateMessageSaga),
    takeEvery(deleteMessage, deleteMessageSaga),
  ]);
}

export default messageSaga;
