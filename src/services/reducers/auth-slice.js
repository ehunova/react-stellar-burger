import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {logIn, getUserInfo, registrationUser} from "../../utils/api";

const initialState = {
    user: null,
    isAuthChecked: true,
}

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
)

export const fetchLogIn = createAsyncThunk(
    "auth/post",
    logIn
)

export const fetchUserInfo = createAsyncThunk(
    "userInfo/get",
    getUserInfo
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchRegistration.fulfilled.type, (state, action) => {
                state.user = action.payload.user;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            })
            .addCase(fetchLogIn.fulfilled.type, (state, action) => {
                state.user = action.payload.user;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            })
            .addCase(fetchUserInfo.fulfilled.type, (state, action) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(fetchUserInfo.rejected.type, (state, action) => {
                state.user = initialState.user;
                state.isAuthChecked = true;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }).addCase(fetchUserInfo.pending.type, (state, action) => {
                state.isAuthChecked = false;
            })
    }
})

export default authSlice.reducer;