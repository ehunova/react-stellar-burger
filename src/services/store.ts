import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import burgerConstructorReducer from "./reducers/burger-constructor-slice";
import orderReducer from "./reducers/order-slice";
import authReducer from "./reducers/auth-slice";

export const store = configureStore({
    reducer: {
        ingredientsList: ingredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;