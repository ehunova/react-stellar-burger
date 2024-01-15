import {ingredientsReducer} from "./ingredients-list";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
})