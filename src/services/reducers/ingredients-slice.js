import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredientsList} from "../../utils/api";

const initialState = {
    ingredients: [],
};

export const fetchIngredients = createAsyncThunk(
    "ingredients/get",
    getIngredientsList
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchIngredients.fulfilled.type, (state, action) => {
                state.ingredients = action.payload.data;
            })
    }
})

export default ingredientsSlice.reducer;