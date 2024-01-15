import {compose, createStore} from "redux";
import {rootReducer} from "./reducers/root-reducer";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers();

export const store = createStore(rootReducer, enhancer);