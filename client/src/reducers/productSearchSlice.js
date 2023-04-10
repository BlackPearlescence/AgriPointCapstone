import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchProductsBasedOnQuery =  createAsyncThunk(
    "productSearch/fetchProducts", 
    async (name) => {
        if(!name){
            const resp = await axios.get(`/products`)
            return resp.data
        } else {
            const resp = await axios.get(`/products?name=${name}`)
            return resp.data
        }    
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

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState: {
        productData: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProductsBasedOnQuery.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProductsBasedOnQuery.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.productData = action.payload;
                console.log(state.productData)
            })
            .addCase(fetchProductsBasedOnQuery.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default productSearchSlice.reducer;
export const selectProductData = state => state.productSearch.productData;