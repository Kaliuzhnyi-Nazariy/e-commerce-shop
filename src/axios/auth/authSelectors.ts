import { IUser } from "../../typesOrInterfaces/typesOrInterfaces";

export const selectUser = (state: { user: { user: IUser } }) => state.user.user;
export const selectAllUsers = (state: { user: { allUsers: IUser[] } }) =>
  state.user.allUsers;
export const selectIsLoggedIn = (state: { user: { isLoggedIn: boolean } }) =>
  state.user.isLoggedIn;
export const selectIsLoading = (state: { user: { isLoading: boolean } }) =>
  state.user.isLoading;
export const selectUserError = (state: { user: { error: string } }) =>
  state.user.error;
