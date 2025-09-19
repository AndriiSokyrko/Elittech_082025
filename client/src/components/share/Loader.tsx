import React from 'react';
import { Box, CircularProgress } from "@mui/material";

export const Loader: Rect.FC =()=> {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
}
