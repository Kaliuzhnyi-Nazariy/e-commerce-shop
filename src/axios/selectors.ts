import { IProduct } from "../typesOrInterfaces/typesOrInterfaces";

export const selectCategories = (state: { categories: { categories: [] } }) =>
  state.categories.categories;
export const selectAllProducts = (state: {
  products: { product: Array<IProduct> };
}) => state.products.product;
export const selectCartProducts = (state: {
  products: { cartProduct: Array<IProduct> };
}) => state.products.cartProduct;
export const selectProducts = (state: {
  cart: { cartProducts: { productId: number; quantity: number }[] };
}) => state.cart.cartProducts;
export const selectIsCreatedByUser = (state: {
  products: { createdByUser: Array<IProduct> };
}) => state.products.createdByUser;
