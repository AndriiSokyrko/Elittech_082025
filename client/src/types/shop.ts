
export interface Shop {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
export interface InfoShop{
    count:number;
    rows:Shop[];
}