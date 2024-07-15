export const selectCategories = (state: { categories: { categories: [] } }) =>
  state.categories.categories;
export const selectCategoriesIsLoading = (state: {
  categories: { isLoading: boolean };
}) => state.categories.isLoading;
export const selectCategoriesError = (state: {
  categories: { error: string };
}) => state.categories.error;
