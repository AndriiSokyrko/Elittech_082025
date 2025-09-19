import type {InfoSeat} from "../types/flight.ts";


export const generateSeats = (rows: number, seatsPerRow: number): InfoSeat[] => {
    const seats: InfoSeat[] = [];
    for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            seats.push({
                id: `${row}-${seat}`,
                row,
                seatNumber: seat,
                status: Math.random() < 0.2 ? 'occupied' : 'free', // 20% зайнятих
            });
        }
    }
    return seats;
};
