export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface InfoCategory{
    count:number;
    rows:Category[];
}