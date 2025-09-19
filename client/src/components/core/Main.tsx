import React from "react";
import { Box } from "@mui/material";
import AppAside from "../feature/AppAside.tsx";
import MainDish from "../feature/MainDish.tsx";

const TwoSectionsGrid: React.FC = () => {
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
                <MainDish />

            </Box>
        </Box>
    );
};

export default TwoSectionsGrid;
