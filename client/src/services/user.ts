import {$authHost, $host} from "./index.js";
import {jwtDecode } from "jwt-decode";
import type {Token} from "../types/user.ts";

export const registration = async (payload: { email:string, password:string }) => {
    const {data} = await $host.post('api/user/registration',payload)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (payload: { email:string, password:string }):Promise<Token> => {
    const {data} = await $host.post('api/user/login', payload)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const resetPassword = async (payload: { email:string, password:string }) => {
    const {data} = await $authHost.patch('api/user/reset', payload)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async (token:string) => {
    const {data} = await $authHost.post('api/user/auth',{token})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const checkPassword = async  (payload: { email:string, password:string }) => {
    const {data} = await $authHost.post('api/user/check',payload)
    return jwtDecode(data.token)
}


export const createAdmin = async (user) =>{
    const {data} = await $host.post('api/user/admin', user)
    return data
}

export const getUsers = async (payload:{page:number, limit:number}) =>{
    const {data} = await $authHost.get('api/user/',{params: payload})
    return data
}
export const deleteUser = async (id:number) =>{
    const {data} = await $authHost.delete(`api/user/${id}`)
    return data
}
export const getUserById = async (id:number) => {
    const {data} = await $authHost.get(`api/user/${id}`)
    return data
}
export const updateUser = async (formData:FormData) => {
    const {data} = await $authHost.patch(`api/user/update/`, formData,
         {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
         }
    )
    return data
}