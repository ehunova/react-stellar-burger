import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOrder} from "../../utils/api";

const initialState = {};

export const fetchOrder = createAsyncThunk(
    "order/post",
    createOrder
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchOrder.fulfilled.type, (state, action) => {
                return action.payload.order;
            })
    }
})

export default orderSlice.reducer;