import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {Flower, InfoFlower} from '../../types/Flower';
import {FlowerService} from "../../services/flower.ts";

export const fetchFlowers = createAsyncThunk('data/fetchFlowers', async () => {
    const res:InfoFlower = await FlowerService.fetchFlowers();
    return res;
});

export const updateFlowerById = createAsyncThunk('data/updateFlower',
    async (form: FormData) => {
        const res: Flower = await FlowerService.updateFlowerById(form);
        return res;
    });
export const deleteFlowerById = createAsyncThunk('data/deleteFlower',
    async (id: number) => {
        const res:number = await FlowerService.deleteFlowerById(id);
        return res;
    });
export const createFlower = createAsyncThunk('data/createFlower',
    async (form: FormData) => {
        const res:Flower = await FlowerService.createFlower(form);
        return res;
    });



interface DataState {
    flowers: Flower[];
    favorite: Flower[];
    originFlowers: InfoFlower;
    // categories: InfoCategory;
    // shops: InfoShop;
    loading: boolean;
    error: string | null;
    current: null;
    itemsPerPage:number;
    currentSetFlowers:number;
    totalFlowers:number;
    flagFav:boolean;
}

const initialState: DataState = {
    flowers: [],
    favorite:[],
    originFlowers:{ count:0, rows: []},
    loading: false,
    error: null,
    current: null,
    itemsPerPage:4,
    currentSetFlowers:1,
    totalFlowers:1,
    flagFav: false,
};

export const flowerSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFlav:(state, action: PayloadAction<string>)=>{
            const fav:Flower =state.flowers.find(f=>f.id===action.payload)
            state.favorite= [...state.favorite, fav]
            const temp:Flower[] = state.flowers.filter(f=>f.id!== action.payload)
            state.flowers=[fav, ...temp]
        },
        setFlagFav:(state)=>{
            state.flagFav= state.flagFav===false? true: false;
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


        builder.addCase(updateFlowerById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateFlowerById.fulfilled, (state, action: PayloadAction<Flower>) => {
            state.loading = false;
            const index = state.flowers.findIndex(flower => flower.id === action.payload.id);
            state.flowers[index]= action.payload
        });
        builder.addCase(updateFlowerById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке категорий';
        });
        builder.addCase(deleteFlowerById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteFlowerById.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.flowers = state.flowers.filter(flower=>flower.id!==action.payload);
            state.originFlowers.rows = state.originFlowers.rows.filter(flower=>flower.id!==Number(action.payload));
        });
        builder.addCase(deleteFlowerById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке категорий';
        });
        builder.addCase(createFlower.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createFlower.fulfilled, (state, action: PayloadAction<Flower>) => {
            state.loading = false;
            state.flowers.push(action.payload);
        });
        builder.addCase(createFlower.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке категорий';
        });



    }
});

export const {updateStateFlower,sortStateFlowersByPrice,sortStateFlowersByDate ,setFlav,setFlagFav} = flowerSlice.actions;
export default flowerSlice.reducer;
