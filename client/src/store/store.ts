import { configureStore } from '@reduxjs/toolkit';
import cartSlice from "./slices/cartSlice.ts";
import authSlice from "../store/slices/authSlice";
import cartFlowerSlice from "./slices/cartFlowerSlice.ts";
import flowerSlice from "./slices/flowerSlice.ts";
import purchaseSlice from "./slices/purchaseSlice.ts";
import shopSlice from "./slices/shopSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: authSlice,
        flower: flowerSlice,
        shop: shopSlice,
        cartFlower: cartFlowerSlice,
        purchase:purchaseSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;