export interface User {
    id:string;
    email: string;
    name?: string;
    address?:string;
    description?:string;
    phone?: string;
    password?: string;
    token?: string;
    avatarFile?: string;
}