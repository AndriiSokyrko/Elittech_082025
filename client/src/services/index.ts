import axios from "axios";
import type {AxiosRequestConfig} from "axios";
const $host_flights = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL_FLIGHTS
})
const $host = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

const authInterceptor = (config:AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $host_flights
}
