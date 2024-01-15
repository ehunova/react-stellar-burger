import {ADD_VIEWING_INGREDIENT, REMOVE_VIEWING_INGREDIENT} from "../constants/constants";

const viewingIngredientState = null;

export const viewingIngredientReducer = (state = viewingIngredientState, action) => {
    switch (action.type) {
        case ADD_VIEWING_INGREDIENT: {
            return action.payload;
        }
        case REMOVE_VIEWING_INGREDIENT: {
            return viewingIngredientState;
        }
        default: {
            return state;
        }
    }
}