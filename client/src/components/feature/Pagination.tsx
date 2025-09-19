import React from 'react';
import {Pagination, Stack} from '@mui/material';
import {useSelector} from 'react-redux';
import {type RootState} from '../../store/store';
import {type Flight} from "../../types/flight";

interface FlowerPaginationProps {
    page: number;
    onChange: (page: number) => void;
}
export const FlightPagination: React.FC<FlowerPaginationProps> = ({ page, onChange }) => {
    const flights: Flight[] = useSelector((state: RootState) => state.flights.list);
    const {itemsPerPage} = useSelector((state: RootState) => state.flights);
    const totalPages = Math.ceil(flights.length / itemsPerPage);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onChange(value);
    };

    return (
        <Stack
            spacing={2}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mt: '20px',
                width: '100%',
            }}
        >
            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                color="primary"
                siblingCount={0}
                boundaryCount={3}
                sx={{ background: 'white', borderRadius: '4px', width: '40%' }}
            />
        </Stack>
    );
}
