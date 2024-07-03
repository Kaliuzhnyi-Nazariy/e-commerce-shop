import { createSlice } from "@reduxjs/toolkit";
import { ICart, getUserCart } from "./cartOperations";

interface IProductCartState {
  cartProducts: ICart[];
}

const initialState: IProductCartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      console.log(action.payload);
      const [userCart] = action.payload;
      state.cartProducts = userCart.products;
      //   state.cartProducts = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
