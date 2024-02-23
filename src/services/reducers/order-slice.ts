import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrder} from "../../utils/api";
import {TOrderNumber} from "../../utils/types";

export const initialState: TOrderNumber = {
    number: 0,
};

export const fetchOrder = createAsyncThunk(
    "order/post",
    createOrder
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOrder.pending, (state, action) => {
                return initialState;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                return action.payload.order;
            })
    }
})

export default orderSlice.reducer;