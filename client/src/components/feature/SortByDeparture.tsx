import React, { useState } from "react";
import { Button } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { sortStateFlightsByPrice, sortStateFlightsByDateDeparture } from "../../store/slices/flightSlice.ts";

interface SortByDepartureProps {
    field: "departure" | "price";
    onSort?: (order: "asc" | "desc") => void;
}

const SortByDeparture: React.FC<SortByDepartureProps> = ({ field, onSort }) => {
    const dispatch = useDispatch();

    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const handleClick = () => {
        const newOrder: "asc" | "desc" = order === "asc" ? "desc" : "asc";
        setOrder(newOrder);

        if (field === "departure") {
            dispatch(sortStateFlightsByDateDeparture(newOrder));
        } else {
            dispatch(sortStateFlightsByPrice(newOrder));
        }

        // Вызов колбэка, если нужен
        onSort?.(newOrder);
    };

    return (
        <Button
            variant="outlined"
            onClick={handleClick}
            startIcon={order === "asc" ? <ArrowUpward /> : <ArrowDownward />}
        >
            {field === "departure" ? `Дата (${order === "asc" ? "↑" : "↓"})` : `${field} (${order === "asc" ? "↑" : "↓"})`}
        </Button>
    );
};

export default SortByDeparture;
