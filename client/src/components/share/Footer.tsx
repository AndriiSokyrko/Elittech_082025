import React from 'react';
import { Box } from "@mui/material";

interface FooterProps {
    Comp: React.ComponentType;
}

const Footer: React.FC<FooterProps> = ({ comp:Comp }) => {
    return (
        <Box>
            <Comp />
        </Box>
    );
};

export default Footer;