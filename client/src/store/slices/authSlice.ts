import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User} from "../../types/user.ts";
import {jwtDecode as jwt_decode} from 'jwt-decode';
import {updateUser,getUserById} from "../../services/user.ts"
import {$host} from "../../services";
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading:boolean |null;
    error:string|null;
}
export const updateAccount = createAsyncThunk(
    'user/updateAccount', async (payload:FormData) => {
    const res:User = await updateUser(payload);
    return res;
});
export const getAccountById = createAsyncThunk(
    'user/getUserById', async (payload:number) => {
        const res:User = await getUserById(payload);
        return res;
    });
// === Загружаем состояние из localStorage при старте ===
const savedAuth = localStorage.getItem('authState');

const initialState: AuthState = savedAuth
    ? JSON.parse(savedAuth)
    : {
        user: null,
        isAuthenticated: false,
        loading: false,
        error:null,
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registration: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        login: (
            state,
            action: PayloadAction<string>
        ) => {
            state.token = action.payload
            const decoded = jwt_decode<User>(action.payload);
            state.user = {...decoded};
            state.isAuthenticated = true;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // очищаем localStorage
            localStorage.removeItem('authState');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action:PayloadAction<User>) => {
                state.loading = false;
                state.user=action.payload.userInfo;
                state.user.avatarFile= import.meta.env.VITE_APP_API_URL +state.user.avatarFile


            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
           .addCase(getAccountById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccountById.fulfilled, (state, action:PayloadAction<User>) => {
                state.loading = false;
                state.user=action.payload.userInfo;
                state.user.avatarFile= import.meta.env.VITE_APP_API_URL +state.user.avatarFile
            })
            .addCase(getAccountById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { login, logout, registration } = authSlice.actions;
export default authSlice.reducer;
