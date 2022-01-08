import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  loans: [],
  error: null,
  state: LoadState.NOT_LOADED,
  selectedLoan: null,
};

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    loadLoans(state) {
      state.state = LoadState.LOADING;
    },
    loadLoansSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.loans = action.payload;
    },
    loadLoansError(state, action) {
      state.error = action.payload;
      state.loans = [];
      state.state = LoadState.LOADED_FAILURE;
    },
    createLoan(state, _action) {
      state.state = LoadState.LOADING;
    },
    createLoanSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.loans = [...state.loans, action.payload];
    },
    createLoanError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    updateLoan(state, _action) {
      state.state = LoadState.LOADING;
    },
    updateLoanSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.loans = state.loans.map((loan) =>
        loan.idLoan === action.payload.idLoan ? action.payload : loan
      );
    },
    updateLoanError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    selectLoan(state, action) {
      state.selectedLoan = action.payload;
    },
  },
});

export const {
  loadLoans,
  loadLoansSuccess,
  loadLoansError,
  createLoan,
  createLoanSuccess,
  createLoanError,
  updateLoan,
  updateLoanSuccess,
  updateLoanError,
  selectLoan,
} = loanSlice.actions;
export default loanSlice.reducer;
