// store/slices/purchaseSlice.ts
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PurchaseService} from "../../services/purchases";
import type {Purchase} from "../../types/purchase";
import type {InfoFlower} from "../../types/flower.ts";
import {FlowerService} from "../../services/flower.ts";

interface PurchaseState {
    items: Purchase[];
    loading: boolean;
    error: string | null;
}

const initialState: PurchaseState = {
    items: [],
    loading: false,
    error: null,
};

export const addPurchase = createAsyncThunk(
    "purchase/addPurchases",
    async (purchase: Purchase) => {
        const res = await PurchaseService.addPurchase(purchase);
        return res;
    }
);

const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchaseSlice.reducer;
