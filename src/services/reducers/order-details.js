import {SET_ORDER} from "../constants/constants";

const order = {};

export const orderReducer = (state = order, action) => {
    switch (action.type) {
        case SET_ORDER: {
            return action.payload
        }
        default: {
            return state;
        }
    }
}