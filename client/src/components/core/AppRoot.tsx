import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, FLOWERS_ROUTE} from "../../utils/consts";
import {useDispatch} from "react-redux";
import {getAccountById} from "../../store/slices/authSlice";
import {jwtDecode as jwt_decode} from 'jwt-decode';
import type {Token} from "../../types/user.ts";
import type {AppDispatch} from "../../store/store.ts";

const AppRoot: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const {id} = jwt_decode<Token>(token)
            if (id) {
                dispatch(getAccountById(id))
            }
        }
        const path = token ? FLOWERS_ROUTE : LOGIN_ROUTE
        navigate(path)
    }, []);
    return null;
};


export default AppRoot;