import { Shop } from '../types';

const API_BASE = '/api/frontend';

export const ShopService = {
    async getAll(): Promise<Shop[]> {
        const response = await fetch(`${API_BASE}/shops`);
        if (!response.ok) throw new Error('Ошибка при получении магазинов');
        const data: Shop[] = await response.json();
        return data;
    }
};
