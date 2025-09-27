import React, {useEffect, useState} from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Box,
    IconButton,
    Stack, Container, Button
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {updateStateFlower} from "../../store/slices/flowerSlice.ts";
import type {Flower} from "../../types/flower.ts";
import {deleteShopById, fetchShops} from "../../store/slices/shopSlice.ts";
import ShopEdit from "./ShopEdit.tsx";
import {useNavigate} from "react-router-dom";
import {FLOWERS_ROUTE} from "../../utils/consts.ts";
import FlowerFromShop from "./FlowerFromShop.tsx";

const ShopsListEdit: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const {shops} = useSelector((state: RootState) => state.shop);
    const {flowers, loading, error} = useSelector((state: RootState) => state.flower);
    const {originFlowers} = useSelector((state: RootState) => state.flower);

    const [open, setOpen] = useState<boolean>(false)
    const [nameForm, setNameForm] = useState<string>("Update")

    const navigate= useNavigate()
    const handleAddFlower= (shopId:number)=>{

    }
    const handleSetFlower=(name:string)=>{
            const data = originFlowers.rows.filter((flower: Flower) =>
                flower.shop?.name.toLowerCase().includes(name.toLowerCase())
            );
            dispatch(updateStateFlower(data));

    }
    const handleEditShop = (shopId: number) => {
        setSelectedIndex(shopId)
        setNameForm("Update")
        setOpen(true)
    };
    const handleCreate = () => {
        // setSelectedIndex(shopId)
        setNameForm("Create")
        setOpen(true)
    };

    const handleDelete = (shopId: number) => {
        dispatch(deleteShopById(shopId))
    };
    const handleReturn = () => {
        navigate(FLOWERS_ROUTE)
    };

    useEffect(() => {
        dispatch(fetchShops());
    }, [dispatch]);

    return (
        <Container
            sx={{
                width: "100vw",
                height: "100vh",
                flexWrap:"wrap",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                paddingTop: "160px",     // вместо marginTop
                paddingLeft: "50px",     // вместо marginLeft
                alignItems: "start",     // выравнивание по вертикали внутри grid
                // justifyItems: "center",  // выравнивание элементов по горизонтали
            }}
        >
            <List sx={{display: "flex", flexDirection: "column", border:"2px solid blue", padding:"20px" , borderRadius:"8px"}}>
                {shops.rows.map((item, index) => (
                    <ListItem key={item.id} disablePadding
                              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() => handleSetFlower(item.name)}
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

                        <Stack direction="row" spacing={1}>
                            <IconButton edge="end" color="primary" onClick={() => handleAddFlower(item.id)}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton edge="end" color="primary" onClick={() => handleEditShop(item.id)}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton edge="end" color="error" onClick={() => handleDelete(item.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    </ListItem>

                ))}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}}>
                    <Button variant="contained" onClick={handleCreate}>
                        Create
                    </Button>

                    <Button variant="contained" onClick={handleReturn}>
                        Return
                    </Button>
                </Box>
            </List>
            <List sx={{ border:"2px solid blue", padding:"20px" , borderRadius:"8px"}} >
                <FlowerFromShop flowers={flowers} loading={loading} error={error}/>
            </List>
            <ShopEdit nameForm={nameForm} id={selectedIndex} open={open} onClose={() => setOpen(false)}/>
        </Container>
    );
};

export default ShopsListEdit;
