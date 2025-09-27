import React, {useEffect, useState} from 'react';
import FlowerCartModal from "../feature/FlowerCartModal";
import {Loader} from "../share/Loader";
import ErrorDisplay from "../share/ErrorDisplay";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store";
import {setStatusModalCart} from "../../store/slices/cartSlice";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import {fetchFlowers} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";
import {FlowerCard} from "./FlowerCard.tsx";
import {FlowerDetailsModal} from "./FlowerDetailsModal.tsx";
import SortByDate from "./SortByDate.tsx";
import {FlowerPagination} from "./FlowerPagination.tsx";
import {FlowerCardForChang} from "./FlowerCardForChange.tsx";
import FlowerEdit from "./FlowerEdit.tsx";

interface MainDishProps {
    flowers: Flower[];
    loading:boolean;
    error:string;
}
const FlowerFromShop: React.FC<MainDishProps> = ({flowers,loading, error}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {showModalCart} = useSelector((state: RootState) => state.cart);
    const [selectedFlower, setSelectedFlower] = useState<Flower[] | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const handleClose = () => {
        dispatch(setStatusModalCart(false))
    }
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    const currentFlowers: Flower[] = flowers.length<=(page - 1) * itemsPerPage?
        flowers.slice(
            1,
            itemsPerPage
        )
        :flowers.slice(
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
        dispatch(fetchFlowers());
    }, [dispatch]);


    return (
        <>
            <Box style={{display: "flex", flexDirection: "column", height: "auto"}}>
            {loading &&
                <Loader/>
            }
            {error &&
                <ErrorDisplay message="Some thing wrong!"/>
            }
            {
                <FlowerCartModal open={showModalCart} onClose={handleClose}/>
            }

            <FlowerDetailsModal
                open={detailsOpen}
                onClose={handleCloseDetails}
                flower={selectedFlower}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: `repeat(${itemsPerPage}, 1fr)`,
                        lg: `repeat(${itemsPerPage}, 1fr)`,
                    },
                    gap: 3,
                    mt: 2,
                }}
            >
                {Array.isArray(currentFlowers) &&
                    currentFlowers.map((currentFlower) => (
                        <FlowerCardForChang
                            key={currentFlower.id}
                            flower={currentFlower}
                            onOpenDetails={handleOpenDetails}
                        />
                    ))}
            </Box>

            <FlowerPagination
                page={page}
                onChange={handlePageChange}
                itemsPerPage={itemsPerPage}
            />
        </Box>
            <FlowerEdit nameForm="Update" open={detailsOpen} onClose={() => setDetailsOpen(false)}/>
        </>
    )
};

export default FlowerFromShop;