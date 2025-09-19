import React, {useEffect, useState} from 'react';
import FlowerCartModal from "../feature/FlowerCartModal";
import {FlightPagination} from "../feature/Pagination";
import {Loader} from "../share/Loader";
import ErrorDisplay from "../share/ErrorDisplay";
import SortByDeparture from "../feature/SortByDeparture";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store";
import {setStatusModalCart} from "../../store/slices/cartSlice";
import Box from "@mui/material/Box";
import {Container, Pagination} from "@mui/material";
import {fetchFlowers} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";
import {FlowerCard} from "./FlowerCard.tsx";
import {FlowerDetailsModal} from "./FlowerDetailsModal.tsx";
import SortByDate from "./SortByDate.tsx";
import {FlowerPagination} from "./FlowerPagination.tsx";

const MainDish: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {flowers, originFlowers, itemsPerPage,currentSetFlowers, loading, error} = useSelector((state: RootState) => state.flower);
    const {showModalCart} = useSelector((state: RootState) => state.cart);
    const [selectedFlower, setSelectedFlower] = useState<Flower[] | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const handleClose = () => {
        dispatch(setStatusModalCart(false))
    }
    const [page, setPage] = useState(1);
     const currentFlowers: Flower[] = flowers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const handlePageChange = (value: number) => {
        setPage(value);
    };
    const handleOpenDetails = (id: string) => {
        const data = flowers.find(it => it.id === id)
        setSelectedFlower(data);
        setDetailsOpen(true);
    };
    const handleCloseDetails = () => {
        setSelectedFlower(null);
        setDetailsOpen(false);
    };

    useEffect(() => {
        // dispatch(getFlights());
        dispatch(fetchFlowers());
    }, [dispatch]);
    return (
        <Container style={{display: "flex", flexDirection: "column", height: "100vh", marginTop: "250px"}}>
            {loading &&
                <Loader/>
            }
            {error &&
                <ErrorDisplay message="Some thing wrong!"/>
            }
            {
                // <CartModal open={showModalCart} onClose={handleClose}/>
                <FlowerCartModal open={showModalCart} onClose={handleClose}/>
            }

            <FlowerDetailsModal
                open={detailsOpen}
                onClose={handleCloseDetails}
                flower={selectedFlower}
            />
            <Box display="flex" justifyContent="end">
                <SortByDate field={'createdAt'}/>
                <SortByDate field={'price'}/>
            </Box>
            <Box display="flex" justifyContent="end">

                {Array.isArray(currentFlowers) && currentFlowers.map((currentFlower) => (
                    <FlowerCard key={currentFlower.id} flower={currentFlower} onOpenDetails={handleOpenDetails}/>
                ))}

            </Box>

            <FlowerPagination
                page={page}
                onChange={handlePageChange}
            />
        </Container>
    )
};

export default MainDish;