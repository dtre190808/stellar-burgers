import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  feedReducer,
  profileOrdersReducer,
  authReducer,
  orderInfoReducer
} from './slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  auth: authReducer,
  orderInfo: orderInfoReducer
});
