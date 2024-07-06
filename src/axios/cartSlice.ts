import { createSlice, current } from "@reduxjs/toolkit";
import {
  ICart,
  addUserCart,
  deleteUserCart,
  getUserCart,
} from "./cartOperations";
import { act } from "react";

interface IProductCartState {
  cartProducts: ICart[];
  isLoading: boolean;
  error: string;
}

const initialState: IProductCartState = {
  cartProducts: [],
  isLoading: false,
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        console.log(action);
        const [userCart] = action.payload;
        state.cartProducts = userCart.products;
        //   state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.message}`;
      })
      .addCase(addUserCart.fulfilled, (state, action) => {
        let stateBeforeAdding = current(state.cartProducts);

        const condtion = stateBeforeAdding.findIndex(
          (product) => product.productId === action.payload.products.productId
        );

        if (condtion !== -1) {
          state.cartProducts[condtion].quantity += 1;
        } else {
          state.cartProducts.push(action.payload.products);
        }
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        const deleteIndex = state.cartProducts.findIndex(
          (product) => product.productId === action.payload || action.payload.id
        );
        state.cartProducts.splice(deleteIndex, 1);
      });
  },
});

export const cartReducer = cartSlice.reducer;
