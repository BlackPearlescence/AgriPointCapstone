import { configureStore } from "@reduxjs/toolkit";
import "../reducers/loginSlice";
import loginReducer from "../reducers/loginSlice";
import cartReducer from "../reducers/cartSlice"
import productSearchReducer from "../reducers/productSearchSlice"
import productHomeReducer from "../reducers/productHomeSlice"
import productViewReducer from "../reducers/productViewSlice"

export default configureStore({
    reducer: {
        login: loginReducer,
        cart: cartReducer,
        productSearch: productSearchReducer,
        productHome: productHomeReducer,
        productView: productViewReducer,
    },
});