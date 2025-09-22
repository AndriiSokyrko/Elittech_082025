// store/slices/purchaseSlice.ts
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PurchaseService} from "../../services/purchases";
import type {Purchase} from "../../types/purchase";
import type {InfoFlower} from "../../types/flower.ts";
import {FlowerService} from "../../services/flower.ts";
import {flowerSlice} from "./flowerSlice.ts";

interface PurchaseState {
    purchases: Purchase[];
    loading: boolean;
    error: string | null;
    flagPurchase:boolean;

}

const initialState: PurchaseState = {
    purchases: [],
    loading: false,
    error: null,
    flagPurchase:false,
};

export const addPurchase = createAsyncThunk(
    "purchase/addPurchases",
    async (purchase: Purchase) => {
        const res = await PurchaseService.addPurchase(purchase);
        return res;
    }
);
export const fetchPurchases = createAsyncThunk(
    "purchase/fetchPurchases",
    async (id:number) => {
        const res = await PurchaseService.getPurchase(id);
        return res;
    }
);

const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        setFlagPurchase:(state)=>{
            state.flagPurchase= state.flagPurchase===false? true: false;
        },
    },
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
            })
            .addCase(fetchPurchases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases = action.payload;
            })
            .addCase(fetchPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {setFlagPurchase} = purchaseSlice.actions;

export default purchaseSlice.reducer;
