import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchProductsBasedOnQuery =  createAsyncThunk(
    "productSearch/fetchProducts", 
    async (query) => {
        const {name, page} = query
        if(!name){
            const resp = await axios.get(`/products?page=${page}&limit=12`)
            return resp.data
        } else {
            const resp = await axios.get(`/products?name=${name}&page=${page}&limit=12`)
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
        currentPage: 1,
        pageSize: 12,
        totalPages: 0,
        status: "idle",
        error: null,
    },
    reducers: {
        nextPage: state => { state.currentPage += 1 },
        prevPage: state => { state.currentPage -= 1 },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProductsBasedOnQuery.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProductsBasedOnQuery.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { pageNumber, pageSize, totalPages, results } = action.payload;
                state.productData = results;
                state.currentPage = pageNumber;
                state.pageSize = pageSize;
                state.totalPages = totalPages;
                console.log(state.productData)
            })
            .addCase(fetchProductsBasedOnQuery.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default productSearchSlice.reducer;
export const { nextPage, prevPage } = productSearchSlice.actions;
export const selectProductData = state => state.productSearch.productData;
export const selectCurrentPage = state => state.productSearch.currentPage;
export const selectPageSize = state => state.productSearch.pageSize;
export const selectTotalPages = state => state.productSearch.totalPages;