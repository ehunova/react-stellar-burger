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
    return fetchWithRefresh(`${baseUrl}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken"),
        },
    })
}

export function updateUserInfo(user) {
    return fetchWithRefresh(`${baseUrl}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
            "name": user.name,
            "email": user.email,
            "password": user.password,
        })
    })
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

export function logOut() {
    return fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(checkResponse);
}

export function forgotPassword(form) {
    return fetch(`${baseUrl}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": form.email,
        }),
    })
        .then(checkResponse);
}

export function resetPassword(form) {
    return fetch(`${baseUrl}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": form.password,
            "token": form.code,
        }),
    })
        .then(checkResponse);
}

export function refreshToken() {
    return fetch(`${baseUrl}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(checkResponse);
}

const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};