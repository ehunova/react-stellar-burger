import wsUserSlice, {initialState, wsUserClose, wsUserError, wsUserOpen, wsUserRequest} from "./ws-user-slice";

const responseWSUserOrders = {
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
        expect(wsUserSlice(initialState, wsUserOpen()))
            .toEqual({
                ...initialState,
                wsConnected: true,
                error: undefined
            });
    });
    test("wsError action", () => {
        expect(wsUserSlice(initialState, wsUserError("error")))
            .toEqual({
                ...initialState,
                wsConnected: false,
                error: "error"
            });
    });
    test("wsRequest action", () => {
        expect(wsUserSlice(initialState, wsUserRequest(responseWSUserOrders)))
            .toEqual({
                wsConnected: true,
                orders: responseWSUserOrders.orders,
                error: undefined
            });
    });
    test("wsClose action", () => {
        expect(wsUserSlice(
                {
                    wsConnected: true,
                    orders: responseWSUserOrders.orders,
                    error: undefined
                },
                wsUserClose()
            )
        )
            .toEqual(initialState);
    });
})