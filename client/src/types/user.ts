export interface Token {
    id:number;
    email:string;
    role:string;
    aid:number;
    exp:number;
}
export interface User {
    id:number;
    email:string;
    password:string;
    role:string;
    userInfo:UserInfo
}
export interface UserInfo {
    id?:number;
    name?: string;
    address?:string;
    description?:string;
    phone?: string;
    password?: string;
    avatarFile?: string;
}