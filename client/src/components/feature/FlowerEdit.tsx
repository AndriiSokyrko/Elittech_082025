import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
     Modal,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store.ts';
import type { Shop } from '../../types/shop.ts';
// import type { Category } from '../../types/category.ts';

interface AddFlowerFormProps {
    nameForm:"Update" |"Create";
    open:boolean;
    onClose: () => void;
}

const FlowerEdit: React.FC<AddFlowerFormProps> = ({ nameForm, open,onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { shops } = useSelector((state: RootState) => state.shop);
    // const { categories } = useSelector((state: RootState) => state.category);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [shopId, setShopId] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (!name || !shopId || !categoryId) {
            alert('Name, Shop and Category are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', String(price));
        formData.append('stock', String(stock));
        formData.append('shopId', String(shopId));
        formData.append('categoryId', String(categoryId));
        if (imageFile) formData.append('image', imageFile);

        // dispatch(createFlower(formData));
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="cart-modal-title">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, width: 400 }}>
                <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />
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
                    <Select value={shopId} onChange={e => setShopId(Number(e.target.value))} required>
                        {shops.rows.map((shop: Shop) => (
                            <MenuItem key={shop.id} value={shop.id}>{shop.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    {/*<Select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} required>*/}
                    {/*    {categories.rows.map((cat: Category) => (*/}
                    {/*        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>*/}
                    {/*    ))}*/}
                    {/*</Select>*/}
                </FormControl>
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {nameForm}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default FlowerEdit;
