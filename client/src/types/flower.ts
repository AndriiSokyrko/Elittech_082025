import type {Category} from "./category.ts";
import type {Shop} from "./shop.ts";

export interface Flower {
    id: number;
    name: string;
    description:string;
    price: number;
    stock:number
    imageUrl: string;
    categoryId: number;
    shopId: number;
    category?: Category;
    shop?: Shop;
    createdAt: string;
    updatedAt: string;
}
export interface InfoFlower{
    count:number;
    rows:Flower[];
}
export interface InfoOrder {
    id:string;
    flower: Flower ;
    quantity?:number;
    // price: number;
}
