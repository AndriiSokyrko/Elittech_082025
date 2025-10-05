import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    Button,  Modal,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {createShop,  updateShopById} from "../../store/slices/shopSlice.ts";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



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
type PropsData= {
    type:string;
    shopId?:number;
}
type Props={
    payload: PropsData;
    open:boolean;
    onClose:()=>void;
}
const ShopEdit: React.FC<Props> = ({payload,open, onClose}) => {
    const {shops} = useSelector((state: RootState) => state.shop);

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    useEffect(() => {
        if(!shops.rows) return
        if(payload.type==="create" ) {
            setName("")
            setAddress("")
            setPhone("")
            return;
        }

        const _shops = shops.rows.find(shop => shop.id === payload.shopId)
        if(_shops) {
            setName(_shops.name)
            setAddress(_shops.address)
            setPhone(_shops.phone)
        }
    }, [payload.shopId]);
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
        formData.append("id", String(payload.shopId));
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("address", address);

        if (payload.type === "update") {
            dispatch(updateShopById(formData));

        } else {
            dispatch(createShop(formData));

        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{position: 'absolute', top: 8, right: 8}}
                >
                    <CloseIcon/>
                </IconButton>
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
                        {payload.type}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ShopEdit;
