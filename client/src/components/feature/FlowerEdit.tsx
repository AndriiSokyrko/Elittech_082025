import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Modal, Avatar, Stack, Typography,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import type {Shop} from '../../types/shop.ts';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import type {Category} from "../../types/category.ts";
import {createFlower} from "../../store/slices/flowerSlice.ts";

type Props={
    type:string;
    shopId?:number;
    flowerId?:number;
}
interface AddFlowerFormProps {
    payload:Props
    open: boolean;
    onClose: () => void;
}

const FlowerEdit: React.FC<AddFlowerFormProps> = ({payload, open, onClose}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {flowers} = useSelector((state: RootState) => state.flower);
    const {shops} = useSelector((state: RootState) => state.shop);
    const {categories} = useSelector((state: RootState) => state.category);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [shopId, setShopId] = useState<number>(  1);
    const [categoryId, setCategoryId] = useState<number >(1);
    const [avatarFile, setAvatarFile] = useState<File|null >(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const handleClearAvatar = () => {
        setAvatarFile(null);
        setAvatarUrl(null);
    };
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('id', String(payload.flowerId));
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', String(price));
        formData.append('stock', String(stock));
        formData.append('shopId', String(payload.shopId));
        formData.append('categoryId', String(categoryId));
        if (avatarFile) formData.append('avatarFile', avatarFile);

        dispatch(createFlower(formData));
        onClose();
    };
    useEffect(() => {
        if(payload.shopId){
             setShopId(payload.shopId)
        }
        if(payload.type==="update"){
            const _flower = flowers.find(flower=> flower.id===payload.flowerId)
            if(_flower){
                setName(_flower.name)
                setDescription(_flower.description)
                setPrice(_flower.price)
                setStock((_flower.stock))
                setAvatarUrl(_flower.imageUrl)
                setCategoryId(_flower.categoryId)
                setShopId(_flower.shopId)
            }
        }
    }, [payload]);
    return (

        <Modal open={open} onClose={onClose} aria-labelledby="cart-modal-title">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 520,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    // overflowY: 'auto'
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{position: 'absolute', top: 4, right: 4}}
                >
                    <CloseIcon/>
                </IconButton>

                <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required/>
                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    multiline
                    minRows={3}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(parseFloat(e.target.value))}
                />
                <TextField
                    label="Stock"
                    type="number"
                    value={stock}
                    onChange={e => setStock(parseInt(e.target.value))}
                />
                <FormControl>
                    <InputLabel>Shop</InputLabel>
                    <Select value={payload.shopId} onChange={e => setShopId(Number(e.target.value))}
                            required disabled={payload.type==="create"}>
                        {shops.rows.map((shop: Shop) => (
                            <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} required>
                        {categories.rows.map((category: Category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{margin:"30px 0"}} >
                    <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            src={avatarUrl|| undefined}
                            sx={{ width: 96, height: 96 }}
                        />
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Button variant="outlined" component="label" size="small">
                                Load
                                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                            </Button>
                            <Button variant="text" size="small" onClick={handleClearAvatar}>
                                Clear
                            </Button>
                        </Stack>

                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                            Підтримуються зображення — JPEG, PNG. Менше 2MB рекомендовано.
                        </Typography>
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {payload.type}
                    </Button>

                </Box>
            </Box>
        </Modal>

    );
};

export default FlowerEdit;
