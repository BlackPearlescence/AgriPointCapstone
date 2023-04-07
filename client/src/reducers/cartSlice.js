import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartShown: false,
        checkoutShown: false,
        cart: new Map(),
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
            const { id, quantity = 1 } = action.payload;
            const existingItem =  state.cart.get(id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.set(id, action.payload);
            }
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;  
            state.cart.delete(id);
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.get(id);
            state.cart.set(id, quantity);
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
export const selectCart = state => state.cart.cart;