import React, {useEffect, useState} from "react";
import ShopsListEdit from "../feature/ShopsListEdit.tsx";
import {Container} from "@mui/material";
import ShopEdit from "../feature/ShopEdit.tsx";
import FlowerEdit from "../feature/FlowerEdit.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import FlowerListEdit from "../feature/FlowerListEdit.tsx";
import type {Flower} from "../../types/flower.ts";
import {updateStateFlower} from "../../store/slices/flowerSlice.ts";
type Props={
    type:string;
    shopId?:number;
    flowerId?:number;
}
const AdminPanel:React.FC=()=>{
    const dispatch= useDispatch<AppDispatch>()
    const {originFlowers, flowers, loading, error} = useSelector((state: RootState) =>state.flower )
    const [openFormEditShop,setOpenFormEditShop]= useState<boolean>(false)
    const [dataEditShop,setDataEditShop]= useState<Props>({type:"create"})
    const [openFormEditFlower,setOpenFormEditFlower]= useState<boolean>(false)
    const [dataEditFlower,setDataEditFlower]= useState<Props>({type:"create"})
const handleOpenFormEditShop = (payload:Props)=>{
    setDataEditShop(payload)
    setOpenFormEditShop(true)
}
const handleOpenFormEditFlower = (payload:Props)=>{
    setDataEditFlower(payload)
    setOpenFormEditFlower(true)
}
    useEffect(() => {
        const data = originFlowers.rows.filter((flower: Flower) =>
            flower.shop?.id=== originFlowers.rows[0].id
        );
        console.log(data)
        dispatch(updateStateFlower(data));
    }, []);
    return(
        <Container
            sx={{
                width: "100%",
                height: "100vh",
                flexWrap:"wrap",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                paddingTop: "160px",     // вместо marginTop
                paddingLeft: "50px",     // вместо marginLeft
                alignItems: "start",     // выравнивание по вертикали внутри grid
                // justifyItems: "center",  // выравнивание элементов по горизонтали
                background:"black"
            }}
        >
            <ShopsListEdit openFormEditShop={handleOpenFormEditShop} openFormEditFlower={handleOpenFormEditFlower}/>
            <FlowerListEdit flowers={flowers} loading={loading} error={error} editFormFlower={handleOpenFormEditFlower}/>
            <ShopEdit payload={dataEditShop} open={openFormEditShop} onClose={() => setOpenFormEditShop(false)}/>
            <FlowerEdit payload={dataEditFlower} open={openFormEditFlower} onClose={() => setOpenFormEditFlower(false)}/>

        </Container>

    )
}
export default AdminPanel