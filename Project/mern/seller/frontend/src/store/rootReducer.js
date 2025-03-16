import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productSlice";
import ordersReducer from "./slices/orderSlice";
import settingsReducer from "./slices/settingSlice";
import themeReducer from "./slices/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  orders: ordersReducer,
  settings: settingsReducer,
  theme: themeReducer,
});

export default rootReducer;
