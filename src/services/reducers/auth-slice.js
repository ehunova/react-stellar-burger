import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {logIn, getUserInfo, registrationUser, logOut} from "../../utils/api";

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
                state.user = action.payload.user;
                state.isAuthChecked = true;
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

export default authSlice.reducer;