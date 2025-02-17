import { IProduct } from "../../typesOrInterfaces/typesOrInterfaces";

export const selectAllProducts = (state: {
  products: { product: Array<IProduct> };
}) => state.products.product;
export const selectCartProducts = (state: {
  products: { cartProduct: Array<IProduct> };
}) => state.products.cartProduct;
export const selectIsCreatedByUser = (state: {
  products: { createdByUser: Array<IProduct> };
}) => state.products.createdByUser;
export const selectProductIsLoging = (state: {
  products: { isLoading: boolean };
}) => state.products.isLoading;
export const selectProductError = (state: { products: { error: string } }) =>
  state.products.error;
