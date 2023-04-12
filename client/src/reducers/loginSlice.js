import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const makeRegistrationRequest = createAsyncThunk(
    "login/makeRegistrationRequest",
    async (registrationData) => {
        const resp = await axios.post("/auth/register", registrationData);
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
            const resp = await axios.post("/auth/login", loginData);
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
        loginDetails: {},
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
            state.loginDetails = action.payload;
            console.log(state.loginDetails)
            state.loginShown = false;
            state.loggedIn = true;
        },
        [makeLoginRequest.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            console.log(action)
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