import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../products/operations";

export interface IInitState {
  categories: string[];
  isLoading: boolean;
  error: string;
}

const initialState: IInitState = {
  categories: [],
  isLoading: false,
  error: "",
};

const handlePending = (state: { isLoading: boolean; error: string }) => {
  state.isLoading = true;
  state.error = "";
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
