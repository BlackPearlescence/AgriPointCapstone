import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductReviews = createAsyncThunk(
    "productReview/fetchProductReviews",
    async (productId) => {
        const resp = await axios.get(`/products/${productId}/reviews`);
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

export const addProductReview = createAsyncThunk(
    "productReview/addProductReview",
    async (reviewPayload) => {
        const resp = await axios.post(`/products/${reviewPayload.productId}/reviews`, reviewPayload);
        return resp.data;
    },
    {
        pending: (state, action) => {
            state.createStatus = "loading";
        },
        rejected: (state, action) => {
            state.createStatus = "failed";
            state.createError = action.error.message;
        }
    }
)

export const productReviewSlice = createSlice({
    name: "productReview",
    initialState: {
        productReviews: [],
        reviewModalShow: false,
        reviewCreateModalShow: false,
        expandedReview: {},
        status: "idle",
        error: null,
        createStatus: "idle",
        createError: null,
    },
    reducers: {
        showReviewModal: (state) => {
            state.reviewModalShow = true;
        },
        hideReviewModal: (state) => {
            state.reviewModalShow = false;
        },
        showCreateReviewModal: (state) => {
            state.reviewCreateModalShow = true;
        },
        hideCreateReviewModal: (state) => {
            state.reviewCreateModalShow = false;
        },
        setExpandedReview: (state, action) => {
            state.expandedReview = action.payload;
        }
    },
    extraReducers: {
        [fetchProductReviews.fulfilled]: (state, action) => {
            state.productReviews = action.payload;
            state.status = "succeeded";
            console.log(action.payload)
        },
        [addProductReview.fulfilled]: (state, action) => {
            state.productReviews = action.payload;
            state.createStatus = "succeeded";
            console.log(action.payload)
        }
    }
});

export const { showReviewModal, hideReviewModal, showCreateReviewModal, hideCreateReviewModal, setExpandedReview} = productReviewSlice.actions;
export default productReviewSlice.reducer;
export const selectProductReviews = (state) => state.productReview.productReviews;
export const selectReviewModalShow = (state) => state.productReview.reviewModalShow;
export const selectExpandedReview = (state) => state.productReview.expandedReview;
export const selectCreateReviewModalShow = (state) => state.productReview.reviewCreateModalShow;
export const selectFetchProductReviewsStatus = (state) => state.productReview.status;
