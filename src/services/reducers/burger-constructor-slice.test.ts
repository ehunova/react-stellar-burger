import burgerConstructorSlice, {
    addFilling, clearConstructor,
    moveFillingElement,
    removeFillingElement,
    setBun
} from "./burger-constructor-slice";

const initialStore = {
    bun: null,
    filling: [],
};

const bun = {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
};

const firstFillingIngredient = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
};

const secondFillingIngredient = {
    "_id": "643d69a5c3f7b9001cfa0940",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
};

describe("Burger Constructor slice", () => {
    test("Set Bun", () => {
        expect(burgerConstructorSlice(initialStore, setBun(bun)))
            .toEqual({
                ...initialStore,
                bun: bun,
            });
    });
    test("Add Filling", () => {
        expect(burgerConstructorSlice(initialStore, addFilling(firstFillingIngredient)))
            .toEqual({
                ...initialStore,
                filling: [
                    firstFillingIngredient
                ]
            });
    });
    test("Add another Filling", () => {
        expect(
            burgerConstructorSlice(
                {
                    ...initialStore,
                    filling: [
                        firstFillingIngredient
                    ]
                },
                addFilling(secondFillingIngredient)
            )
        )
            .toEqual({
                ...initialStore,
                filling: [
                    firstFillingIngredient,
                    secondFillingIngredient
                ]
            });
    });
    test("Move Filling Element", () => {
        expect(
            burgerConstructorSlice(
                {
                    ...initialStore,
                    filling: [
                        firstFillingIngredient,
                        secondFillingIngredient
                    ]
                },
                moveFillingElement({
                    indexFrom: 1,
                    indexTo: 0,
                    ingredient: secondFillingIngredient
                })
            )
        )
            .toEqual({
                ...initialStore,
                filling: [
                    secondFillingIngredient,
                    firstFillingIngredient
                ]
            });
    });
    test("Remove Filling Element", () => {
        expect(
            burgerConstructorSlice(
                {
                    ...initialStore,
                    filling: [
                        firstFillingIngredient,
                        secondFillingIngredient
                    ]
                },
                removeFillingElement(1)
            )
        )
            .toEqual({
                ...initialStore,
                filling: [
                    firstFillingIngredient
                ]
            });
    });
    test("Clear Constructor", () => {
        expect(
            burgerConstructorSlice(
                {...initialStore, filling: [firstFillingIngredient]},
                clearConstructor()
            )
        )
            .toEqual({
                ...initialStore
            });
    });
})