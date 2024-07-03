// import { ICart } from "./cartOperations";
import { IProduct } from "./productSlice";

export const selectCategories = (state: { categories: { categories: [] } }) =>
  state.categories.categories;
export const selectAllProducts = (state: {
  products: { product: Array<IProduct> };
}) => state.products.product;
export const selectCartProducts = (state: {
  products: { cartProduct: Array<IProduct> };
}) => state.products.cartProduct;
export const selectUser = (state: { user: { user: object } }) =>
  state.user.user;
export const selectProducts = (state: { cart: { cartProducts: [] } }) =>
  state.cart.cartProducts;
