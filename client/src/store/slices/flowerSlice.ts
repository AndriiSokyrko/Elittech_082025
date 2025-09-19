import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {Flower, InfoFlower, InfoOrder} from '../../types/Flower';
import type {InfoCategory} from '../../types/Category';
import type {InfoShop} from '../../types/Shop';
import {FlowerService} from "../../services/flower.ts";

export const fetchFlowers = createAsyncThunk('data/fetchFlowers', async () => {
    const res:InfoFlower = await FlowerService.fetchFlowers();
    return res;
});

export const fetchCategories = createAsyncThunk('data/fetchCategories', async () => {
    const res:InfoCategory = await FlowerService.fetchCategories();
    return res;
});

export const fetchShops = createAsyncThunk('data/fetchShops', async () => {
    const res:InfoShop = await FlowerService.fetchShops();
    return res;
});

interface DataState {
    flowers: Flower[];
    favorite: Flower[];
    originFlowers: InfoFlower;
    categories: InfoCategory;
    shops: InfoShop;
    loading: boolean;
    error: string | null;
    current: null;
    itemsPerPage:number;
    currentSetFlowers:number;
    totalFlowers:number;
}

const initialState: DataState = {
    flowers: [],
    favorite:[],
    originFlowers:{ count:0, rows: []},
    categories: { count:0, rows: []},
    shops: { count:0, rows: []},
    loading: false,
    error: null,
    current: null,
    itemsPerPage:4,
    currentSetFlowers:1,
    totalFlowers:1
};

export const flowerSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFlav:(state, action: PayloadAction<string>)=>{
            let fav:Flower =state.flowers.find(f=>f.id===action.payload)
            state.favorite= [...state.favorite, fav]
            const temp:Flower[] = state.flowers.filter(f=>f.id!== action.payload)
            state.flowers=[fav, ...temp]
        },
        clearCurrentFlight: (state) => {
            state.current = null;
        },
        updateStateFlower: (state, action: PayloadAction<Flower[]>) => {
            state.flowers= action.payload;
            state.currentSetFlowers = 1;
            state.totalFlowers= state.flowers.length
        },

        sortStateFlowersByDate: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const order = action.payload;
            state.flowers = [...state.flowers].sort((a, b) => {
                const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                return order === 'asc' ? diff : -diff;
            });
        },
        sortStateFlowersByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const order = action.payload;
            state.flowers = [...state.flowers].sort((a, b) => {
                const diff = a.price - b.price;
                return order === 'asc' ? diff : -diff;
            });
        },
    },
    extraReducers: (builder) => {
        // Flowers
        builder.addCase(fetchFlowers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFlowers.fulfilled, (state, action: PayloadAction<InfoFlower>) => {
            state.loading = false;
            state.flowers = action.payload.rows;
            state.originFlowers = action.payload;
            state.totalFlowers= action.payload.count
        });
        builder.addCase(fetchFlowers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке цветов';
        });

        // Categories
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<InfoCategory>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке категорий';
        });

        // Shops
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
    }
});

export const {updateStateFlower,sortStateFlowersByPrice,sortStateFlowersByDate ,setFlav} = flowerSlice.actions;
export default flowerSlice.reducer;
