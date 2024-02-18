import {request, TBasicResponse, TBasicResponseWithMessage} from "./utils";
import {
    TForgotPass,
    TIngredient,
    TOrder,
    TOrderInfo,
    TResetPass,
    TUserData,
    TUserLogIn,
    TUserRegistration,
    TUserTokens,
    TUserUpdate,
    TUserWithTokens
} from "./types";

type TGetIngredientsListResponse = TBasicResponse & {
    data: TIngredient[];
};

type TGetOrderInfoResponse = TBasicResponse & {
    orders: TOrderInfo[];
}

export function getIngredientsList(): Promise<TGetIngredientsListResponse> {
    return request<TGetIngredientsListResponse>(`/ingredients`);
}

export function getOrderInfo(number: string): Promise<TGetOrderInfoResponse> {
    return request<TGetOrderInfoResponse>(`/orders/${number}`);
}

export function createOrder(ingredientIdList: Array<string>): Promise<TBasicResponse & TOrder> {
    return requestWithRefresh(`/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({
            "ingredients": ingredientIdList,
        })
    })
}

export function registrationUser(user: TUserRegistration): Promise<TBasicResponse & TUserWithTokens> {
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

export function getUserInfo(): Promise<TBasicResponse & TUserData> {
    return requestWithRefresh(`/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken") || "",
        },
    })
}

export function updateUserInfo(user: TUserUpdate): Promise<TBasicResponse & TUserData> {
    return requestWithRefresh(`/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({
            "name": user.name,
            "email": user.email,
            "password": user.password,
        })
    })
}

export function logIn(user: TUserLogIn): Promise<TBasicResponse & TUserWithTokens> {
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

export function logOut(): Promise<TBasicResponse> {
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

export function forgotPassword(form: TForgotPass): Promise<TBasicResponseWithMessage> {
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

export function resetPassword(form: TResetPass): Promise<TBasicResponseWithMessage> {
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

export function refreshToken(): Promise<TBasicResponse & TUserTokens> {
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

type TRequestWithRefreshInit = RequestInit & { headers: { authorization: string } };

const requestWithRefresh = async <TResponse>(endpoint: string, options: TRequestWithRefreshInit) => {
    try {
        return await request<TResponse>(endpoint, options);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;
            return await request<TResponse>(endpoint, options);
        } else {
            return Promise.reject(err);
        }
    }
};