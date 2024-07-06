import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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

const handlePending = (state: { isLoading: boolean; error: string }) => {
  state.isLoading = true;
  state.error = "";
};

const handleRejected = (
  state: { isLoading: boolean; error: string },
  action: PayloadAction<{ error: string }>
) => {
  state.isLoading = false;
  state.error =
    `${action.payload.error}` || "Somesthing went wrong! Try again!";
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserCart.pending, handlePending)
      .addCase(getUserCart.fulfilled, (state, action) => {
        const [userCart] = action.payload;
        state.cartProducts = userCart.products;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.message}`;
      })
      .addCase(addUserCart.pending, handlePending)
      .addCase(addUserCart.fulfilled, (state, action) => {
        const stateBeforeAdding = current(state.cartProducts);

        const condtion = stateBeforeAdding.findIndex(
          (product) => product.productId === action.payload.products.productId
        );

        if (condtion !== -1) {
          state.cartProducts[condtion].quantity += 1;
        } else {
          state.cartProducts.push(action.payload.products);
        }
      })
      .addCase(addUserCart.rejected, handleRejected)
      .addCase(deleteUserCart.pending, handlePending)
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        const deleteIndex = state.cartProducts.findIndex(
          (product) => product.productId === action.payload || action.payload.id
        );
        state.cartProducts.splice(deleteIndex, 1);
      })
      .addCase(deleteUserCart.rejected, handleRejected);
  },
});

export const cartReducer = cartSlice.reducer;
