// components/PurchaseHistory.tsx
import React, { useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchPurchases } from '../store/slices/purchaseSlice'; // thunk для получения покупок

const PurchaseHistory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { purchases } = useSelector((state: RootState) => state.purchase);

    useEffect(() => {
        dispatch(fetchPurchases());
    }, [dispatch]);

    if (!purchases || purchases.length === 0) {
        return <Typography sx={{ mt: 2 }}>История покупок пуста.</Typography>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            {purchases.map((purchase) => (
                <Accordion key={purchase.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 500 }}>
                                Покупка #{purchase.id}
                            </Typography>
                            <Typography>
                                {purchase.totalPrice} ₴
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" gutterBottom>
                            Данные покупателя:
                        </Typography>
                        <Typography>Имя: {purchase.userName}</Typography>
                        <Typography>Email: {purchase.email}</Typography>
                        <Typography>Телефон: {purchase.phone}</Typography>
                        <Typography>Адрес: {purchase.address}</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle2" gutterBottom>
                            Товары:
                        </Typography>
                        <List dense>
                            {purchase.orders?.map((item) => (
                                <ListItem key={item.id}>
                                    <ListItemText
                                        primary={`${item.name} x${item.quantity}`}
                                        secondary={`Цена: ${item.price} ₴${item.shopName ? ` | Магазин: ${item.shopName}` : ''}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default PurchaseHistory;
