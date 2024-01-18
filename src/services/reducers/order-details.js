import {SET_ORDER_NUMBER} from "../constants/constants";

const orderNumber = {
    number: null,
};

export const orderNumberReducer = (state = orderNumber, action) => {
    switch (action.type) {
        case SET_ORDER_NUMBER: {
            return {...state, number: action.payload}
        }
        default: {
            return state;
        }
    }
}