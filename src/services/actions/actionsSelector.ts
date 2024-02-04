import {TIngredient} from "../../utils/types";

export const ingredientsListSelector = (store: any) => store.ingredientsList.ingredients;
export const burgerConstructorSelector = (store: any) => store.burgerConstructor;
export const orderSelector = (store: any) => store.order;
export const orderTotalSelector = (store: any) =>
    (
        store.burgerConstructor.bun !== null
        ? store.burgerConstructor.bun.price * 2
        : 0
    )
    + store.burgerConstructor.filling.reduce((sum: number, ingredient: TIngredient) => sum + ingredient.price, 0);

export const isAuthCheckedSelector = (store: any) => store.auth.isAuthChecked;
export const userSelector = (store: any) => store.auth.user;
