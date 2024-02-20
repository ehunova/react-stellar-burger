import wsSlice, {wsClose, wsError, wsOpen, wsRequest} from "./ws-slice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const initialStore = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null
};

const responseWSOrders = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0944",
                "643d69a5c3f7b9001cfa093d"
            ],
            "_id": "65d4eeda97ede0001d05d146",
            "status": "done",
            "number": 34642,
            "name": "Space флюоресцентный традиционный-галактический био-марсианский бургер",
            "createdAt": "2024-02-20T18:26:34.135Z",
            "updatedAt": "2024-02-20T18:26:34.468Z"
        },
        {
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa093d"
            ],
            "_id": "65d4e68097ede0001d05d12b",
            "status": "done",
            "number": 34640,
            "name": "Space флюоресцентный антарианский бургер",
            "createdAt": "2024-02-20T17:50:56.578Z",
            "updatedAt": "2024-02-20T17:50:57.110Z"
        },
    ],
    "total": 34272,
    "totalToday": 48
};

describe("WS Orders slice", () => {
    test("wsOpen action", () => {
        expect(wsSlice(initialStore, wsOpen()))
            .toEqual({
                ...initialStore,
                wsConnected: true,
                error: undefined,
            });
    });
    test("wsError action", () => {
        expect(wsSlice(initialStore, wsError("error")))
            .toEqual({
                ...initialStore,
                wsConnected: false,
                error: "error",
            });
    });
    test("wsRequest action", () => {
        expect(wsSlice(initialStore, wsRequest(responseWSOrders)))
            .toEqual({
                wsConnected: true,
                orders: responseWSOrders.orders,
                total: responseWSOrders.total,
                totalToday: responseWSOrders.totalToday,
                error: undefined,
            });
    });
    test("wsClose action", () => {
        expect(wsSlice(
                {
                    wsConnected: true,
                    orders: responseWSOrders.orders,
                    total: responseWSOrders.total,
                    totalToday: responseWSOrders.totalToday,
                    error: undefined,
                },
                wsClose()
            )
        )
            .toEqual(initialStore);
    });
})