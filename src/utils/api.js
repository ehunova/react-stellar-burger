import {baseUrl} from "../services/constants/constants";
import {checkResponse, request} from "./utils";

export function getIngredientsList() {
    return request(`/ingredients`);
}

export function createOrder(ingredientIdList) {
    return request(`/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ingredients": ingredientIdList,
        })
    })
}

export function registrationUser(user) {
    return request(`/auth/register`, {
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
    return request(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": user.email,
            "password": user.password,
        })
    })
}

export function logOut() {
    return request(`/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
}

export function forgotPassword(form) {
    return request(`/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": form.email,
        }),
    })
}

export function resetPassword(form) {
    return request(`/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": form.password,
            "token": form.code,
        }),
    })
}

export function refreshToken() {
    return request(`/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
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