import { ICart, IProduct, IUser } from "../typesOrInterfaces/typesOrInterfaces";

export const selectCategories = (state: { categories: { categories: [] } }) =>
  state.categories.categories;
export const selectAllProducts = (state: {
  products: { product: Array<IProduct> };
}) => state.products.product;
export const selectCartProducts = (state: {
  products: { cartProduct: Array<IProduct> };
}) => state.products.cartProduct;
export const selectUser = (state: { user: { user: IUser } }) => state.user.user;
export const selectAllUsers = (state: { user: { allUsers: IUser[] } }) =>
  state.user.allUsers;
export const selectProducts = (state: {
  cart: { cartProducts: Array<ICart> };
}) => state.cart.cartProducts;
export const selectIsCreatedByUser = (state: {
  products: { createdByUser: Array<IProduct> };
}) => state.products.createdByUser;
export const selectIsLoggedIn = (state: { user: { isLoggedIn: boolean } }) =>
  state.user.isLoggedIn;
