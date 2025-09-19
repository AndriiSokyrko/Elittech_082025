import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    CardMedia,
} from '@mui/material';
import type {Flower} from '../../types/Flower';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {addOrder} from "../../store/slices/cartFlowerSlice.ts";

interface FlowerDetailsModalProps {
    open: boolean;
    onClose: () => void;
    flower: Flower | null;
}

export const FlowerDetailsModal: React.FC<FlowerDetailsModalProps> = ({open, onClose, flower}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState<number>(1);

    if (!flower) return null;

    const handleAddToCart = () => {
        const id = uuidv4();
        dispatch(addOrder({id, flower, quantity}));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Детали цветка</DialogTitle>

            <DialogContent dividers>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    {/* Картинка цветка */}
                    {flower.imageUrl && (
                        <CardMedia
                            component="img"
                            image={flower.imageUrl}
                            alt={flower.name}
                            sx={{width: '100%', height: 250, objectFit: 'cover', borderRadius: 2}}
                        />
                    )}

                    <Typography variant="h6">{flower.name}</Typography>
                    <Typography color="text.secondary">
                        {flower.category?.name ? `Категория: ${flower.category.name}` : 'Без категории'}
                    </Typography>
                    <Typography color="text.secondary">
                        {flower.shop?.name ? `Магазин: ${flower.shop.name}` : 'Неизвестно'}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        Цена: {flower.price} грн
                    </Typography>
                    <Typography color="text.secondary">
                        В наличии: {flower.stock}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Typography>Количество:</Typography>
                        <TextField
                            type="number"
                            size="small"
                            value={quantity}
                            inputProps={{min: 1, max: flower.stock}}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val >= 1 && val <= flower.stock) setQuantity(val);
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={flower.stock === 0}
                >
                    Добавить в корзину
                </Button>
            </DialogActions>

        </Dialog>
    );
};