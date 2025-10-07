import React, {useEffect, useMemo, useState} from 'react';
import {Loader} from "../share/Loader";
import ErrorDisplay from "../share/ErrorDisplay";
import {  useSelector} from "react-redux";
import type { RootState} from "../../store/store";
import Box from "@mui/material/Box";
import {FlowerPagination} from "./FlowerPagination.tsx";
import {FlowerCardForEdit} from "./FlowerCardForEdit.tsx";
import List from "@mui/material/List";

type Props = {
    type: string;
    shopId?: number;
    flowerId?: number;
}

interface MainDishProps {
    editFormFlower: (args: Props) => void;
}

const FlowerListEdit: React.FC<MainDishProps> = ({  editFormFlower}) => {
    const { flowers, loading, error} = useSelector((state: RootState) =>state.flower )
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const currentFlowers = useMemo(() => {
        return flowers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [flowers, page, itemsPerPage]);

    useEffect(() => {
        if(window.innerWidth<=1024) setItemsPerPage(2)
        const maxPage = Math.ceil(flowers.length / itemsPerPage);
        if (page > maxPage) {
            setPage(maxPage === 0 ? 1 : maxPage);
        }
    }, [flowers, itemsPerPage]);



    const handlePageChange = (value: number) => {
        setPage(value);
    };
    const handleEditFormFlower = (args:Props)=>{
        editFormFlower(args)
    }

    return (
        <List sx={{display: "flex", flexDirection: "column", border: "2px solid blue", padding: "20px", borderRadius: "8px", height: "80%", overflowY: "auto"}}>
                {loading &&
                    <Loader/>
                }
                {error &&
                    <ErrorDisplay message="Some thing wrong!"/>
                }

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
                            <FlowerCardForEdit
                                key={currentFlower.id}
                                flower={currentFlower}
                                onOpenEditForm={handleEditFormFlower}
                            />
                        ))}
                </Box>

                <FlowerPagination
                    page={page}
                    onChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                />
        </List>
    )
};

export default FlowerListEdit;