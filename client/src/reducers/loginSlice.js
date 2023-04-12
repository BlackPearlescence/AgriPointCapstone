import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../webinstance/instance.js";
import Cookies from "js-cookie";

export const makeLogoutRequest = createAsyncThunk(
    "login/makeLogoutRequest",
    async () => {
        const token = Cookies.get("jwt")
        const resp = await instance.post("/auth/logout", { token });
        console.log(resp)
        Cookies.remove("jwt");
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    }
);

export const makeLoginCheckRequest = createAsyncThunk(
    "login/makeLoginCheckRequest",
    async () => {
        const resp = await instance.get("/auth/check");
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    }
);

export const makeRegistrationRequest = createAsyncThunk(
    "login/makeRegistrationRequest",
    async (registrationData) => {
        const resp = await instance.post("/auth/register", registrationData);
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            
        },
    }
);


export const makeLoginRequest = createAsyncThunk(
    "login/makeLoginRequest",
    async (loginData, { rejectWithValue }) => {
        try {
            const resp = await instance.post("/auth/login", loginData);
            Cookies.set("agrishoptoken", resp.data.token, { expires: 1 })
            return resp.data;
        } catch (err) {
            console.log(err)
            if(err.response && err.response.status === 401){
                console.log(err)
                return rejectWithValue("Invalid username or password.");
            } else {
                return rejectWithValue("Something went wrong. Please try again later.");
            }
        }
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loginShown: false,
        registerShown: false,
        loggedIn: false,
        customerDetails: {},
        status: "idle",
        error: null,
    },
    reducers: {
        showLogin: state => { state.loginShown = true },
        hideLogin: state => { state.loginShown = false },
        showRegister: state => { state.registerShown = true },
        hideRegister: state => { state.registerShown = false },
        switchToRegister: state => {
            state.loginShown = false;
            state.registerShown = true;
        },
        switchToLogin: state => {
            state.registerShown = false;
            state.loginShown = true;
        },
        login: state => { state.loggedIn = true },
        logout: state => { state.loggedIn = false },
        hideErrors: state => { state.error = null },
    },
    extraReducers: {
        [makeRegistrationRequest.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.registerShown = false;
            state.loginShown = true;
        },
        [makeLoginRequest.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.customerDetails = action.payload;
            console.log(state.customerDetails)
            state.loginShown = false;
            state.loggedIn = true;
        },
        [makeLoginRequest.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            console.log(action)
        },
        [makeLoginCheckRequest.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.customerDetails = action.payload;
            state.loggedIn = true;
        },
        [makeLogoutRequest.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.customerDetails = {};
            state.loggedIn = false;
            console.log(state.loggedIn)
        },
        [makeLogoutRequest.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            console.log(state.error)
        }
    }
});

export const { showLogin, hideLogin, showRegister, hideRegister, switchToRegister, switchToLogin, login, logout, hideErrors} = loginSlice.actions;

export default loginSlice.reducer;
export const selectLoginShown = state => state.login.loginShown;
export const selectRegisterShown = state => state.login.registerShown;
export const selectLoggedIn = state => state.login.loggedIn;
export const selectErrorMessage = state => state.login.error;
export const selectLoginError = state => state.login.error;
export const selectCustomerDetails = state => state.login.customerDetails; 