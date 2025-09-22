import type {Purchase} from "../types/purchase.ts";
import {$host} from "./index.ts";

export const PurchaseService = {
    async addPurchase(purchase: Purchase): Promise<Purchase> {
        const {data} = await $host.post<Purchase>('/api/purchases', purchase);
        if (!data) throw new Error('Ошибка при сохранении покупки');
        return data;
    },

    async getPurchase(id:number): Promise<Purchase[]> {
        const {data} = await $host.get<Purchase[]>(`/api/purchases/${id}`);
        if (!data) throw new Error('Ошибка при получении покупок');
        return data;
    }
};
