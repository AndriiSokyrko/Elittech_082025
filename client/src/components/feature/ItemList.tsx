import React, {type ChangeEvent, useState} from "react";
import { List, ListItem, ListItemText, ListItemButton, Box } from "@mui/material";
import {debounce} from "../../helper/debaunce.ts";
import type {Flight} from "../../types/flight.ts";
import {updateStateFlights} from "../../store/slices/flightSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";

const ItemList: React.FC = () => {
    const dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const {list, originList} = useSelector((state: RootState) => state.flights);
    const company: Flight[] = originList.reduce((acc, item): Flight[] => {
        const exists: Flight[] = acc.some((f: Flight) => f.airline === item.airline);
        return exists ? acc : [...acc, item];
    }, [])
    const flightNames = company.map(f => `${f.airline}`);
    const debouncedSearch = React.useMemo(
        () =>
            debounce((value: string) => {
                const data = originList.filter((flight: Flight) =>
                    flight.airline.toLowerCase().includes(value.toLowerCase())
                );
                dispatch(updateStateFlights(data));
            }, 500),
        [list, dispatch]
    );
    const handleClick = (item:string) => {
        debouncedSearch(item);
    };
    return (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "black" }}>
            <List>
                {flightNames.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => handleClick(item)}
                            sx={{
                                "&:hover": {
                                    bgcolor: "primary.light",
                                    color: "white",
                                },
                                transition: "0.3s",
                            }}
                        >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ItemList;
