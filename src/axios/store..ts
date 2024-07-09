import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { categoriesReducer } from "./categoriesSlice";
import { userReducer } from "./userSlice";
import { cartReducer } from "./cartSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token", "allUsers"],
};

const productsPersistConfig = {
  key: "products",
  storage,
  whitelist: ["product"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const persistedProductsReducer = persistReducer(
  productsPersistConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    products: persistedProductsReducer,
    categories: categoriesReducer,
    user: persistedUserReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
