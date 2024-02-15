import {createAction} from "@reduxjs/toolkit";

export const wsStart = createAction<string, "WS_CONNECT">("WS_CONNECT");
export const wsEnd = createAction("WS_DISCONNECT");