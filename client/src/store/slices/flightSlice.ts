import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Flight, FlightState} from "../../types/flight.ts";
import {fetchFlightById, fetchFlights} from "../../services/flight.ts";

export const getFlights = createAsyncThunk<Flight[], void, { rejectValue: string }>(
    'flights/getFlights',
    async (_, thunkAPI) => {
        try {
            return await fetchFlights();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Не удалось загрузить рейсы');
        }
    }
);

export const getFlightById = createAsyncThunk<Flight, string, { rejectValue: string }>(
    'flights/getFlightById',
    async (id, thunkAPI) => {
        try {
            return await fetchFlightById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Не удалось загрузить рейс');
        }
    }
);

const initialState: FlightState = {
    originList: [],
    list: [],
    current: null,
    loading: false,
    error: null,
    itemsPerPage:4,
    currentSetFlights:1
};

const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        clearCurrentFlight: (state) => {
            state.current = null;
        },
        updateStateFlights: (state, action: PayloadAction<Flight[]>) => {
            state.list = action.payload;
            state.currentSetFlights =1;
        },

        sortStateFlightsByDateDeparture: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const order = action.payload;
            state.list = [...state.list].sort((a, b) => {
                const diff = new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
                return order === 'asc' ? diff : -diff;
            });
        },
        sortStateFlightsByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const order = action.payload;
            state.list = [...state.list].sort((a, b) => {
                const diff = a.price - b.price;
                return order === 'asc' ? diff : -diff;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.originList = action.payload;
            })
            .addCase(getFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка загрузки рейсов';
            })
            .addCase(getFlightById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFlightById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(getFlightById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка загрузки рейса';
            });
    },
});

export const { sortStateFlightsByPrice, sortStateFlightsByDateDeparture,clearCurrentFlight, updateStateFlights } =
    flightSlice.actions;

export default flightSlice.reducer;
