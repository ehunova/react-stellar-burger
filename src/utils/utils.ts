import {baseUrl} from "../services/constants/constants";
import {TFullOrder, TIngredient, TOrderInfo} from "./types";

export type TBasicResponse = { success: boolean };
export type TBasicResponseWithMessage = TBasicResponse & { message: string };

export function request<TResponse>(endpoint: string, options?: RequestInit): Promise<TResponse> {
    return fetch(`${baseUrl}${endpoint}`, options)
        .then(checkResponse<TResponse>);
}

function checkResponse<TResponse>(response: Response): Promise<TResponse> {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export function collectOrderIngredients(order: TFullOrder | TOrderInfo, ingredients: TIngredient[]): TIngredient[] {
    let orderIngredients: TIngredient[] = [];
    order.ingredients.forEach(idIngredient => {
        const ingredient = ingredients.find(element => element._id === idIngredient);
        if (ingredient) {
            orderIngredients.push(ingredient);
        }
    });
    return orderIngredients;
}

export function totalPriceOrder (orderIngredients: TIngredient[]): number {
    return orderIngredients.reduce(
        (sum, ingredient) => sum + (ingredient.type === "bun" ? ingredient.price * 2 : ingredient.price),
        0);
}

export function getStatus(order: TFullOrder): string {
    switch (order.status) {
        case "done": {
            return "Выполнен";
        }
        case "pending": {
            return "Готовится";
        }
        case "created": {
            return "Создан";
        }
        default: {
            return "Отменен";
        }
    }
}