import { configureStore } from "@reduxjs/toolkit";
import cartReduser from "./features/cart/cartSlice";
import authApi from "./features/auth/authApi";
import authReduser from "./features/auth/authSlice";
import productApi from "./features/products/productApi";
import reviewApi from "./features/reviews/reviewsApi";
import statsApi from "./features/stats/statsApi";
import orderApi from "./features/orders/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartReduser,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReduser,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware
    ),
});
