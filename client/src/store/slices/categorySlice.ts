import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {InfoCategory, Category} from "../../types/category.ts";
import {CategoryService} from "../../services/category.ts";

export const fetchCategories = createAsyncThunk('data/fetchCategorys', async () => {
    const res:InfoCategory = await CategoryService.getAll();
    return res;
});
export const updateCategoryById = createAsyncThunk('data/updateCategory',
    async (form: FormData) => {
        const res:InfoCategory = await CategoryService.updateCategoryById(form);
        return res;
    });
export const deleteCategoryById = createAsyncThunk('data/deleteCategory',
    async (id: number) => {
        const res:number = await CategoryService.deleteCategoryById(id);
        return res;
    });
export const createCategory = createAsyncThunk('data/createCategory',
    async (form: FormData) => {
        const res:InfoCategory = await CategoryService.createCategory(form);
        return res;
    });

interface CategoryState {
    categories:  InfoCategory;
    loading: boolean;
    error: string | null;
}
const initialState: CategoryState = {
    categories: { count:0, rows: []},
    loading: false,
    error: null,
};
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateCategory(state,action:PayloadAction){
            state.categories=action.payload
        },


    },
    extraReducers: (builder) => {
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
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(updateCategoryById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
            state.loading = false;
            state.categories.rows = state.categories.rows.map((_:Category)=>_.id===action.payload.id? action.payload:_)

        });
        builder.addCase(updateCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            state.loading = false;
            state.categories.rows.push(action.payload)

        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
        builder.addCase(deleteCategoryById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCategoryById.fulfilled, (state, action: PayloadAction< number>) => {
            state.loading = false;
            state.categories.rows = state.categories.rows.filter(cat=>cat.id!==Number(action.payload))
            state.categories.count -=1;
        });
        builder.addCase(deleteCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка при загрузке магазинов';
        });
    }
});

export const {updateCategory} = categorySlice.actions;
export default categorySlice.reducer;