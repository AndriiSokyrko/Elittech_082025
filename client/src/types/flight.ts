export interface TicketInfo {
    total: number;
    remaining: number;
}

export interface Flight {
    id: string;
    airline: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    terminal: string;
    gate: string;
    tickets: TicketInfo;
}

export interface FlightState {
    originList: Flight[];
    list: Flight[];
    current: Flight | null;
    loading: boolean;
    error: string | null;
    itemsPerPage:number;
    currentSetFlights:number;
}

export interface InfoSeat {
    id: string;
    row: number;
    seatNumber: number;
    status?: 'free' | 'occupied' | 'selected';
}
export interface InfoTicket {
    id:string;
    flight: Flight;
    info?: InfoSeat;
    quantity?:number;
}