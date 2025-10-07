import React from "react";
import { Box } from "@mui/material";
import AppAside from "../feature/AppAside.tsx";
import MainDish from "../feature/MainDish.tsx";
import { useSelector } from "react-redux";
import type {RootState} from "../../store/store.ts";

const TwoSectionsGrid: React.FC = () => {
    const {flowers, favorite, loading, error,flagFav} = useSelector((state: RootState) => state.flower);

    return (
        <Box
            sx={{display:"grid", gridTemplateColumns:"2fr 6fr"}}
        >
            <AppAside/>
            <MainDish flowers={flagFav?favorite:flowers}   loading={loading} error={error}/>
        </Box>
    );
};

export default TwoSectionsGrid;
