import { createSlice } from "@reduxjs/toolkit";
import {
  ICart,
  addUserCart,
  deleteUserCart,
  getUserCart,
} from "./cartOperations";

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
        // console.log(action.payload.products.productId);
        console.log(action.payload.products.quantity);
        const updateIndex = state.cartProducts.findIndex(
          (product) => product.productId === action.payload.products.productId
        );
        if (updateIndex !== -1) {
          console.log(updateIndex);
          state.cartProducts[updateIndex].quantity +=
            action.payload.products.quantity;
        }
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        const deleteIndex = state.cartProducts.findIndex(
          (product) => product.id !== action.payload.id
        );
        state.cartProducts.splice(deleteIndex, 1);
      });
  },
});

export const cartReducer = cartSlice.reducer;
