import { configureStore } from "@reduxjs/toolkit";
import "../reducers/login/loginModalSlice";
import loginModalReducer from "../reducers/login/loginModalSlice";

export default configureStore({
    reducer: {
        loginModal: loginModalReducer,
    },
});