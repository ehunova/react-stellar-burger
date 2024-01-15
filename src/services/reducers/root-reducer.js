import {ingredientsReducer} from "./ingredients-list";
import {combineReducers} from "redux";
import {viewingIngredientReducer} from "./viewing-ingridient";

export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    viewingIngredient: viewingIngredientReducer,
})