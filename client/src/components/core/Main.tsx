import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import AppAside from "../feature/AppAside.tsx";
import MainDish from "../feature/MainDish.tsx";
import { useSelector } from "react-redux";
import type {RootState} from "../../store/store.ts";

const TwoSectionsGrid: React.FC = () => {
    const {flowers, favorite,  itemsPerPage,loading, error,flagFav} = useSelector((state: RootState) => state.flower);

    return (
        <Box
            display="flex"
            width="100vw"
            height="100vh"
        >
            <Box
                width="25%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="black"
            >
                <AppAside/>
            </Box>

            <Box
                width="75%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="black"
            >
                <MainDish flowers={flagFav?favorite:flowers} itemsPerPage={itemsPerPage} loading={loading} error={error}/>

            </Box>
        </Box>
    );
};

export default TwoSectionsGrid;
