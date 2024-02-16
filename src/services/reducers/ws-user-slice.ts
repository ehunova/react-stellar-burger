import {createSlice} from "@reduxjs/toolkit";
import {TFullOrder} from "../../utils/types";

type TInitialState = {
    wsConnected: boolean;
    orders: TFullOrder[];
    error?: Event;
}

const initialState: TInitialState = {
    wsConnected: false,
    orders: [],
}

const wsUserSlice = createSlice({
    name: "wsUserOrders",
    initialState,
    reducers: {
        wsUserOpen: (state) => {
            state.wsConnected = true;
            state.error = undefined;
        },
        wsUserClose: () => {
            return initialState;
        },
        wsUserError: (state, action) => {
            state.wsConnected = false;
            state.error = action.payload;
        },
        wsUserRequest: (state, action) => {
            state.wsConnected = true;
            state.orders = action.payload.orders;
            state.error = undefined;
        },
    },
})

export default wsUserSlice.reducer;
export const {wsUserOpen, wsUserClose, wsUserError, wsUserRequest} = wsUserSlice.actions;