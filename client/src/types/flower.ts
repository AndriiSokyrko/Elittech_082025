import type { Category } from './Category';
import type { Shop } from './Shop';

export interface Flower {
    id: number;
    name: string;
    price: number;
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
    price: number;
}
