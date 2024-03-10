import {createSlice} from "@reduxjs/toolkit";
import {TFullOrder} from "../../utils/types";

type TInitialState = {
    wsConnected: boolean;
    orders: TFullOrder[] | [];
    total: number | null;
    totalToday: number | null;
    error?: Event;
}

export const initialState: TInitialState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null,
}

const wsSlice = createSlice({
    name: "wsOrders",
    initialState,
    reducers: {
        wsOpen: (state) => {
            state.wsConnected = true;
            state.error = undefined;
        },
        wsClose: () => {
            return initialState;
        },
        wsError: (state, action) => {
            state.wsConnected = false;
            state.error = action.payload;
        },
        wsRequest: (state, action) => {
            state.wsConnected = true;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.error = undefined;
        },
    },
})

export default wsSlice.reducer;
export const {wsOpen, wsClose, wsError, wsRequest} = wsSlice.actions;