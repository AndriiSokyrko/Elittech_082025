import {$authHost, $host} from "./index.js";

export const getRoles = async () =>{
    const {data} = await $host.get('api/role/')
    return data
}