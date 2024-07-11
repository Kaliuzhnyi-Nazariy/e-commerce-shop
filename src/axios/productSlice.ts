import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  deleteProductFromCart,
  getAllProducts,
  getExactCategory,
  getOneProduct,
} from "./operations";
import { IProduct } from "../typesOrInterfaces/typesOrInterfaces";

interface IProductInitialState {
  product: Array<IProduct>;
  isLoading: boolean;
  error: string;
  cartProduct: Array<IProduct>;
  createdByUser: Array<IProduct>;
}

const initialState: IProductInitialState = {
  product: [],
  isLoading: false,
  error: "",
  cartProduct: [],
  createdByUser: [],
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
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      })
      .addCase(getOneProduct.pending, handlePending)
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.cartProduct.push(action.payload);
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      })
      .addCase("cleanCartProducts", (state) => {
        state.cartProduct = [];
      })
      .addCase("cleanCreatedByUser", (state) => {
        state.createdByUser = [];
      })
      .addCase(addProduct.pending, handlePending)
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.product = [...state.product, action.payload];
          state.createdByUser.push(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      })
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const deleteProductIndex = state.product.findIndex(
            (product) => product.id === action.payload.id
          );
          state.product.splice(deleteProductIndex, 1);
        } else {
          const deleteProductIndex = state.product.findIndex(
            (product) => product.id === action.meta.arg
          );
          state.product.splice(deleteProductIndex, 1);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      })
      .addCase(getExactCategory.pending, handlePending)
      .addCase(
        getExactCategory.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.product = action.payload;
        }
      )
      .addCase(getExactCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      })
      .addCase(deleteProductFromCart.pending, handlePending)
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        const deleteIndex = state.cartProduct.findIndex(
          (product) => product.id === action.payload.id
        );
        state.cartProduct.splice(deleteIndex, 1);
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error}` || "Somesthing went wrong! Try again!";
      });
  },
});

export const productReducer = productSlice.reducer;
