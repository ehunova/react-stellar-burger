import {baseUrl} from "../services/constants/constants";

export function getIngredientsList() {
    return fetch(`${baseUrl}/ingredients`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
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
        .then ((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
}