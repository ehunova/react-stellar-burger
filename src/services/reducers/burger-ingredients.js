import {REMOVE_FILLING_ELEMENT, SET_BUN, SET_FILLING} from "../constants/constants";

const burgerConstructorState = {
    bun: null,
    filling: [],
};

export const burgerConstructorReducer = (state = burgerConstructorState, action) => {
    switch (action.type) {
        case SET_BUN: {
            return {...state, bun: action.payload}
        }
        case SET_FILLING: {
            return {...state, filling: action.payload}
        }
        case REMOVE_FILLING_ELEMENT: {
            return {...state, filling: state.filling.filter((ingredient, index) => index !== action.payload)}
        }
        default: {
            return state;
        }
    }
}