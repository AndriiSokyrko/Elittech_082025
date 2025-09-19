import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorDisplayProps {
    message: string;
    title?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, title = 'Ошибка' }) => {
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Box>
    );
};

export default ErrorDisplay;
