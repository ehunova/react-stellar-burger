import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWsAction = {
    wsStart: ActionCreatorWithPayload<string>;
    wsEnd: ActionCreatorWithoutPayload;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<any>;
    wsRequest: ActionCreatorWithPayload<any>;
}

export const wsMiddleware = (wsActions: TWsAction): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return next => action => {
            const { dispatch } = store;
            const { wsStart, wsEnd, wsOpen, wsClose, wsError, wsRequest } = wsActions;

            if (wsStart.match(action)) {
                console.log('connect');
                socket = new WebSocket(action.payload);
            }

            if (wsEnd.match(action)) {
                console.log('disconnect');
                socket?.close();
                dispatch(wsClose());
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen());
                };

                socket.onerror = event => {
                    console.log('error')
                    dispatch(wsError(event));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (!parsedData.success) {
                        dispatch(wsError(parsedData.message));

                        return
                    }

                    dispatch(wsRequest(parsedData));
                };
                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(wsError(event.code.toString()));
                    }
                    console.log('close')
                    dispatch(wsClose());
                };
            }

            next(action);
        }
    }) as Middleware;
}