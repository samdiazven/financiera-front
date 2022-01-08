import Loans from "apis/loans";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  loadLoans,
  loadLoansSuccess,
  loadLoansError,
  createLoan,
  createLoanError,
  createLoanSuccess,
  updateLoan,
  updateLoanError,
  updateLoanSuccess,
} from "store/slices/loan";

function* loadLoanSaga() {
  try {
    const loans = new Loans();
    const response = yield call(() => loans.getLoans());
    yield put(loadLoansSuccess(response));
  } catch (error) {
    yield put(loadLoansError(error.response.data.description));
  }
}

function* createLoanSaga(action) {
  try {
    const loans = new Loans();
    const response = yield call(() => loans.createLoan(action.payload));
    yield put(createLoanSuccess(response));
  } catch (error) {
    yield put(createLoanError(error.response.data.description));
  }
}

function* updateLoanSaga(action) {
  try {
    const loans = new Loans();
    const response = yield call(() => loans.updateLoan(action.payload));
    yield put(updateLoanSuccess(response));
  } catch (error) {
    yield put(updateLoanError(error.response.data.description));
  }
}

function* loansSaga() {
  yield all([
    takeEvery(loadLoans, loadLoanSaga),
    takeEvery(createLoan, createLoanSaga),
    takeEvery(updateLoan, updateLoanSaga),
  ]);
}

export default loansSaga;
