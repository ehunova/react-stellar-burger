import orderSlice from "./order-slice"

const initialStore = {
    number: 0,
};

const responseApiOrder = {
    "name": "Краторный метеоритный бургер",
    "order": {
        "number": 6257
    },
    "success": true
};

describe("Order slice", () => {
    test("Get order number after create order post-request fulfilled", () => {
        expect(orderSlice(initialStore, {
                type: "order/post/fulfilled",
                payload: responseApiOrder
            })
        )
            .toEqual({
                number: responseApiOrder.order.number
            })
    })
})