import {
    ADMINPANEL_ROUTE,
    FLOWERS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, ROOT_ROUTE
} from "./utils/consts";
import Auth from "./components/core/Auth";
import AppRoot from "./components/core/AppRoot";
import Main from "./components/core/Main.tsx";
import AdminPanel from "./components/share/AdminPanel.tsx";

export const adminRoutes = [

    {
        path:FLOWERS_ROUTE,
        Component: Main
    },
    {
        path: ADMINPANEL_ROUTE,
        Component: AdminPanel
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