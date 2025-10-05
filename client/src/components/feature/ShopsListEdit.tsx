import React, {useEffect, useState} from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Box,
    IconButton,
    Stack, Button
} from "@mui/material";
import {Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {deleteShopById, fetchShops} from "../../store/slices/shopSlice.ts";
import {useNavigate} from "react-router-dom";
import {FLOWERS_ROUTE} from "../../utils/consts.ts";
import {fetchCategories} from "../../store/slices/categorySlice.ts";
import type {Flower} from "../../types/flower.ts";
import {fetchFlowers, updateStateFlower} from "../../store/slices/flowerSlice.ts";

type Props = {
    openFormEditShop: (args: { type: string, shopId?: number }) => void;
    openFormEditFlower: (args: { type: string, shopId?: number, flowerId?: number }) => void;
}
const ShopsListEdit: React.FC<Props> = ({openFormEditShop, openFormEditFlower}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const {shops} = useSelector((state: RootState) => state.shop);
    const {originFlowers} = useSelector((state: RootState) => state.flower);


    const navigate = useNavigate()
    const handleAddFlower = (shopId: number) => {
        openFormEditFlower({type: "create", shopId: shopId})
    }
    const handleEditShop = (shopId: number) => {
        openFormEditShop({type: "update", shopId: shopId})
    };
    const handleCreateShop = () => {
        openFormEditShop({type: "create"})
    };

    const handleDeleteShop = (shopId: number) => {
        dispatch(deleteShopById(shopId))
    };
    const handleReturn = () => {
        navigate(FLOWERS_ROUTE)
    };
    const handleSelectShop = (name: string) => {
        const data = originFlowers.rows.filter((flower: Flower) =>
            flower.shop?.name.toLowerCase().includes(name.toLowerCase())
        );
        dispatch(updateStateFlower(data));
    };
    useEffect(() => {
        dispatch(fetchFlowers());
        dispatch(fetchShops());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
            <List sx={{display: "flex", flexDirection: "column", border: "2px solid blue", padding: "20px", borderRadius: "8px", height: "80%", overflowY: "auto"}}>
            {shops.rows.map((shop, index) => (
                <ListItem key={shop.id} disablePadding
                          sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "80%", overflowY: "auto"}}
                          onClick={() => {
                              setSelectedIndex(index)
                              handleSelectShop(shop.name)
                          }}
                >
                    <ListItemButton
                        selected={selectedIndex === index}

                        sx={{
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "white",
                            },
                            transition: "0.3s",
                        }}
                    >
                        <ListItemText primary={shop.name}/>
                    </ListItemButton>

                    <Stack direction="row" spacing={1}>
                        <IconButton edge="end" color="primary" onClick={() => handleAddFlower(shop.id)}>
                            <AddIcon/>
                        </IconButton>
                        <IconButton edge="end" color="primary" onClick={() => handleEditShop(shop.id)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" color="error" onClick={() => handleDeleteShop(shop.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </ListItem>

            ))}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2}}>
                <Button variant="contained" onClick={handleCreateShop}>
                    Create
                </Button>

                <Button variant="contained" onClick={handleReturn}>
                    Return
                </Button>
            </Box>
        </List>
    );
};

export default ShopsListEdit;
