import React from 'react';
import {Pagination, Stack} from '@mui/material';
import {useSelector} from 'react-redux';
import {type RootState} from '../../store/store';
import type {Flower} from "../../types/flower.ts";

interface FlowerPaginationProps {
    page: number;
    onChange: (page: number) => void;
}
export const FlowerPagination: React.FC<FlowerPaginationProps> = ({ page, onChange }) => {
    const flowers: Flower[] = useSelector((state: RootState) => state.flower);
    const {itemsPerPage, totalFlowers} = useSelector((state: RootState) => state.flower);
    const totalPages = Math.ceil(totalFlowers / itemsPerPage);

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
