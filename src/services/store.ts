import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import burgerConstructorReducer from "./reducers/burger-constructor-slice";
import orderReducer from "./reducers/order-slice";
import orderInfoReducer from './reducers/order-info-slice';
import authReducer from "./reducers/auth-slice";
import wsReducer, {wsClose, wsError, wsOpen, wsRequest} from "./reducers/ws-slice";
import wsUserReducer, {wsUserClose, wsUserError, wsUserOpen, wsUserRequest} from "./reducers/ws-user-slice";
import {wsMiddleware} from "./middleware/ws-middleware";
import {wsEnd, wsStart} from "./actions/actions";

const wsOrdersAction = {
    wsStart: wsStart,
    wsEnd: wsEnd,
    wsOpen: wsOpen,
    wsClose: wsClose,
    wsError: wsError,
    wsRequest: wsRequest,
}
const wsUserOrdersAction = {
    wsStart: wsStart,
    wsEnd: wsEnd,
    wsOpen: wsUserOpen,
    wsClose: wsUserClose,
    wsError: wsUserError,
    wsRequest: wsUserRequest,
}

const ordersMiddleware = wsMiddleware(wsOrdersAction);
const userOrdersMiddleware = wsMiddleware(wsUserOrdersAction);

export const store = configureStore({
    reducer: {
        ingredientsList: ingredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        orderInfo: orderInfoReducer,
        auth: authReducer,
        wsOrders: wsReducer,
        wsUserOrders: wsUserReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ordersMiddleware, userOrdersMiddleware)
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;