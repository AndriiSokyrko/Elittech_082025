import type {Purchase} from "../types/purchase.ts";
import {$host} from "./index.ts";

export const PurchaseService = {
    async addPurchase(purchase: Purchase): Promise<Purchase> {
        const {data} = await $host.post<Purchase>('/api/purchases', purchase);
        if (!data) throw new Error('Ошибка при сохранении покупки');
        return data;
    },

    async getUserPurchase(): Promise<Purchase[]> {
        const {data} = await $host.post<Purchase[]>('/api/purchases/my');
        if (!data) throw new Error('Ошибка при получении покупок');
        return data;
    }
};
