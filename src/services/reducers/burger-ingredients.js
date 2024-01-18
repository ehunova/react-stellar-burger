import {
    REMOVE_FILLING_ELEMENT,
    SET_BUN,
    ADD_FILLING,
    MOVE_FILLING_ELEMENT,
    CLEAR_CONSTRUCTOR
} from "../constants/constants";

const burgerConstructorState = {
    bun: null,
    filling: [],
};

export const burgerConstructorReducer = (state = burgerConstructorState, action) => {
    switch (action.type) {
        case SET_BUN: {
            return {...state, bun: action.payload}
        }
        case ADD_FILLING: {
            return {...state, filling: [...state.filling, action.payload]}
        }
        case REMOVE_FILLING_ELEMENT: {
            state.filling.splice(action.payload, 1);
            return {...state, filling: state.filling}
        }
        case MOVE_FILLING_ELEMENT: {
            const {indexFrom, indexTo, ingredient} = action.payload;

            state.filling.splice(indexFrom, 1);
            state.filling.splice(indexTo, 0, ingredient);
            return {...state, filling: state.filling}
        }
        case CLEAR_CONSTRUCTOR: {
            return burgerConstructorState;
        }
        default: {
            return state;
        }
    }
}