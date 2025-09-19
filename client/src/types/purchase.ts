export interface PurchaseItem {
    id?: number;
    name: string;
    quantity: number;
    price: number;
    shopName: string;
}

export interface Purchase {
    id?: number;
    userName: string;
    email: string;
    phone: string;
    address: string;
    totalPrice: number;
    orders: PurchaseItem[];

}
