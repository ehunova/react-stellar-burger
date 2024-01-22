import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    details: null,
};

const viewingIngredientSlice = createSlice({
    name: 'viewingIngredient',
    initialState,
    reducers: {
        addViewingIngredient: (state, action) => {
            state.details = action.payload;
        },
        removeViewingIngredient: (state, action) => {
            return initialState;
        },
    }
})

export default viewingIngredientSlice.reducer;
export const {addViewingIngredient, removeViewingIngredient} = viewingIngredientSlice.actions;