import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {InfoShop, Shop} from "../../types/shop.ts";
import {ShopService} from "../../services/shop.ts";

export const fetchShops = createAsyncThunk('data/fetchShops', async () => {
    const res:InfoShop = await ShopService.getAll();
    return res;
});
export const updateShopById = createAsyncThunk('data/updateShop',
    async (form: FormData) => {
    const res:InfoShop = await ShopService.updateShopById(form);
    return res;
});
export const deleteShopById = createAsyncThunk('data/deleteShop',
    async (id: number) => {
        const res:number = await ShopService.deleteShopById(id);
        return res;
    });
export const createShop = createAsyncThunk('data/createShop',
    async (form: FormData) => {
    const res:InfoShop = await ShopService.createShop(form);
    return res;
});

interface ShopState {
    shops:  InfoShop;
    loading: boolean;
    error: string | null;
}
const initialState: ShopState = {
    shops: { count:0, rows: []},
    loading: false,
    error: null,
};
export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
         updateShop(state,action:PayloadAction){
             state.shops=action.payload
         },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchShops.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchShops.fulfilled, (state, action: PayloadAction<InfoShop>) => {
            state.loading = false;
            state.shops = action.payload;
        });
        builder.addCase(fetchShops.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(updateShopById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateShopById.fulfilled, (state, action: PayloadAction<Shop>) => {
            state.loading = false;
            state.shops.rows = state.shops.rows.map((_:Shop)=>_.id===action.payload.id? action.payload:_)

        });
        builder.addCase(updateShopById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(createShop.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createShop.fulfilled, (state, action: PayloadAction<Shop>) => {
            state.loading = false;
            state.shops.rows.push(action.payload)

        });
        builder.addCase(createShop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(deleteShopById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteShopById.fulfilled, (state, action: PayloadAction< number>) => {
            state.loading = false;
            state.shops.rows = state.shops.rows.filter(shop=>shop.id!==Number(action.payload))
            state.shops.count -=1;
        });
        builder.addCase(deleteShopById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
    }
});

export const {updateShop} = shopSlice.actions;
export default shopSlice.reducer;