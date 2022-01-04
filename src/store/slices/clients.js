import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  clients: [],
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
    createClientsuccess(state, action) {
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
        user.idUser === action.payload.idUser ? action.payload : user
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
      state.clients = state.clients.filter(
        (user) => user.idUser !== action.payload.id
      );
    },
    deleteClientError(state, action) {
      state.error = action.payload;
      state.state = LoadState.LOADED_FAILURE;
    },
  },
});

export const {
  loadclients,
  loadClientsSuccess,
  loadClientsError,
  createClient,
  createClientError,
  createClientsuccess,
  updateClient,
  updateClientError,
  updateClientSucess,
  deleteClient,
  deleteClientError,
  deleteClientSuccess,
} = clientSlice.actions;
export default clientSlice.reducer;
