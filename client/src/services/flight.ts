import { $host_flights } from "./index";
import type { Flight } from "../types/flight";

export const fetchFlights = async (): Promise<Flight[]> => {
    const { data } = await $host_flights.get<Flight[]>('');
    return data;
};

export const fetchFlightById = async (id: string): Promise<Flight> => {
    const { data } = await $host.get<Flight>(`/flights/${id}`);
    return data;
};

// export const editCompany = async (company) => {
//     const res = Object.fromEntries(company.entries());
//     const {data} = await $authHost.patch(`api/company/${res.id}`, company)
//     return data
// }
// export const createCompany = async (company) => {
//     const {data} = await $authHost.post('api/company', company)
//     return data
// }
// export const deleteCompany = async (id) => {
//     const {data} = await $authHost.delete(`api/company/${id}`)
//     return data
// }



