import { configureStore } from "@reduxjs/toolkit";
import "../reducers/login/loginSlice";
import loginReducer from "../reducers/login/loginSlice";

export default configureStore({
    reducer: {
        login: loginReducer,
    },
});