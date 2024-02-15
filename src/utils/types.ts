import {Location} from "react-router-dom";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../services/store";

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

export type TIngredientConstructor = {
    bun: TIngredient | null;
    filling: TIngredient[];
}

export type TUser = {
    name: string;
    email: string;
}

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    order: TOrderNumber;
    createdAt: string;
    updatedAt: string;
}
export type TOrderNumber = {
    number: number;
}

export type TOrders = {
    orders: TOrder[];
    total?: number;
    totalToday?: number;
}

export type TUserRegistration = TUser & { password: string };

export type TUserTokens = {
    accessToken: string;
    refreshToken: string;
}

export type TUserData = {user: TUser};

export type TUserWithTokens = TUserTokens & TUserData;
export type TUserUpdate = TUser & { password: string };
export type TUserLogIn = {
    email: string;
    password: string;
}
export type TForgotPass = {
    email: string;
}
export type TResetPass = {
    password: string;
    code: string;
}

export type TFromLocation = { from: string, background?: Location<TFromLocation> };

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;