import { IProduct } from "./productSlice";

export const selectCategories = (state: { categories: { categories: [] } }) =>
  state.categories.categories;
export const selectAllProducts = (state: {
  products: { product: Array<IProduct> };
}) => state.products.product;
