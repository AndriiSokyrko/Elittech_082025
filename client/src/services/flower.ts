import {$host} from "./index.ts";
import type {InfoFlower, Flower} from "../types/flower.ts";


export const FlowerService = {

    async fetchFlowers(): Promise<InfoFlower> {
        const {data} = await $host.get<InfoFlower>('/api/flowers');
        return data;
    },
    async updateFlowerById(form:FormData): Promise<Flower> {
        const res = Object.fromEntries(form.entries());
        const {data} = await $host.patch(`api/flowers/${res.id}`, form)
        return data
    },
    async deleteFlowerById(delId: number): Promise<number> {
        const response = await $host.delete<{ message: string; id: number }>(
            `api/flowers/${delId}`
        );
        return response.data.id;
    },
    async createFlower(form:FormData): Promise<Flower> {
        const {data} = await $host.post(`api/flowers`, form)
        return data
    }

    

};
