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
        filteredProductData: [],
        currentPage: 1,
        pageSize: 12,
        totalPages: 0,
        status: "idle",
        error: null,
    },
    reducers: {
        nextPage: state => { 
            state.currentPage += 1 
            state.currentPage = state.currentPage > state.totalPages ? state.currentPage = state.totalPages : state.currentPage
        },
        prevPage: state => { 
            state.currentPage -= 1 
            state.currentPage = state.currentPage < 1 ? state.currentPage = 1 : state.currentPage
        },
        resetPage: state => { state.currentPage = 1 },
        changePage: (state, action) => { state.currentPage = action.payload },
        setProductData: (state, action) => { state.productData = action.payload },
        setFilteredProductData: (state, action) => { state.filteredProductData = action.payload },
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
export const { nextPage, prevPage, resetPage, changePage, setProductData, setFilteredProductData } = productSearchSlice.actions;
export const selectProductData = state => state.productSearch.productData;
export const selectCurrentPage = state => state.productSearch.currentPage;
export const selectPageSize = state => state.productSearch.pageSize;
export const selectTotalPages = state => state.productSearch.totalPages;
export const selectFilteredProductData = state => state.productSearch.filteredProductData;