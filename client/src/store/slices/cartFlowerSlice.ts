// src/store/cartSlice.ts
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Flight, InfoSeat, InfoTicket} from "../../types/flight.ts";
import {act} from "react";
import type {InfoOrder} from "../../types/flower.ts";

interface CartFlowerState {
    id_user?:number;
    order: InfoOrder[];
    totalQuantity: number;
    totalAmount: number;
    showModalCart:boolean;
}

const loadStateFromLocalStorage = (): CartFlowerState => {
    try {
        const savedState = localStorage.getItem("cart");
        if (savedState) {
            return JSON.parse(savedState) as CartFlowerState;
        }
    } catch (err) {
        console.error("Ошибка при чтении корзины из localStorage", err);
    }
    return {id_user:0,order: [],totalQuantity:0, totalAmount: 0, showModalCart: false};
};
const saveStateToLocalStorage = (state: CartState) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state));
    } catch (err) {
        console.error("Ошибка при сохранении корзины в localStorage", err);
    }
};
const initialState: CartFlowerState = loadStateFromLocalStorage();

const cartFlowerSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setStatusModalCart:(state, action: PayloadAction<boolean>) => {
            state.showModalCart = action.payload
            saveStateToLocalStorage(state);

        },
        addOrder: (state, action: PayloadAction<InfoOrder|null>) => {
            const info = { ...action.payload, quantity: action.payload.quantity || 1 };
            state.order = [...(state.order || []), info];
            console.log(info)
            state.totalQuantity += info.quantity;
            state.totalAmount += info.quantity * info.flower.price;

            saveStateToLocalStorage(state);
            state.showModalCart=false
            saveStateToLocalStorage(state);
        },
        removeOrder: (state, action: PayloadAction<string>) => {

            const info:InfoOrder = state.order.find((t) => t.id === action.payload);
            if (info) {
                state.totalAmount -= info.flower.price * info.quantity;
                state.totalQuantity -= info.quantity;
            }
            state.order = state.order.filter((t) => t.id !== action.payload);
            saveStateToLocalStorage(state);
        },

        clearCart: (state) => {
            state.order = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem('cart')
        },
    }
});

export const {addOrder, removeOrder, updateQuantity, clearCart,setStatusModalCart } = cartFlowerSlice.actions;
export default cartFlowerSlice.reducer;
