import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { categoriesReducer } from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
