import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (customerId) => {
        const resp = await axios.get(`/customers/${customerId}/cart`);
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }

)

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (addToCartPayload) => {
        const { product, customer, quantity, size_name, size_item_count } = addToCartPayload;
        const resp = await axios.post(`/customers/${customer}/cart`,{ product, quantity, size_name, size_item_count });
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (removeFromCartPayload) => {
        const { product, customer } = removeFromCartPayload;
        const resp = await axios.delete(`/customers/${customer}/cart/${product}`);
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
)

export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async (updateCartItemQuantityPayload) => {
        const { product, customer, quantity } = updateCartItemQuantityPayload;
        const resp = await axios.patch(`/customers/${customer}/cart/${product}`, { quantity });
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
)


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartShown: false,
        checkoutShown: false,
        myCart: [],
    },

    reducers: {
        showCart: state => { state.cartShown = true },
        hideCart: state => { state.cartShown = false},
        showCheckout: state => { state.checkoutShown = true },
        hideCheckout: state => { state.checkoutShown = false },
        proceedToCheckout: state => {
            state.cartShown = false;
            state.checkoutShown = true;
        },
        revertToCart: state => {
            state.checkoutShown = false;
            state.cartShown = true;
        },
        clearCart: state => {
            state.myCart = [];
        },
    },
    extraReducers: {
        [getCart.fulfilled]: (state, action) => {
            console.log("Get Cart")
            console.log(action.payload)
            state.myCart = action.payload;
        },
        [addToCart.fulfilled]: (state, action) => {
            console.log("Add to Cart")
            console.log(action.payload)
            state.myCart = action.payload;
        },
        [removeFromCart.fulfilled]: (state, action) => {
            state.myCart = action.payload;
        },
        [updateCartItemQuantity.fulfilled]: (state, action) => {
            state.myCart = action.payload;
        },
    }
});

export const {
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    proceedToCheckout,
    revertToCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartShown = state => state.cart.cartShown;
export const selectCheckoutShown = state => state.cart.checkoutShown;
export const selectMyCart = state => state.cart.myCart;