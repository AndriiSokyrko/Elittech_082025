import './App.css';
import React, {useState} from 'react';
import AppBar from './components/feature/AppBar';
import Header from './components/share/Header';
import IconNavigation from './components/feature/IconNavigation';
import Footer from './components/share/Footer';
import AppRouter from "./components/core/AppRouter";
import Box from "@mui/material/Box";
import AccountModal from "./components/feature/AccountModal.tsx";
import type {User} from "./types/user.ts";
import PurchaseModal from "./components/feature/PurchaseModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store/store.ts";
import {setFlagPurchase} from "./store/slices/purchaseSlice.ts";

function App() {
    const dispatch= useDispatch<AppDispatch>()
    const {flagPurchase} = useSelector((state: RootState) => state.purchase);

    const [open, setOpen] = useState(false);
    const handleSave = (data: User) => {
        setOpen(false);
    };
    const handleAccount = (flag: boolean) => {
        setOpen(flag);

    }

    return (
        <Box sx={{display: "flex", width: "inherit"}}>
            <Header>
                <AppBar onAccount={handleAccount}/>
                <AccountModal open={open} onClose={() => setOpen(false)} onSave={handleSave}/>
            </Header>
            <AppRouter/>
            <Footer>
                <IconNavigation/>
                <PurchaseModal  open={flagPurchase?flagPurchase:false} onClose={() => dispatch(setFlagPurchase())}>
                    <AppRouter/>
                </PurchaseModal>
            </Footer>

        </Box>
    );
}

export default App;
