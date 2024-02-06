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
    name: string;
    order: {
        number: number;
    }
}
export type TUserRegistration = TUser & { password: string };
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