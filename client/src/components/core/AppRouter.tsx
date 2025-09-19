import React, {useEffect} from 'react';
import {adminRoutes, publicRoutes} from "../../routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store";
import {getFlights} from "../../store/slices/flightSlice.ts";

interface AppRoute {
    path: string;
    Component: React.FC | React.ComponentType;
}

const AppRouter: React.FC = () => {
    const dispatch= useDispatch<AppDispatch>()
    const {isAuthenticated} = useSelector((state: RootState) => state.user);
    const routes = isAuthenticated ? adminRoutes : publicRoutes;

    return (
            <Routes>
                {routes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
                <Route path="*" element={<Navigate to={isAuthenticated ? adminRoutes[0].path : publicRoutes[0].path}/>}/>
            </Routes>
    )
};

export default AppRouter;
