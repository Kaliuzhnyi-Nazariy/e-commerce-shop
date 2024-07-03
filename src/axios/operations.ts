import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productBaseURL = "https://fakestoreapi.com/products";

export interface IProduct extends INewProduct {
  id: number;
}

export type AllProducts = IProduct[];

export type Categories = string[];

export interface INewProduct {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const getAllProducts = createAsyncThunk<
  AllProducts,
  void,
  { rejectValue: string }
>("products/allProducts", async (): Promise<AllProducts> => {
  try {
    // const res = await axios.get(`${productBaseURL}?limit=8`);
    const res = await axios.get(`${productBaseURL}`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/getAllProducts: ", error);
    return <AllProducts>[];
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
    return [];
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
    return <IProduct>{};
  }
});

export const getOneProduct = createAsyncThunk<
  IProduct,
  number,
  { rejectValue: string }
>("products/getOne", async (id): Promise<IProduct> => {
  try {
    const res = await axios.get(`${productBaseURL}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in axios/getOneProduct: ", error);
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
    return <AllProducts>[];
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
