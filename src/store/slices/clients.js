import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  clients: [],
  clientSelected: null,
  error: null,
  state: LoadState.NOT_LOADED,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    loadClients(state) {
      state.state = LoadState.LOADING;
    },
    loadClientsSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.clients = action.payload;
    },
    loadClientsError(state, action) {
      state.error = action.payload;
      state.clients = [];
      state.state = LoadState.LOADED_FAILURE;
    },
    createClient(state, action) {
      state.state = LoadState.LOADING;
    },
    createClientSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.clients = [...state.clients, action.payload];
    },
    createClientError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    updateClient(state, action) {
      state.state = LoadState.LOADING;
    },
    updateClientSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.clients = state.clients.map((user) =>
        user.idClient === action.payload.idClient ? action.payload : user
      );
    },
    updateClientError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    deleteClient(state, action) {
      state.state = LoadState.LOADING;
    },
    deleteClientSuccess(state, action) {
      state.state = LoadState.LOADED_SUCCESS;
      state.clients = state.clients.map((user) =>
        user.idClient === action.payload.id
          ? { ...user, idClientState: user.idClientState === 1 ? 2 : 1 }
          : user
      );
    },
    deleteClientError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
    selectClient(state, action) {
      state.clientSelected = action.payload;
    },
    cleanClientSelected(state) {
      state.clientSelected = null;
    },
  },
});

export const {
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
  selectClient,
  cleanClientSelected,
} = clientSlice.actions;
export default clientSlice.reducer;
