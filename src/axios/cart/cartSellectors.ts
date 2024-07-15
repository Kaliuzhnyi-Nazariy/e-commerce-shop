export const selectProducts = (state: {
  cart: { cartProducts: { productId: number; quantity: number }[] };
}) => state.cart.cartProducts;
export const selectcartIsLoading = (state: { cart: { isLoading: boolean } }) =>
  state.cart.isLoading;
export const selectCartError = (state: { cart: { error: string } }) =>
  state.cart.error;
