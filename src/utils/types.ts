export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid?: string;
}

export type TUser = {
    name: string;
    email: string;
}

export type TOrder = {
    name: string;
    order: {
        number: number;
    }
}