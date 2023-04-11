import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductInfo = createAsyncThunk(
    "productView/fetchProductInfo",
    async (productId) => {
        const resp = await axios.get(`/products/${productId}`);
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

export const productViewSlice = createSlice({
    name: "productView",
    initialState: {
        productInfo: {},
        selectedSize: {},
        selectedQuantity: 1,
        status: "idle",
        error: null,
        isMaxAmount: false,
        isMinAmount: false,
    },
    reducers: {
        pickSize: (state, action) => {
            state.selectedSize = action.payload;
            state.selectedQuantity = 1;
            state.isMaxAmount = false;
            state.isMinAmount = false;
            if(state.selectedSize.size_stock === 1) {
                state.isMaxAmount = true;
                state.isMinAmount = true;
            }
        },
        increaseQuantity: (state, action) => { 
            if(state.selectedQuantity < state.selectedSize.size_stock){
                state.isMaxAmount = false;
                state.isMinAmount = false;
                state.selectedQuantity += 1 
            } else{
                state.isMaxAmount = true;
            }
        },
        decreaseQuantity: (state, action) => { 
            if(state.selectedQuantity > 1){
                state.isMinAmount = false;
                state.isMaxAmount = false;
                state.selectedQuantity -= 1 
            } else {
                state.isMinAmount = true;
            }
        },
    },   
    extraReducers: builder => {
        builder
            .addCase(fetchProductInfo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProductInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.productInfo = action.payload;
            })
            .addCase(fetchProductInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

export default productViewSlice.reducer;
export const { pickSize, increaseQuantity, decreaseQuantity } = productViewSlice.actions;

export const selectProductInfo = state => state.productView.productInfo;
export const selectSelectedSize = state => state.productView.selectedSize;
export const selectSelectedQuantity = state => state.productView.selectedQuantity;
export const selectIsMinAmount = state => state.productView.isMinAmount;
export const selectIsMaxAmount = state => state.productView.isMaxAmount;