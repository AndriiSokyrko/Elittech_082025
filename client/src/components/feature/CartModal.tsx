import React from 'react';
import {
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {clearCart, removeTicket} from '../../store/slices/cartSlice';
import type {InfoTicket} from "../../types/flight.ts";
import {grey} from "@mui/material/colors";

interface CartModalProps {
    open: boolean;
    onClose: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    overflowY: 'auto',
    borderRadius: 2,
};

const CartModal: React.FC<CartModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const orders:InfoTicket[] = useSelector((state: RootState) => state.cart.tickets);
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const handleClear = () => {
        dispatch(clearCart());
    };
    const handleClose=()=>{
        onClose()
    }
    const handleDelete =( id:string)=>{
        dispatch(removeTicket(id));
    }
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="cart-modal-title">
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color:'grey' }}>
                    <Typography id="cart-modal-title" variant="h6" component="h2">
                        Корзина заказов
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {orders.length === 0 ? (
                    <Typography variant="body1" sx={{color:'grey'}}>Корзина пуста</Typography>
                ) : (
                    <>
                        <List sx={{color:'grey'}}>
                            {orders.map((order, ind) => (
                                <ListItem key={order.flight.id} disableGutters>
                                    <ListItemText color={'black'}
                                        primary={`${order.flight.airline} × 1 ticket`}

                                    />
                                    <ListItemText
                                        primary={`${order.flight.from} - ${order.flight.to}`}
                                        secondary={`Цена: $${order.flight.price} `}
                                    />
                                    <ListItemText
                                        primary={`Количество: ${order.quantity}`}
                                        secondary={`Цена: $${order.flight.price*order.quantity} `}
                                    />
                                    {/*<ListItemText*/}
                                    {/*    primary={`Number${order.infoSeatFleight.seatNumber}`}*/}
                                    {/*    secondary={`Row ${order.infoSeatFleight.row}`}*/}
                                    {/*/>*/}
                                    <IconButton onClick={() => handleDelete(order.id)} size="small">
                                        <CloseIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:"grey" }}>
                            Итого: ${(totalAmount ?? 0).toFixed(2)}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleClear}>
                                Очистить корзину
                            </Button>
                            <Button variant="contained" onClick={() => alert('Оплата пока не реализована')}>
                                Оплатить
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default CartModal;
