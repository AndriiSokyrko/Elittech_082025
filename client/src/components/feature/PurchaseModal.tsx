// components/PurchaseModal.tsx
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
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import {fetchPurchases, setFlagPurchase} from '../../store/slices/purchaseSlice';

interface PurchaseModalProps {
    open: boolean;
    onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { purchases, loading, error } = useSelector((state: RootState) => state.purchase);
    const {user} = useSelector((state: RootState) => state.user);
    const handleClose =()=>{
        onClose()
    }
    useEffect(() => {
        if (open) {
            dispatch(fetchPurchases(user.id));
        }
    }, [dispatch, open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                История покупок
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {loading && <Typography>Загрузка...</Typography>}
                {error && <Typography color="error">Ошибка: {error}</Typography>}
                {!loading && !error && purchases.length === 0 && (
                    <Typography>История покупок пуста.</Typography>
                )}

                {!loading && !error && purchases.map((purchase) => (
                    <Accordion key={purchase.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 500 }}>
                                    Покупка #{purchase.id}
                                </Typography>
                                <Typography>{purchase.totalPrice} ₴</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="subtitle2" gutterBottom>
                                Данные покупателя:
                            </Typography>
                            <Typography>Имя: {user?.name}</Typography>
                            <Typography>Email: {user?.email}</Typography>
                            <Typography>Телефон: {user?.phone}</Typography>
                            <Typography>Адрес: {user?.address}</Typography>

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
            </DialogContent>
        </Dialog>
    );
};

export default PurchaseModal;
