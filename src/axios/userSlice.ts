import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
  isLoggedIn: boolean;
}

const initialState: IInitialState = {
  user: {},
  token: "",
  isLoading: false,
  error: "string",
  isLoggedIn: false,
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
        state.isLoading = false;
        state.user = { ...action.payload, ...action.meta.arg };
      })
      .addCase(createUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(extraLoginUser.pending, handlePending)
      .addCase(extraLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(extraLoginUser.rejected, handleRejected)
      .addCase("user/logOut", (state) => {
        console.log(current(state));
        state.user = initialState.user;
        state.token = initialState.token;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (Object.keys(action.payload.user).length !== 0) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
