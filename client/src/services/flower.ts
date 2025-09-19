import {$host, $host_flights} from "./index.ts";
import type {Flower} from "../../types/flower.ts";
import type {Flight} from "../types/flight.ts";
import type {Category, InfoCategory} from "../types/category.ts";
import type {InfoShop, Shop} from "../types/shop.ts";
import type {InfoFlower} from "../types/flower.ts";


export const FlowerService = {

    async fetchFlowers(): Promise<InfoFlower> {
        const {data} = await $host.get<InfoFlower>('/api/flowers');
        return data;
    },

    async fetchCategories(): Promise<InfoCategory> {
        const {data} = await $host.get<InfoCategory[]>('/api/flowers/categories');
        return data;
    },

    async fetchShops(): Promise<InfoShop> {
        const {data} = await $host.get<InfoShop>('/api/flowers/shops');
        return data
    }

};
