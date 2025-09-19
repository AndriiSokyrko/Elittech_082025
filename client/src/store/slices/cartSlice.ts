// src/store/cartSlice.ts
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Flight, InfoSeat, InfoTicket} from "../../types/flight.ts";
import {act} from "react";

interface CartState {
    id_user?:number;
    tickets: InfoTicket[];
    totalQuantity: number;
    totalAmount: number;
    showModalCart:boolean;
}

const loadStateFromLocalStorage = (): CartState => {
    try {
        const savedState = localStorage.getItem("cart");
        if (savedState) {
            return JSON.parse(savedState) as CartState;
        }
    } catch (err) {
        console.error("Ошибка при чтении корзины из localStorage", err);
    }
    return {id_user:0,tickets: [],totalQuantity:0, totalAmount: 0, showModalCart: false};
};
const saveStateToLocalStorage = (state: CartState) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state));
    } catch (err) {
        console.error("Ошибка при сохранении корзины в localStorage", err);
    }
};
const initialState: CartState = loadStateFromLocalStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setStatusModalCart:(state, action: PayloadAction<boolean>) => {
            state.showModalCart = action.payload
            saveStateToLocalStorage(state);

        },
        addTicket: (state, action: PayloadAction<InfoTicket|null>) => {
            const ticket = { ...action.payload, quantity: action.payload.quantity || 1 };

            state.tickets = [...(state.tickets || []), ticket];

            state.totalQuantity += ticket.quantity;
            state.totalAmount += ticket.quantity * ticket.flight.price;

            saveStateToLocalStorage(state);
            state.showModalCart=false
            saveStateToLocalStorage(state);
        },
        removeTicket: (state, action: PayloadAction<string>) => {
            const ticket = state.tickets.find((t) => t.id === action.payload);
            if (ticket) {
                state.totalAmount -= ticket.flight.price * ticket.quantity;
                state.totalQuantity -= ticket.quantity;
            }
            state.tickets = state.tickets.filter((t) => t.id !== action.payload);
            saveStateToLocalStorage(state);
        },

        clearCart: (state) => {
            state.tickets = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem('cart')
        },
    }
});

export const {addTicket, removeTicket, updateQuantity, clearCart,setStatusModalCart } = cartSlice.actions;
export default cartSlice.reducer;
