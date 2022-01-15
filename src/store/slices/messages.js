import { createSlice } from "@reduxjs/toolkit";
import { LoadState } from "./state";

const initialState = {
  messages: [],
  error: null,
  messagesState: LoadState.NOT_LOADED,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadMessages(state) {
      state.messagesState = LoadState.LOADING;
    },
    loadMessagesSuccess(state, action) {
      state.messagesState = LoadState.LOADED_SUCCESS;
      state.messages = action.payload;
    },
    loadMessagesError(state, action) {
      state.error = action.payload;
      state.messages = [];
      state.messagesState = LoadState.LOADED_FAILURE;
    },
    createMessage(state, action) {
      state.messagesState = LoadState.LOADING;
    },
    createMessageSuccess(state, action) {
      state.messagesState = LoadState.LOADED_SUCCESS;
      state.messages = [...state.messages, action.payload];
    },
    createMessageError(state, action) {
      state.error = action.payload;
      state.messagesState = LoadState.LOADED_FAILURE;
    },
    updateMessage(state, action) {
      state.messagesState = LoadState.LOADING;
    },
    updateMessageSuccess(state, action) {
      state.messagesState = LoadState.LOADED_SUCCESS;
      state.messages = state.messages.map((message) =>
        message.idMessage === action.payload.idMessage
          ? action.payload
          : message
      );
    },
    updateMessageError(state, action) {
      state.error = action.payload;
      state.messagesState = LoadState.LOADED_FAILURE;
    },
    deleteMessage(state, action) {
      state.messagesState = LoadState.LOADING;
    },
    deleteMessageSuccess(state, action) {
      state.messagesState = LoadState.LOADED_SUCCESS;
      state.messages = state.messages.filter(
        (message) => message.idMessage !== action.payload.id
      );
    },
    deleteMessageError(state, action) {
      state.error = action.payload;
      state.messagesState = LoadState.LOADED_FAILURE;
    },
  },
});

export const {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesError,
  createMessage,
  createMessageSuccess,
  createMessageError,
  updateMessage,
  updateMessageSuccess,
  updateMessageError,
  deleteMessage,
  deleteMessageSuccess,
  deleteMessageError,
} = messageSlice.actions;
export default messageSlice.reducer;
