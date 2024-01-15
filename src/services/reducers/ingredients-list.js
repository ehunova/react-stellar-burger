import {GET_INGREDIENTS} from "../constants/constants";

const ingredientsState = [];

export const ingredientsReducer = (state = ingredientsState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return action.payload
        }
        default: {
            return state;
        }
    }
}