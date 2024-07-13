import {
  createAction,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { addUserCart, deleteUserCart, getUserCart } from "./cartOperations";
// import { ICart } from "../typesOrInterfaces/typesOrInterfaces";

type userCartItem = { productId: number; quantity: number };

export interface IProductCartState {
  cartProducts: userCartItem[];
  isLoading: boolean;
  error: string;
}

const initialState: IProductCartState = {
  cartProducts: [],
  isLoading: false,
  error: "",
};

export interface ICleanCartItem {
  id: number;
}

export const deleteCartItem = createAction<ICleanCartItem>(
  "cart/deleteCartItem"
);

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
      .addCase(
        getUserCart.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: { productId: number; quantity: number }[];
          }>
        ) => {
          console.log(action.payload.products);

          // state.cartProducts.push(action.payload.products);
          state.cartProducts = action.payload.products;
        }
      )
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
          state.cartProducts[condtion].quantity +=
            action.payload.products.quantity;
        } else {
          state.cartProducts.push(action.payload.products);
        }
      })
      .addCase(addUserCart.rejected, handleRejected)
      .addCase(deleteUserCart.pending, handlePending)
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        const deleteIndex = state.cartProducts.findIndex(
          (product) => product.productId === action.payload.id
        );
        state.cartProducts.splice(deleteIndex, 1);
      })
      .addCase(deleteUserCart.rejected, handleRejected)
      .addCase("cleanProducts", (state) => {
        state.cartProducts = [];
      })
      .addCase(
        deleteCartItem,
        (state, action: PayloadAction<{ id: number }>) => {
          // const onlyChecking = current(state);
          const deleteIndex = state.cartProducts.findIndex(
            (product) => product.productId === action.payload.id
          );
          if (deleteIndex) {
            state.cartProducts.splice(deleteIndex, 1);
          }
        }
      );
  },
});

export const cartReducer = cartSlice.reducer;
