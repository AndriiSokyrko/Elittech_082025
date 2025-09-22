import React from 'react';
import { Box } from "@mui/material";

interface FooterProps {
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    );
};

export default Footer;