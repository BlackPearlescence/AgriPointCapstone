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

// export const addToCart = createAsyncThunk(
//     "cart/addToCart",
//     async (product) => {
//         const resp = await axios.post("")
//     }
// )


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
        addToCart: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const existingItem = state.myCart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.myCart.push({ id, quantity });
            }
        },
        removeFromCart: (state, action) => {
            // const { id } = action.payload;  
            // state.deleteIn(["myCart", id]);
        },
        updateCartItemQuantity: (state, action) => {
            // const { id, quantity } = action.payload;
            // const existingItem = state.getIn(["myCart", id]);
            // state.getIn(["myCart", id], quantity)
        }
    },
    extraReducers: {
        [getCart.fulfilled]: (state, action) => {
            state.myCart = action.payload;
        }
    }
});

export const {
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    proceedToCheckout,
    revertToCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartShown = state => state.cart.cartShown;
export const selectCheckoutShown = state => state.cart.checkoutShown;
export const selectMyCart = state => state.cart.myCart;