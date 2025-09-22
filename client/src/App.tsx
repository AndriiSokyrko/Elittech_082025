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

function App() {
    const [open, setOpen] = useState(false);
    const handleSave = (data: User) => {
        // тут ти можеш відправити на бекенд FormData або JSON
        // якщо є avatarFile — зазвичай відсилають multipart/form-data
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
            </Footer>

        </Box>
    );
}

export default App;
