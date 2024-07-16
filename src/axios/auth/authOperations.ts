import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ILoginUser,
  INewUser,
  // IRefreshUser,
  IUser,
} from "../../typesOrInterfaces/typesOrInterfaces";
import { RootStateForFunctions } from "../store";
import { IInitialState } from "./userSlice";

const baseUserURL = "https://fakestoreapi.com/users";

export const createUser = createAsyncThunk<
  IUser,
  INewUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/createUser", async (newUser): Promise<IUser> => {
  try {
    const res = await axios.post(`${baseUserURL}`, newUser);
    res.data.id += 10;
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
  { rejectValue: any; state: RootStateForFunctions }
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

export const getAllUsers = createAsyncThunk<
  IUser[],
  void, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any }
>("user/getAll", async (): Promise<IUser[]> => {
  try {
    const res = await axios.get(`${baseUserURL}`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/autOperations/getAllUsers: ", error);
    throw error;
  }
});

export const refreshUser = createAsyncThunk<
  IInitialState,
  void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { rejectValue: any; state: RootStateForFunctions }
>("user/refreshUser", async (_, thunkAPI): Promise<IInitialState> => {
  try {
    const state = thunkAPI.getState();
    return state.user;
  } catch (error) {
    console.log("Error in axios/autOperations/refreshUser: ", error);
    throw error;
  }
});
