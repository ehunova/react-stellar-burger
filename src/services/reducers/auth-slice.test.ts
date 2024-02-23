import authSlice, {initialState} from "./auth-slice";

const responseApiRegistration = {
    "success": true,
    "user": {
        "email": "test@yandex.ru",
        "name": "Ivan Petrov"
    },
    "accessToken": "Bearer ...",
    "refreshToken": ""
};

const responseApiLogin = {
    "success": true,
    "accessToken": "Bearer ...",
    "refreshToken": "",
    "user": {
        "email": "test@yandex.ru",
        "name": "Ivan Petrov"
    }
};

const responseApiUserInfo = {
    "success": true,
    "user": {
        "email": "test@yandex.ru",
        "name": "Ivan Petrov"
    }
};

const responseApiUpdateUserInfo = {
    "success": true,
    "user": {
        "email": "test@yandex.ru",
        "name": "Ivan Petrovsky"
    }
};

describe("Auth slice", () => {
    test("User registration fulfilled", () => {
        expect(authSlice(initialState, {
                type: "registration/post/fulfilled",
                payload: responseApiRegistration
            })
        )
            .toEqual({
                ...initialState,
                user: responseApiRegistration.user,
            })
    })
    test("User Log in fulfilled", () => {
        expect(authSlice(initialState, {
                type: "login/post/fulfilled",
                payload: responseApiLogin
            })
        )
            .toEqual({
                ...initialState,
                user: responseApiLogin.user,
            })
    })
    test("Get User information pending", () => {
        expect(authSlice(
                {
                    ...initialState,
                    user: responseApiLogin.user,
                },
                {
                    type: "userInfo/get/pending"
                }
            )
        )
            .toEqual({
                user: responseApiLogin.user,
                isAuthChecked: false,
            })
    })
    test("Get User information fulfilled", () => {
        expect(authSlice(
                {
                    ...initialState,
                    user: responseApiLogin.user,
                },
                {
                    type: "userInfo/get/fulfilled",
                    payload: responseApiUserInfo
                }
            )
        )
            .toEqual({
                user: responseApiUserInfo.user,
                isAuthChecked: true,
            })
    })
    test("Get User information rejected", () => {
        expect(authSlice(
                {
                    ...initialState,
                    user: responseApiLogin.user,
                },
                {
                    type: "userInfo/get/rejected"
                }
            )
        )
            .toEqual(initialState)
    })
    test("Update User information fulfilled", () => {
        expect(authSlice(
                {
                    isAuthChecked: true,
                    user: responseApiUserInfo.user
                },
                {
                    type: "updateUser/patch/fulfilled",
                    payload: responseApiUpdateUserInfo
                }
            )
        )
            .toEqual({
                user: responseApiUpdateUserInfo.user,
                isAuthChecked: true,
            })
    })
    test("User Log Out fulfilled", () => {
        expect(authSlice(
                {
                    isAuthChecked: true,
                    user: responseApiUpdateUserInfo.user
                },
                {
                    type: "logout/post/fulfilled"
                }
            )
        )
            .toEqual(initialState)
    })
})

