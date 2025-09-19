import { Category } from '../types';

const API_BASE = '/api/frontend';

export const CategoryService = {
    async getAll(): Promise<Category[]> {
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) throw new Error('Ошибка при получении категорий');
        const data: Category[] = await response.json();
        return data;
    }
};
