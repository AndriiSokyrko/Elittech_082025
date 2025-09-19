import React from 'react';
import { Box } from "@mui/material";

interface HeaderProps {
    Comp: React.ComponentType;
}

const Header: React.FC<HeaderProps> = ({ comp:Comp, onOpen }) => {
    return (
        <Box>
            <Comp openCart={onOpen}/>
        </Box>
    );
};

export default Header;