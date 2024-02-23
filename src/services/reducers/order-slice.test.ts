import orderSlice, {initialState} from "./order-slice"

const responseApiOrder = {
    "name": "Краторный метеоритный бургер",
    "order": {
        "number": 6257
    },
    "success": true
};

describe("Order slice", () => {
    test("Get order number after create order post-request pending", () => {
        expect(orderSlice(initialState, {
                type: "order/post/pending"
            })
        )
            .toEqual(initialState)
    })
    test("Get order number after create order post-request fulfilled", () => {
        expect(orderSlice(initialState, {
                type: "order/post/fulfilled",
                payload: responseApiOrder
            })
        )
            .toEqual({
                number: responseApiOrder.order.number
            })
    })
})