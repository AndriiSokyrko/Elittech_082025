import {
    FLOWERS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, ROOT_ROUTE
} from "./utils/consts";
import Auth from "./components/core/Auth";
import AppRoot from "./components/core/AppRoot";
import Main from "./components/core/Main.tsx";

export const adminRoutes = [

    {
        path:FLOWERS_ROUTE,
        Component: Main
    },

]
export const publicRoutes = [
    {
        path: ROOT_ROUTE,
        Component: AppRoot
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]