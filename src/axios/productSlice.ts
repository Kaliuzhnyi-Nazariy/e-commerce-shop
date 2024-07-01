import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getExactCategory,
} from "./operations";

interface IProductInitialState {
  product: Array<object>;
  isLoading: boolean;
  error: string;
}

const initialState: IProductInitialState = {
  product: [],
  isLoading: false,
  error: "",
};

const handlePending = (state: { isLoading: boolean; error: string }) => {
  state.isLoading = true;
  state.error = "";
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error";
      })
      .addCase(addProduct.pending, handlePending)
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = [...state.product, action.payload];
      })
      .addCase(getExactCategory.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action);
        state.product.filter((product) => product.id !== action.payload.id);
      });
  },
});

export const productReducer = productSlice.reducer;
