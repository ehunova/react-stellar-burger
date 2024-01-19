import {baseUrl} from "../services/constants/constants";
import {checkResponse} from "./utils";

export function getIngredientsList() {
    return fetch(`${baseUrl}/ingredients`)
        .then(checkResponse);
}

export function createOrder(ingredientIdList) {
    return fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ingredients": ingredientIdList,
        })
    })
        .then(checkResponse);
}