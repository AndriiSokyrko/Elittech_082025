import type {Shop} from "./shop.ts";

export interface Category {
    id: number;
    name: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
export interface InfoCategory{
    count:number;
    rows:Category[];
}