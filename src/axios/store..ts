import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { categoriesReducer } from "./categoriesSlice";
import { userReducer } from "./userSlice";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
