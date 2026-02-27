import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeed = (state: RootState) => state.feed;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUpdateUserError = (state: RootState) =>
  state.auth.updateUserError;
export const selectAuthChecked = (state: RootState) => state.auth.isAuthChecked;

export const selectOrderData = (state: RootState) => state.orderInfo.orderData;
