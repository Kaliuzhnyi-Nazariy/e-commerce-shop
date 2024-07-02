import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authOperations";

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
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = { ...action.payload, ...action.meta.arg };
    });
  },
});

export const userReducer = userSlice.reducer;
