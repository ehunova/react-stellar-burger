import {baseUrl} from "../services/constants/constants";

export function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const request = (endpoint, options) => fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse);