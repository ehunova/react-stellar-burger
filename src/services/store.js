import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import burgerConstructorReducer from "./reducers/burger-constructor-slice";
import viewingIngredientReducer from "./reducers/viewing-ingredient-slice";
import orderReducer from "./reducers/order-slice";
import authReducer from "./reducers/auth-slice";

export const store = configureStore({
    reducer: {
        ingredientsList: ingredientsReducer,
        viewingIngredient: viewingIngredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        auth: authReducer,
    },
});