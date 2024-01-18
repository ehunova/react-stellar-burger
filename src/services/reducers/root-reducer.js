import {ingredientsReducer} from "./ingredients-list";
import {combineReducers} from "redux";
import {viewingIngredientReducer} from "./viewing-ingridient";
import {burgerConstructorReducer} from "./burger-ingredients";
import {orderNumberReducer} from "./order-details";

export const rootReducer = combineReducers({
    ingredientsList: ingredientsReducer,
    viewingIngredient: viewingIngredientReducer,
    burgerConstructor: burgerConstructorReducer,
    orderNumber: orderNumberReducer,
})