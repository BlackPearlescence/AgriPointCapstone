import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../webinstance/instance.js";
import axios from "axios";

export const fetchHomeProducts = createAsyncThunk(
    // TODO: fetch products based on real queries with real data
    'productHome/fetchHomeProducts',
    async () => {
        const inSeasonReq = axios.get("/products/random?num=6");
        const interestedReq = axios.get("/products/random?num=3");
        const newProductsReq = axios.get("/products/random?num=3");
        const greatDealsReq = axios.get("/products/random?num=6");
        const flowersReq = axios.get("/products/random?num=3");
        const cheesesReq = axios.get("/products/random?num=3");
        const responses = await axios.all([inSeasonReq, interestedReq, newProductsReq, greatDealsReq, flowersReq, cheesesReq ]);
        const [inSeasonResp, interestedResp, newProductsResp, greatDealsResp, flowersResp, cheesesResp] = responses;
        return {
            inSeasonProductsData: inSeasonResp.data,
            interestedProductsData: interestedResp.data,
            newProductsData: newProductsResp.data,
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
        inSeasonProductsData: [], 
        interestedProductsData: [],
        newProductsData: [],
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
                state.inSeasonProductsData = action.payload.inSeasonProductsData;
                state.interestedProductsData = action.payload.interestedProductsData;
                state.newProductsData = action.payload.newProductsData;
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
export const selectInSeasonProductsData = state => state.productHome.inSeasonProductsData;
export const selectInterestedProductsData = state => state.productHome.interestedProductsData;
export const selectNewProductsData = state => state.productHome.newProductsData;
export const selectGreatProductDealsData = state => state.productHome.greatProductDealsData;
export const selectFlowerProductsData = state => state.productHome.flowerProductsData;
export const selectCheeseProductsData = state => state.productHome.cheeseProductsData;
