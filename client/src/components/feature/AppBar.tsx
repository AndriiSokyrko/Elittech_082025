import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {debounce} from "../../helper/debaunce.ts";
import {clearCart, setStatusModalCart} from "../../store/slices/cartFlowerSlice";
import {useNavigate} from "react-router-dom";
import {ROOT_ROUTE} from "../../utils/consts"
import {logout} from "../../store/slices/authSlice";
import type {Flower} from "../../types/flower.ts";
import {updateStateFlower} from "../../store/slices/flowerSlice.ts";
import FlowerCartModal from "./FlowerCartModal.tsx";
import {useState} from "react";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
interface PrimarySearchAppBarProps {
    onAccount: (args:boolean) => void; // function prop
}
export default function PrimarySearchAppBar({onAccount}:PrimarySearchAppBarProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {totalAmount, totalQuantity,order} = useSelector((state: RootState) => state.cartFlower);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // const {list, originList} = useSelector((state: RootState) => state.flights);
    const {flowers, originFlowers} = useSelector((state: RootState) => state.flower);

    const [openCart, setOpenCart]= useState<boolean>(false)
    const debouncedSearch = React.useMemo(
        () =>
            debounce((value: string) => {
                const data = originFlowers.rows.filter((flower: Flower) =>
                    flower.name.toLowerCase().includes(value.toLowerCase())||
                    flower.shop?.name.toLowerCase().includes(value.toLowerCase())||
                    flower.category?.name.toLowerCase().includes(value.toLowerCase())
                );
                dispatch(updateStateFlower(data));
            }, 500),
        [flowers, dispatch]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const handelOpenCart = () => {
        dispatch(setStatusModalCart(true))
        setOpenCart(true)
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleModalAccountOpen=()=>{
        onAccount(true)

    }
    const handleExit = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        dispatch(clearCart())
        navigate(ROOT_ROUTE)
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleModalAccountOpen}>My account</MenuItem>
            <MenuItem onClick={handleExit}>Exit</MenuItem>
        </Menu>
    );


    return (
        <>
            <FlowerCartModal order={order} open={openCart} onClose={()=>setOpenCart(false)}/>
            <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" sx={{top: 0, left: 0, right: 0}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        MUI
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            onChange={handleSearch}
                        />
                    </Search>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={0} color="error">
                                <MailIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show notifications"
                            color="inherit"
                            onClick={handelOpenCart}
                        >
                            <Badge badgeContent={totalQuantity} color="error">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box></>
    );
}

