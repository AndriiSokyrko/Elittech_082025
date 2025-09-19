import React, { useState } from 'react';
import { generateSeats } from '../../helper/seatsGenerator';
import { useDispatch } from 'react-redux';
import { addTicket } from '../../store/slices/cartSlice';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {Box} from "@mui/material";
import type {InfoSeat} from "../../types/flight.ts";

const SeatGrid: React.FC = ({onHandle}) => {
    const dispatch = useDispatch();
    const [seats, setSeats] = useState<Seat[]>(() => generateSeats(10, 6));
    const handleClick = (info: InfoSeat) =>{
        onHandle(info)
    }
    const handleSelectSeat = (seat: InfoSeat) => {
        if (seat.status === 'occupied') return;
        if (seat.status === 'selected') {
            setSeats((prev) =>
                prev.map((s) =>
                    s.id === seat.id ? { ...s, status: 'free' } : s
                )
            );
        }
        if (seat.status === 'free') {
            setSeats((prev) =>
                prev.map((s) =>
                    s.id === seat.id ? { ...s, status: 'selected' } : s
                )
            );
            // dispatch(addTicket({ id: seat.id, row: seat.row, seatNumber: seat.seatNumber }));
            handleClick({ id: seat.id, row: seat.row, seatNumber: seat.seatNumber })
        }
    };

    return (
        <Box sx={{ display: 'inline-block', gap: '8px' }}>
            {Array.from({ length: 10 }, (_, rowIndex) => (
                <Box key={rowIndex} style={{ display: 'flex', gap: '6px' }}>
                    {seats
                        .filter((s) => s.row === rowIndex + 1)
                        .map((seat) => (
                            <EventSeatIcon
                                key={seat.id}
                                onClick={() => handleSelectSeat(seat)}
                                style={{
                                    fontSize: '32px',
                                    cursor: seat.status === 'occupied' ? 'not-allowed' : 'pointer',
                                    color:
                                        seat.status === 'occupied'
                                            ? 'red'
                                            : seat.status === 'selected'
                                                ? 'blue'
                                                : 'green',
                                }}
                            />
                        ))}
                </Box>
            ))}
        </Box>
    );
};

export default SeatGrid;
