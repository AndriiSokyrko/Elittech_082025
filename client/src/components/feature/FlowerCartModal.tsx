import React, {useEffect, useState} from 'react';
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
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../../store/store';
import {clearCart} from '../../store/slices/cartSlice';
import type {InfoOrder} from "../../types/flower.ts";
import {removeOrder} from "../../store/slices/cartFlowerSlice.ts";
import type {User} from "../../types/user.ts";
import {addPurchase} from "../../store/slices/purchaseSlice.ts";
import type {Purchase, PurchaseItem} from "../../types/purchase.ts";
import {getUserById} from "../../services/user.ts";

interface CartModalProps {
    open: boolean;
    onClose: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    overflowY: 'auto',
    borderRadius: 2,
};

const FlowerCartModal: React.FC<CartModalProps> = ({open, onClose}) => {
    const dispatch = useDispatch();
    const orders: InfoOrder[] = useSelector((state: RootState) => state.cartFlower.order);
    const totalAmount = useSelector((state: RootState) => state.cartFlower.totalAmount);

    const {user} = useSelector((state: RootState) => state.user);
    const [name, setName] = useState<string>( user.name||"");
    const [email, setEmail] = useState<string>( user.email||"");
    const [phone, setPhone] = useState<string>( user.phone||"");
    const [address, setAddress] = useState<string>( user.address||"");

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleDelete = (id: string) => {
        dispatch(removeOrder(id));
    };

    const handleCheckout = () => {
      const items:PurchaseItem[] = orders.map(t=> {
          return {
              name: t.flower.name, quantity: t.quantity, price: t.flower.price,shopName:t.flower.shop?.name
          }
      })
        const infoClient:Purchase= {userName:name,email,phone,address,totalPrice:totalAmount,orders:items }
        dispatch(addPurchase(infoClient))
        dispatch(clearCart());
        onClose(true)
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="cart-modal-title">
            <Box sx={style}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'grey'}}>
                    <Typography id="cart-modal-title" variant="h6" component="h2">
                        Корзина заказов
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Divider sx={{my: 2}}/>

                {orders.length === 0 ? (
                    <Typography variant="body1" sx={{color: 'grey'}}>Корзина пуста</Typography>
                ) : (
                    <Box sx={{display: 'flex', gap: 4}}>
                        {/* Левый блок — форма для данных пользователя */}
                        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Данные покупателя</Typography>
                            <TextField
                                label="Имя"
                                value={user.name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Email"
                                value={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Телефон"
                                value={user.phone}
                                onChange={(e) => setPhone(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Адрес"
                                value={user.address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <Button variant="contained" onClick={handleCheckout} sx={{mt: 1}}>
                                Оплатить
                            </Button>
                        </Box>

                        {/* Правый блок — список заказов */}
                        <Box sx={{flex: 1}}>
                            <List sx={{color: 'grey'}}>
                                {orders.map((item: InfoOrder) => (
                                    <ListItem key={item.flower.id} disableGutters>
                                        <ListItemText
                                            primary={`${item.flower.name} × 1`}
                                            secondary={`Цена: $${item.flower.price}`}
                                        />
                                        <ListItemText
                                            primary={`Количество: ${item.quantity}`}
                                            secondary={`Сумма: $${(item.flower.price * (item.quantity || 1)).toFixed(2)}`}
                                        />
                                        <IconButton onClick={() => handleDelete(item.id)} size="small">
                                            <CloseIcon/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{my: 2}}/>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: "grey"}}>
                                Итого: ${(totalAmount ?? 0).toFixed(2)}
                            </Typography>
                            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={handleClear}>
                                    Очистить корзину
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default FlowerCartModal;
