import React, { useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { LOGIN_ROUTE, FLIGHTS_ROUTE} from "../../utils/consts";
import {useDispatch} from "react-redux";
import type {User} from "../../types/user";
import {login} from "../../store/slices/authSlice";

const AppRoot: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const token: string | null =  localStorage.getItem('token')
        if (token) {
            dispatch(login(token))
        }
        const path = token?FLIGHTS_ROUTE:LOGIN_ROUTE
        navigate(path)
    }, []);
    return null;
};



export default AppRoot;