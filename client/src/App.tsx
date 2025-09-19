import './App.css';
import React from 'react';
import AppBar from './components/feature/AppBar';
import Header from './components/share/Header';
import IconNavigation from './components/feature/IconNavigation';
import Footer from './components/share/Footer';
import AppRouter from "./components/core/AppRouter";
import Box from "@mui/material/Box";

function App() {
    return (
        <Box sx={{display:"flex", width:"inherit"}}>
            <Header comp={AppBar} />
                <AppRouter/>
            <Footer comp={IconNavigation}/>

        </Box>
    );
}

export default App;
