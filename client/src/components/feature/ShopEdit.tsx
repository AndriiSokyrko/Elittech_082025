import React, {useEffect, useMemo, useState} from 'react';
import {
    Modal,
    Box,
    TextField,
    Button, Container,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {createShop, updateShop, updateShopById} from "../../store/slices/shopSlice.ts";
import styles from "../../App.module.css";
import type {Shop} from "../../types/shop.ts";

interface ShopModalProps {
    id: number;
    nameForm: string;
    open: boolean;
    onClose: () => void;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    maxWidth: '94vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
};

const ShopEdit: React.FC<ShopModalProps> = ({nameForm, id, open, onClose}) => {
    const {shops} = useSelector((state: RootState) => state.shop);

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    useEffect(() => {
        const t = shops.rows.find(shop => shop.id === id)
        setName(t?.name)
        setAddress(t?.address)
        setPhone(t?.phone)
    }, [id]);
    const dispatch = useDispatch<AppDispatch>();
    const validate = (): boolean => {
        const e: { [k: string]: string } = {};
        if (!name.trim()) e.name = 'Імʼя обовʼязкове';
        if (phone && !/^[+\d][\d\s-()]{4,}$/.test(phone)) e.phone = 'Невірний формат телефону';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        const formData: FormData = new FormData();
        formData.append("id", String(id));
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("address", address);

        if (nameForm === "Update") {
            dispatch(updateShopById(formData));

        } else {
            dispatch(createShop(formData));

        }
        onClose();
    };

    return (
        <Container className={open ? styles.show : styles.hide}>
            <Box sx={modalStyle}>
                <TextField
                    label="Назва магазину"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Адреса"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={2}
                />
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}}>
                    <Button onClick={onClose}>Скасувати</Button>
                    <Button variant="contained" onClick={handleSave}>
                        {nameForm}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ShopEdit;
