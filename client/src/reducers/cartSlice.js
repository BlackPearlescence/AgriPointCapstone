import { createSlice } from "@reduxjs/toolkit";
import { Map as ImmutableMap } from "immutable";

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
        addToCart: (state, action) => {
            // const { id, quantity = 1 } = action.payload;
            // const existingItem = state.getIn(["myCart", id])  ;
            // if (existingItem) {
            //     state.setIn(["myCart", id], quantity)
            // } else {
            //     state.setIn(["myCart", id], quantity)
            // }
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
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartShown = state => state.cart.cartShown;
export const selectCheckoutShown = state => state.cart.checkoutShown;
export const selectCart = state => state.cart.myCart;