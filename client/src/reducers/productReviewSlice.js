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

export const productReviewSlice = createSlice({
    name: "productReview",
    initialState: {
        productReviews: [],
        reviewModalShow: false,
        expandedReview: {},
        status: "idle",
        error: null,
    },
    reducers: {
        showReviewModal: (state) => {
            state.reviewModalShow = true;
        },
        hideReviewModal: (state) => {
            state.reviewModalShow = false;
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
        }
    }
});

export const { showReviewModal, hideReviewModal, setExpandedReview } = productReviewSlice.actions;
export default productReviewSlice.reducer;
export const selectProductReviews = (state) => state.productReview.productReviews;
export const selectReviewModalShow = (state) => state.productReview.reviewModalShow;
export const selectExpandedReview = (state) => state.productReview.expandedReview;
