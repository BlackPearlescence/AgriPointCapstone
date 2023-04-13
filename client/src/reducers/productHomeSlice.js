import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../webinstance/instance.js";
import axios from "axios";

export const fetchHomeProducts = createAsyncThunk(
    // TODO: fetch products based on real queries with real data
    'productHome/fetchHomeProducts',
    async () => {
        const newFruitsReq = axios.get("/products/recent?type=fruit&amount=6");
        const interestedReq =axios.get("/products/recent?type=fruit&amount=3");
        const newVeggiesReq = axios.get("/products/recent?type=vegetable&amount=3");
        const greatDealsReq =axios.get("/products/recent?type=fruit&amount=6");
        const flowersReq = axios.get("/products/recent?type=fruit&amount=3");
        const cheesesReq = axios.get("/products/recent?type=fruit&amount=3");
        const responses = await axios.all([newFruitsReq,interestedReq, newVeggiesReq,greatDealsReq,flowersReq,cheesesReq]);
        const [newFruitsResp, interestedResp, newVeggiesResp, greatDealsResp, flowersResp, cheesesResp] = responses;
        return {
            newFruitsData: newFruitsResp.data,
            interestedProductsData: interestedResp.data,
            newVeggiesData: newVeggiesResp.data,
            greatProductDealsData: greatDealsResp.data,
            flowerProductsData: flowersResp.data,
            cheeseProductsData: cheesesResp.data,
        }
    },
    {
        pending: (state, action) => {
            state.status = 'loading';
        },
        rejected: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
)
export const productHomeSlice = createSlice({
    name: 'productHome',
    initialState: {
        newFruitsData: [], 
        interestedProductsData: [],
        newVeggiesData: [],
        greatProductDealsData: [],
        flowerProductsData: [],
        cheeseProductsData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchHomeProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchHomeProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.newFruitsData = action.payload.newFruitsData;
                state.interestedProductsData = action.payload.interestedProductsData;
                state.newVeggiesData = action.payload.newVeggiesData;
                state.greatProductDealsData = action.payload.greatProductDealsData;
                state.flowerProductsData = action.payload.flowerProductsData;
                state.cheeseProductsData = action.payload.cheeseProductsData;
            })
            .addCase(fetchHomeProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default productHomeSlice.reducer;
export const selectNewFruitsData = state => state.productHome.newFruitsData;
export const selectInterestedProductsData = state => state.productHome.interestedProductsData;
export const selectNewVeggiesData = state => state.productHome.newVeggiesData;
export const selectGreatProductDealsData = state => state.productHome.greatProductDealsData;
export const selectFlowerProductsData = state => state.productHome.flowerProductsData;
export const selectCheeseProductsData = state => state.productHome.cheeseProductsData;
