import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  extraLoginUser,
  loginUser,
  refreshUser,
} from "./authOperations";

export interface IInitialState {
  user: object;
  token: string;
}

const initialState: IInitialState = {
  user: {},
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = { ...action.payload, ...action.meta.arg };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(extraLoginUser.fulfilled, (state, action) => {
        // console.log(state);
        state.user = action.payload;
      })
      .addCase("user/logOut", (state) => {
        state.user = initialState.user;
        state.token = initialState.token;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const userReducer = userSlice.reducer;
