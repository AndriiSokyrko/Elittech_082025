import React from 'react';
import ItemList from "./ItemList.tsx";
import {Box} from "@mui/material";
import type {Flight} from "../../types/flight.ts";
import ShopsList from "./ShopsList.tsx";

interface AppAsideProps {
    onSelect?: (flight: Flight) => void;
}

const AppAside: React.FC<AppAsideProps> = () => {

    return (
        <Box style={{display: "flex", flexDirection: "column", height: "100vh", marginTop: "250px"}}>
            <ShopsList />
        </Box>
    );
};

export default AppAside;
