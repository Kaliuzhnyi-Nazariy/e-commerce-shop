import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ILoginUser,
  INewUser,
  IRefreshUser,
  IUser,
} from "../typesOrInterfaces/typesOrInterfaces";

const baseUserURL = "https://fakestoreapi.com/users";

export const createUser = createAsyncThunk<
  IUser,
  INewUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/createUser", async (newUser): Promise<IUser> => {
  try {
    const res = await axios.post(`${baseUserURL}`, newUser);
    return res.data;
  } catch (error) {
    console.log("Error in axios/autOperations/crateUser: ", error);
    throw error;
  }
});

export const loginUser = createAsyncThunk<
  string,
  ILoginUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/loginUser", async (userInfo): Promise<string> => {
  try {
    const res = await axios.post(
      `https://fakestoreapi.com/auth/login`,
      userInfo
    );
    return res.data.token;
  } catch (error) {
    console.log("Error in axios/autOperations/loginUser: ", error);
    throw error;
  }
});

export const extraLoginUser = createAsyncThunk<
  IUser,
  ILoginUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/extraLoginUser", async (userInfo): Promise<IUser> => {
  try {
    const res = await axios.get(`${baseUserURL}`);
    const userLogInfo = res.data.find(
      (user: { username: string }) => user.username === userInfo.username
    );
    return userLogInfo;
  } catch (error) {
    console.log("Error in axios/autOperations/loginUser: ", error);
    throw error;
  }
});

export const refreshUser = createAsyncThunk<
  IRefreshUser,
  void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/refreshUser", async (_, thunkAPI): Promise<IRefreshUser> => {
  try {
    const state = thunkAPI.getState();
    return state.user;
  } catch (error) {
    console.log("Error in axios/autOperations/refreshUser: ", error);
    throw error;
  }
});
