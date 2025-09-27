import type {InfoShop, Shop} from '../types/shop';
import {$host} from "./index.ts";

export const ShopService = {
    async getAll(): Promise<InfoShop> {
        const {data} = await $host.get(`api/shops`)
        return data;
    },
    async updateShopById(form:FormData): Promise<InfoShop> {
            const res = Object.fromEntries(form.entries());
            const {data} = await $host.patch(`api/shops/${res.id}`, form)
            return data
    },
    async deleteShopById(delId: number): Promise<number> {
        const response = await $host.delete<{ message: string; id: number }>(
            `api/shops/${delId}`
        );
        return response.data.id;
    },
    async createShop(form:FormData): Promise<Shop> {
            const {data} = await $host.post(`api/shops`, form)
            return data
    }
};
