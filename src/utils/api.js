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

export function registrationUser(user) {
    return fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": user.name,
            "email": user.email,
            "password": user.password,
        })
    })
        .then(checkResponse);
}

export function getUserInfo() {
    return fetch(`${baseUrl}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken"),
        },
    })
        .then(checkResponse);
}

export function logIn(user) {
    return fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            "email": user.email,
            "password": user.password,
        })
    })
        .then(checkResponse);
}


