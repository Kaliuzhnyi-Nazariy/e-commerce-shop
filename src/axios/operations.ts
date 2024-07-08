/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseCartURL } from "./cartOperations";
import {
  AllProducts,
  Categories,
  INewProduct,
  IProduct,
} from "../typesOrInterfaces/typesOrInterfaces";

const productBaseURL = "https://fakestoreapi.com/products";

export const getAllProducts = createAsyncThunk<
  AllProducts,
  void,
  { rejectValue: string }
>("products/allProducts", async (_, thunkAPI): Promise<AllProducts> => {
  try {
    const state = thunkAPI.getState();
    const res = await axios.get(`${productBaseURL}`);
    if (state.products.product.length > 20) {
      return state.products.product;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log("Error in axios/getAllProducts: ", error);
    throw error;
  }
});

export const getCategories = createAsyncThunk<
  Categories,
  void,
  { rejectValue: string }
>("products/category", async (): Promise<Categories> => {
  try {
    const res = await axios.get(`${productBaseURL}/categories`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/getCategories: ", error);
    throw error;
  }
});

export const addProduct = createAsyncThunk<
  IProduct,
  INewProduct,
  { rejectValue: string }
>("product/createProduct", async (newProduct): Promise<IProduct> => {
  try {
    const res = await axios.post(`${productBaseURL}`, newProduct);
    return res.data;
  } catch (error) {
    console.log("Error in axios/addProduct: ", error);
    throw error;
  }
});

export const getOneProduct = createAsyncThunk<
  IProduct,
  number,
  { rejectValue: string }
>("products/getOne", async (id, thunkAPI): Promise<IProduct> => {
  try {
    const res = await axios.get(`${productBaseURL}/${id}`);
    if (!res.data) {
      const state = thunkAPI.getState();
      const findProduct = state.products.product.find((i) => i.id === id);
      return findProduct;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log("Error in axios/getOneProduct: ", error);
    throw error;
  }
});

export const deleteProductFromCart = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>("products/deleteCartProduct", async (id): Promise<{ id: number }> => {
  try {
    const res = await axios.delete(`${baseCartURL}/${id}`);
    if (res.data !== null) {
      return res.data;
    } else {
      return { id };
    }
  } catch (error) {
    console.log("Error in axios/deleteProductFromCart: ", error);
    throw error;
  }
});

export const getExactCategory = createAsyncThunk<
  AllProducts,
  string,
  { rejectValue: string }
>("category/getExactCategory", async (category): Promise<AllProducts> => {
  try {
    const res = await axios.get(`${productBaseURL}/category/${category}`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/getExactCategory: ", error);
    throw error;
  }
});

export const deleteProduct = createAsyncThunk<
  IProduct,
  number,
  { rejectValue: string }
>("product/deleteProduct", async (id): Promise<IProduct> => {
  try {
    const res = await axios.delete(`${productBaseURL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/deleteProduct: ", error);
    throw error;
  }
});
