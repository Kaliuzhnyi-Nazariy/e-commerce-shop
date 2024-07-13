import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICart, IProductsInCart } from "../typesOrInterfaces/typesOrInterfaces";
import { RootStateForFunctions } from "./store.";

export const baseCartURL = "https://fakestoreapi.com/carts";

export const getUserCart = createAsyncThunk<
  { productId: number; quantity: number }[],
  number,
  { rejectValue: string; state: RootStateForFunctions }
>(
  "cart/getAll",
  async (id): Promise<{ productId: number; quantity: number }[]> => {
    try {
      const res = await axios.get(`${baseCartURL}/user/${id}`);
      return res.data[0].products;
    } catch (error) {
      console.log("Error in axios/cartOperations/getUserCart: ", error);
      throw error;
    }
  }
);

export const addUserCart = createAsyncThunk<
  IProductsInCart,
  ICart,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("cart/addCart", async (productInfo): Promise<IProductsInCart> => {
  try {
    const res = await axios.post(`${baseCartURL}`, productInfo);
    return res.data;
  } catch (error) {
    console.log("Error in axios/cartOperations/addUserCart: ", error);
    throw error;
  }
});

export const deleteUserCart = createAsyncThunk<
  { id: number },
  number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("cart/deleteCart", async (id): Promise<{ id: number }> => {
  try {
    const res = await axios.delete(`${baseCartURL}/${id}`);
    if (res.data !== null) {
      return res.data;
    } else {
      return { id };
    }
  } catch (error) {
    console.log("Error in axios/cartOperations/deleteUserCart: ", error);
    throw error;
  }
});
