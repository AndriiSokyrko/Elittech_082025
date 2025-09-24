import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User} from "../../types/user.ts";
import {jwtDecode as jwt_decode} from 'jwt-decode';
import {updateUser, getUserById} from "../../services/user.ts"
interface AuthState {
    user: User |null;
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

const initialState: AuthState =   {
        user: null,
        isAuthenticated: false,
        loading: false,
        error:null,
        token: ""
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action:PayloadAction<User >) => {
                state.loading = false;
                state.user=action.payload;
                state.user.userInfo.avatarFile= import.meta.env.VITE_APP_API_URL + state.user.userInfo.avatarFile
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
                state.user =action.payload;
                state.token= localStorage.getItem("token")
                state.isAuthenticated=true
                if(state.user.userInfo!==null) {
                    state.user.userInfo.avatarFile = import.meta.env.VITE_APP_API_URL + state.user.userInfo.avatarFile
                }
            })
            .addCase(getAccountById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    },
});

export const {  logout } = authSlice.actions;
export default authSlice.reducer;
