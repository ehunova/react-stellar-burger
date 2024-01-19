import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    bun: null,
    filling: [],
};

const burgerConstructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setBun: (state, action) => {
            state.bun = action.payload;
        },
        addFilling: (state, action) => {
            state.filling.push(action.payload);
        },
        removeFillingElement: (state, action) => {
            state.filling.splice(action.payload, 1);
        },
        moveFillingElement: (state, action) => {
            const {indexFrom, indexTo, ingredient} = action.payload;
            state.filling.splice(indexFrom, 1);
            state.filling.splice(indexTo, 0, ingredient);
        },
        clearConstructor: (state, action) => {
            return initialState;
        },
    }
})

export default burgerConstructorSlice.reducer;
export const {setBun, addFilling, removeFillingElement, moveFillingElement, clearConstructor} = burgerConstructorSlice.actions;