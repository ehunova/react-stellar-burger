import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    logIn,
    getUserInfo,
    registrationUser,
    logOut,
    updateUserInfo,
    forgotPassword,
    resetPassword
} from "../../utils/api";

const initialState = {
    user: null,
    isAuthChecked: true,
};

export const checkAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(fetchUserInfo())
        }
    };
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
    extraReducers: builder => {
        builder
            .addCase(fetchRegistration.fulfilled.type, (state, action) => {
                handleLogin(state, action);
            })
            .addCase(fetchLogIn.fulfilled.type, (state, action) => {
                handleLogin(state, action);
            })
            .addCase(fetchLogOut.fulfilled.type, (state, action) => {
                handleLogout(state);
            })
            .addCase(fetchUserInfo.fulfilled.type, (state, action) => {
                handleUserInfo(state, action);
            })
            .addCase(fetchUpdateUser.fulfilled.type, (state, action) => {
                handleUserInfo(state, action);
            })
            .addCase(fetchUserInfo.rejected.type, (state, action) => {
                handleLogout(state);
            })
            .addCase(fetchUserInfo.pending.type, (state, action) => {
                state.isAuthChecked = false;
            })
    }
})

function handleLogout(state) {
    state.user = initialState.user;
    state.isAuthChecked = true;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

function handleLogin(state, action) {
    state.user = action.payload.user;
    localStorage.setItem("accessToken", action.payload.accessToken);
    localStorage.setItem("refreshToken", action.payload.refreshToken);
}

function handleUserInfo(state, action) {
    state.user = action.payload.user;
    state.isAuthChecked = true;
}

export default authSlice.reducer;