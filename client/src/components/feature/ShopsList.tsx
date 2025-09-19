import React, {type ChangeEvent, useEffect, useState} from "react";
import { List, ListItem, ListItemText, ListItemButton, Box } from "@mui/material";
import {debounce} from "../../helper/debaunce.ts";
import type {Flight} from "../../types/flight.ts";
import {updateStateFlights} from "../../store/slices/flightSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import type {Shop} from "../../types/shop.ts";
import {fetchFlowers, fetchShops, updateStateFlower} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";

const ShopsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const {shops, originFlowers} = useSelector((state: RootState) => state.flower);
    const handleClick = (name:string) => {
        const data = originFlowers.rows.filter((flower: Flower) =>
            flower.shop?.name.toLowerCase().includes(name.toLowerCase())
        );
        dispatch(updateStateFlower(data));
    };
    useEffect(() => {
        dispatch(fetchShops());
    }, [dispatch]);
    return (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "black", overflowY:"auto" }}>
            <List>
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
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ShopsList;
