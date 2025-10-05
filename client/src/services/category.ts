import type {Category, InfoCategory} from '../types/category.ts';
import {$host} from "./index.ts";

export const CategoryService = {
    async getAll(): Promise<InfoCategory> {
        const {data} = await $host.get(`api/categories`)
        return data;
    },
    async updateCategoryById(form:FormData): Promise<InfoCategory> {
        const res = Object.fromEntries(form.entries());
        const {data} = await $host.patch(`api/categories/${res.id}`, form)
        return data
    },
    async deleteCategoryById(delId: number): Promise<number> {
        const response = await $host.delete<{ message: string; id: number }>(
            `api/categories/${delId}`
        );
        return response.data.id;
    },
    async createCategory(form:FormData): Promise<Category> {
        const {data} = await $host.post(`api/categories`, form)
        return data
    }
};
