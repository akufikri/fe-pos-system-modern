import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { categoriesSlices } from "./categoriesApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [categoriesSlices.reducerPath]: categoriesSlices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesSlices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
