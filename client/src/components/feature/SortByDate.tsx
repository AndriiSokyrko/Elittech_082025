import React, {useState} from "react";
import {Button} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {sortStateFlowersByDate, sortStateFlowersByPrice} from "../../store/slices/flowerSlice.ts";

interface SortByDepartureProps {
    field: "createdAt" | "price";
    onSort?: (order: "asc" | "desc") => void;
}

const SortByDeparture: React.FC<SortByDepartureProps> = ({field, onSort}) => {
    const dispatch = useDispatch();

    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const handleClick = () => {
        const newOrder: "asc" | "desc" = order === "asc" ? "desc" : "asc";
        setOrder(newOrder);

        if (field === "createdAt") {
            dispatch(sortStateFlowersByDate(newOrder));
        } else {
            dispatch(sortStateFlowersByPrice(newOrder));
        }

        // Вызов колбэка, если нужен
        onSort?.(newOrder);
    };

    return (
        <Button
            variant="outlined"
            onClick={handleClick}
            startIcon={order === "asc" ? <ArrowUpward/> : <ArrowDownward/>}
        >
            {field === "createdAt" ? `Дата (${order === "asc" ? "↑" : "↓"})` : `${field} (${order === "asc" ? "↑" : "↓"})`}
        </Button>
    );
};

export default SortByDeparture;
