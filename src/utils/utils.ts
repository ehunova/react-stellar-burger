import {baseUrl} from "../services/constants/constants";

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
