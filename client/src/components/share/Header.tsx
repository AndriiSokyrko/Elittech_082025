import React from 'react';
import { Box } from "@mui/material";

interface HeaderProps {
    // Comp: React.ComponentType;

    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <Box>
            {/*<Comp openCart={onOpen}/>*/}
            {children}
        </Box>
    );
};

export default Header;