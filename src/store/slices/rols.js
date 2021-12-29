import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  rols: [],
  error: null,
  rolState: LoadState.NOT_LOADED,
};

const rolSlice = createSlice({
  name: "rols",
  initialState,
  reducers: {
    loadRols(state) {
      state.rolState = LoadState.LOADING;
    },
    loadRolsSuccess(state, action) {
      state.rolState = LoadState.LOADED_SUCCESS;
      state.rols = action.payload;
    },
    loadRolsError(state, action) {
      state.error = action.payload;
      state.rols = [];
      state.rolState = LoadState.LOADED_FAILURE;
    },
    createRol(state, action) {
      state.rolState = LoadState.LOADING;
    },
    createRolSuccess(state, action) {
      state.rolState = LoadState.LOADED_SUCCESS;
      state.rols = [...state.rol, action.payload];
    },
    createRolError(state, action) {
      state.error = action.payload;
      state.rolState = LoadState.LOADED_FAILURE;
    },
    updateRol(state, action) {
      state.rolState = LoadState.LOADING;
    },
    updateRolSuccess(state, action) {
      state.rolState = LoadState.LOADED_SUCCESS;
      state.rols = state.rols.map((rol) =>
        rol.id === action.payload.id ? action.payload : rol
      );
    },
    updateRolError(state, action) {
      state.error = action.payload;
      state.rolState = LoadState.LOADED_FAILURE;
    },
    deleteRol(state, action) {
      state.rolState = LoadState.LOADING;
    },
    deleteRolSucess(state, action) {
      state.rolState = LoadState.LOADED_SUCCESS;
      state.rols = state.rols.filter((rol) => rol.idRol !== action.payload.id);
    },
    deleteRolError(state, action) {
      state.error = action.payload;
      state.rolState = LoadState.LOADED_FAILURE;
    },
  },
});

export const {
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
  deleteRolError,
  deleteRolSucess,
} = rolSlice.actions;
export default rolSlice.reducer;
