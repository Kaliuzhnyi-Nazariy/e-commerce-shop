import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUserURL = "https://fakestoreapi.com/users";

export interface INewUser {
  email: string;
  username: string;
  password: string;
  name: { firstname: string; lastname: string };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: { lat: string; long: string };
  };
  phone: string;
}

export interface IUser extends INewUser {
  id: number;
}

export const createUser = createAsyncThunk<
  IUser,
  INewUser,
  { rejectValue: string }
>("user/createUser", async (newUser): Promise<IUser> => {
  try {
    const res = await axios.post(`${baseUserURL}`, newUser);
    return res.data;
  } catch (error) {
    console.log("Error in axios/deleteProduct: ", error);
    throw error;
  }
});
