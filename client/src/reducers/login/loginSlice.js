import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loginShown: false,
        registerShown: false,
        loggedIn: false,
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
    }
});

export const { showLogin, hideLogin, showRegister, hideRegister, switchToRegister, switchToLogin, login, logout } = loginSlice.actions;

export default loginSlice.reducer;
export const selectLoginShown = state => state.login.loginShown;
export const selectRegisterShown = state => state.login.registerShown;
export const selectLoggedIn = state => state.login.loggedIn;