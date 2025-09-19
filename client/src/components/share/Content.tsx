import React from 'react';
import { Box } from '@mui/material';

interface ContentProps {
    children: React.ReactNode; // чтобы можно было передавать JSX внутрь
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Box sx={{display: 'flex', flex:1, flexWrap: 'wrap', alignItems: 'center', justifyContent:'center',width: '100vw', mt:'100px'}}>
            {children}
        </Box>
    );
};

export default Content;