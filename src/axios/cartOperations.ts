import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseCartURL = "https://fakestoreapi.com/carts";

export interface ICartProduct {
  productId: number;
  quantity: number;
}

export interface ICart {
  id: number;
  userId: number;
  date: Date;
  products: ICartProduct[];
}

export const getUserCart = createAsyncThunk<
  ICart,
  number,
  { rejectValue: string }
>("cart/getAll", async (id): Promise<ICart> => {
  try {
    const res = await axios.get(`${baseCartURL}/user/${id}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in axios/cartOperations/getUserCart: ", error);
    throw error;
  }
});
