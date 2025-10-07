import React, {useEffect, useState} from 'react';
import {Loader} from "../share/Loader";
import ErrorDisplay from "../share/ErrorDisplay";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import {fetchFlowers} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";
import {FlowerCard} from "./FlowerCard.tsx";
import {FlowerDetailsModal} from "./FlowerDetailsModal.tsx";
import SortByDate from "./SortByDate.tsx";
import {FlowerPagination} from "./FlowerPagination.tsx";

interface MainDishProps {
    flowers: Flower[];
    loading:boolean;
    error:string | null;
}
const MainDish: React.FC<MainDishProps> = ({flowers,loading, error}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedFlower, setSelectedFlower] = useState<Flower  | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

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
    const handleOpenDetails = (id: number) => {
        const data = flowers.find(it => it.id === id)
        if(data) setSelectedFlower(data);
        setDetailsOpen(true);
    };
    const handleCloseDetails = () => {
        setSelectedFlower(null);
        setDetailsOpen(false);
    };

    useEffect(() => {
        dispatch(fetchFlowers());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 600) setItemsPerPage(1);
            else if (width < 900) setItemsPerPage(2);
            else if (width < 1200) setItemsPerPage(4);
            else if (width < 1600) setItemsPerPage(6);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Container style={{display: "flex", flexDirection: "column", height: "100vh", marginTop: "100px"}}>
            {loading &&
                <Loader/>
            }
            {error &&
                <ErrorDisplay message="Some thing wrong!"/>
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
                        <FlowerCard
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
        </Container>
    )
};

export default MainDish;