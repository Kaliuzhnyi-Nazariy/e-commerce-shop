import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { categoriesReducer } from "./categoriesSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
