import { configureStore } from "@reduxjs/toolkit";
import "../reducers/loginSlice";
import loginReducer from "../reducers/loginSlice";
import cartReducer from "../reducers/cartSlice"

export default configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
    },
});