import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getOrderInfo} from "../../utils/api";
import {TOrderInfo} from "../../utils/types";

type TInitialState = {
    info: TOrderInfo | null;
}

const initialState: TInitialState = {
    info: null,
};

export const fetchOrderInfo = createAsyncThunk(
    "orderInfo/get",
    getOrderInfo
)

const orderInfoSlice = createSlice({
    name: 'orderInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOrderInfo.fulfilled, (state, action) => {
                state.info = action.payload.orders[0] ?? null;
            })
    }
})

export default orderInfoSlice.reducer;

