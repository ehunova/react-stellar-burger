import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    forgotPassword,
    getUserInfo,
    logIn,
    logOut,
    registrationUser,
    resetPassword,
    updateUserInfo
} from "../../utils/api";
import {TUser, TUserData, TUserWithTokens} from "../../utils/types";

type TAuthState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

const initialState: TAuthState = {
    user: null,
    isAuthChecked: true,
};

export const fetchRegistration = createAsyncThunk(
    "registration/post",
    registrationUser
);

export const fetchLogIn = createAsyncThunk(
    "login/post",
    logIn
);

export const fetchLogOut = createAsyncThunk(
    "logout/post",
    logOut
);

export const fetchUserInfo = createAsyncThunk(
    "userInfo/get",
    getUserInfo
);

export const fetchUpdateUser = createAsyncThunk(
    "updateUser/patch",
    updateUserInfo
);

export const fetchForgotPass = createAsyncThunk(
    "forgotPass/post",
    forgotPassword
);

export const fetchResetPass = createAsyncThunk(
    "resetPass/post",
    resetPassword
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                handleLogin(state, action);
            })
            .addCase(fetchLogIn.fulfilled, (state, action) => {
                handleLogin(state, action);
            })
            .addCase(fetchLogOut.fulfilled, (state) => {
                handleLogout(state);
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                handleUserInfo(state, action);
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                handleUserInfo(state, action);
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                handleLogout(state);
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.isAuthChecked = false;
            })
    }
})

function handleLogout(state: TAuthState) {
    state.user = initialState.user;
    state.isAuthChecked = true;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

function handleLogin(state: TAuthState, action: PayloadAction<TUserWithTokens>) {
    state.user = action.payload.user;
    localStorage.setItem("accessToken", action.payload.accessToken);
    localStorage.setItem("refreshToken", action.payload.refreshToken);
}

function handleUserInfo(state: TAuthState, action: PayloadAction<TUserData>) {
    state.user = action.payload.user;
    state.isAuthChecked = true;
}

export default authSlice.reducer;