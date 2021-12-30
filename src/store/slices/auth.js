import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  user: null,
  error: null,
  authenticationState: LoadState.NOT_LOADED,
  loginState: LoadState.NOT_LOADED,
  rol: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loginState = LoadState.LOADING;
    },
    loginSuccess(state) {
      state.loginState = LoadState.LOADED_SUCCESS;
    },
    loginError(state, action) {
      state.error = action.payload;
      state.user = null;
      state.loginState = LoadState.LOADED_FAILURE;
    },
    authenticationSucess(state, action) {
      state.authenticationState = LoadState.LOADED_SUCCESS;
      state.user = action.payload.user;
      state.rol = action.payload.rol;
    },
    authenticationError(state, action) {
      state.error = action.payload;
      state.user = null;
      state.authenticationState = LoadState.LOADED_FAILURE;
    },
    authenticate(state) {
      state.authenticationState = LoadState.LOADING;
    },
    signOut(state) {
      localStorage.removeItem("token");
      state.authenticationState = LoadState.NOT_LOADED;
      state.user = null;
      state.rol = null;
      state.error = null;
    },
  },
});

export const {
  authenticate,
  loginSuccess,
  login,
  loginError,
  authenticationError,
  authenticationSucess,
  signOut,
} = authSlice.actions;
export default authSlice.reducer;
