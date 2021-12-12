import { createSlice } from "@reduxjs/toolkit";

const AuthenticationState = {
  NOT_LOADED: "NOT_LOADED",
  LOADING: "LOADING",
  LOADED_SUCCESS: "LOADED_SUCCESS",
  LOADED_FAILURE: "LOADED_FAILURE",
};

const initialState = {
  user: "sam",
  error: null,
  authenticationState: AuthenticationState.NOT_LOADED,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
      state.authenticationState = action.payload
        ? AuthenticationState.LOADED_SUCCESS
        : AuthenticationState.LOADED_FAILURE;
    },
    authenticationSucess(state) {
      state.authenticationState = AuthenticationState.LOADED_SUCCESS;
      state.error = null;
    },
    authenticationError(state, action) {
      state.error = action.payload;
      state.user = null;
      state.authenticationState = AuthenticationState.LOADED_FAILURE;
    },
    authenticate(state, action) {
      state.user = null;
      state.error = null;
      state.authenticationState = AuthenticationState.LOADING;
    },
  },
});

export const {
  authenticate,
  setAuthUser,
  authenticationError,
  authenticationSucess,
} = authSlice.actions;
export default authSlice.reducer;
