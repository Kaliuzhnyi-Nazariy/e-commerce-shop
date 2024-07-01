import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productBaseURL = "https://fakestoreapi.com/products";

export type AllProducts = object[];

export type Categories = string[];

export type ICategory = Array<object>;

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
  INewProduct,
  {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  },
  { rejectValue: string }
>(
  "product/createProduct",
  async ({
    title,
    price,
    description,
    image,
    category,
  }): Promise<INewProduct> => {
    try {
      const res = await axios.post(`${productBaseURL}`, {
        title,
        price,
        description,
        image,
        category,
      });
      return res.data;
    } catch (error) {
      console.log("Error in axios/addProduct: ", error);
      return <INewProduct>{};
    }
  }
);

export const getExactCategory = createAsyncThunk<
  ICategory,
  { category: string },
  { rejectValue: string }
>("category/getExactCategory", async (category): Promise<ICategory> => {
  try {
    const res = await axios.get(`${productBaseURL}/category/${category}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in axios/getExactCategory: ", error);
    return <ICategory>[];
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  { id: number },
  { rejectValue: string }
>("product/deleteProduct", async (id): Promise<void> => {
  try {
    const res = await axios.delete(`${productBaseURL}/${id}`);
    console.log(`${productBaseURL}/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error in axios/deleteProduct: ", error);
  }
});
