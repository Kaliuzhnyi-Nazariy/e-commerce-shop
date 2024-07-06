import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  extraLoginUser,
  loginUser,
  refreshUser,
} from "./authOperations";

interface IInitialState {
  user: object;
  token: string;
  isLoading: boolean;
  error: string;
}

const initialState: IInitialState = {
  user: {},
  token: "",
  isLoading: false,
  error: "string",
};

const handlePending = (state: { isLoading: boolean; error: string }) => {
  state.isLoading = true;
  state.error = "";
};

const handleRejected = (
  state: { isLoading: boolean; error: string },
  action: PayloadAction<{ error: string }>
) => {
  state.isLoading = false;
  state.error = action.payload.error || "Somesthing went wrong! Try again!";
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = { ...action.payload, ...action.meta.arg };
      })
      .addCase(createUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(extraLoginUser.pending, handlePending)
      .addCase(extraLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(extraLoginUser.rejected, handleRejected)
      .addCase("user/logOut", (state) => {
        state.user = initialState.user;
        state.token = initialState.token;
      })
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
