import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemText, ListItemButton, Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {updateStateFlower} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";
import {fetchShops} from "../../store/slices/shopSlice.ts";
import {useNavigate} from "react-router-dom";
import {SHOPLIST_ROUTE} from "../../utils/consts.ts";


const ShopsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const {originFlowers} = useSelector((state: RootState) => state.flower);
    const {shops} = useSelector((state: RootState) => state.shop);
    const handleClick = (name: string) => {
        const data = originFlowers.rows.filter((flower: Flower) =>
            flower.shop?.name.toLowerCase().includes(name.toLowerCase())
        );
        dispatch(updateStateFlower(data));
    };
    const handleAddShop = () => {
        navigate(SHOPLIST_ROUTE)
    }
    const handleClear = () => {
        dispatch(updateStateFlower(originFlowers.rows));
    }
    useEffect(() => {
        dispatch(fetchShops());
    }, [dispatch]);
    return (
        <Box sx={{width: "100%", maxWidth: 360, bgcolor: "black", overflowY: "auto"}}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === shops.rows.length}
                        onClick={handleAddShop}
                        sx={{
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "white",
                            },
                            transition: "0.3s",
                        }}
                    >
                        <ListItemText primary="Admin panel"/>
                    </ListItemButton>
                </ListItem>
                {shops.rows.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => handleClick(item.name)}
                            sx={{
                                "&:hover": {
                                    bgcolor: "primary.light",
                                    color: "white",
                                },
                                transition: "0.3s",
                            }}
                        >
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>

                ))}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === shops.rows.length}
                        onClick={() => handleClear()}
                        sx={{
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "white",
                            },
                            transition: "0.3s",
                        }}
                    >
                        <ListItemText primary="Clear filter"/>
                    </ListItemButton>
                </ListItem>


            </List>
        </Box>
    );
};

export default ShopsList;
