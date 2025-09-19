import React from 'react';
import {Card, CardContent, CardActions, Typography, Button, Divider, Box} from '@mui/material';
import type {Flight} from '../../types/flight';
import {useDispatch} from "react-redux";
import {addTicket, removeTicket, clearCart,updateQuantity} from "../../store/slices/cartSlice.ts";
import type {Flower} from "../../types/flower.ts";
import type {AppDispatch} from "../../store/store.ts";

interface FlightCardProps {
    flight: Flight;
    onOpenDetails: (id: string) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({flight,onOpenDetails }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleOpenDetails = ()=>{
        onOpenDetails(flight.id)
    }
    return (
        <Card sx={{maxWidth: 400, m: 2, borderRadius: 3, boxShadow: 3}} onClick={handleOpenDetails}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {flight.airline}
                </Typography>

                <Typography color="text.secondary">
                    {flight.from} → {flight.to}
                </Typography>

                <Divider sx={{my: 1}}/>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Departure:</Typography>
                    <Typography variant="body2">
                        {new Date(flight.departureTime).toLocaleString()}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Arrival:</Typography>
                    <Typography variant="body2">
                        {new Date(flight.arrivalTime).toLocaleString()}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Terminal / Gate:</Typography>
                    <Typography variant="body2">
                        {flight.terminal} / {flight.gate}
                    </Typography>
                </Box>

                <Divider sx={{my: 1}}/>

                <Typography variant="h6" color="primary">
                    ${flight.price}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Tickets left: {flight.tickets.remaining} / {flight.tickets.total}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={flight.tickets.remaining === 0}
                >
                    {flight.tickets.remaining > 0 ? 'Book Now' : 'Sold Out'}
                </Button>
            </CardActions>
        </Card>
    );
};
