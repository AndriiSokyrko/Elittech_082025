import { configureStore } from '@reduxjs/toolkit';
import cartSlice from "./slices/cartSlice.ts";
import authSlice from "../store/slices/authSlice";
import flightSlice from "./slices/flightSlice";
import cartFlowerSlice from "./slices/cartFlowerSlice.ts";
import flowerSlice from "./slices/flowerSlice.ts";
import purchaseSlice from "./slices/purchaseSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        flights: flightSlice,
        user: authSlice,
        flower: flowerSlice,
        cartFlower: cartFlowerSlice,
        purchase:purchaseSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;