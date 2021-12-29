import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  users: [],
  error: null,
  state: LoadState.NOT_LOADED,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers(state) {
      state.state = LoadState.LOADING;
    },
    loadUsersSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.users = action.payload;
    },
    loadUsersError(state, action) {
      state.error = action.payload;
      state.users = [];
      state.state = LoadState.LOADED_FAILURE;
    },
    createUser(state, action) {
      state.state = LoadState.LOADING;
    },
    createUserSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.users = [...state.rol, action.payload];
    },
    createUserError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    updateUser(state, action) {
      state.state = LoadState.LOADING;
    },
    updateUserSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.users = state.users.map((rol) =>
        rol.id === action.payload.id ? action.payload : rol
      );
    },
    updateUserError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    deleteUser(state, action) {
      state.state = LoadState.LOADING;
    },
    deleteUserSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.users = state.users.filter(
        (rol) => rol.idRol !== action.payload.id
      );
    },
    deleteUserError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
  },
});

export const {
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
} = userSlice.actions;
export default userSlice.reducer;
