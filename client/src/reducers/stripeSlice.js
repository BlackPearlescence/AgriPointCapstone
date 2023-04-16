import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../webinstance/instance";
import Stripe from "stripe";
import { loadStripe } from '@stripe/stripe-js';



export const getStripePublishableKey = createAsyncThunk(
    "stripe/getStripePublishableKey",
    async () => {
        const resp = await instance.get("/stripe/get-publishable-key")
        const stripePublishableKey = resp.data.stripePublishableKey
        return stripePublishableKey
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

export const createPaymentIntent = createAsyncThunk(
    "stripe/createPaymentIntent",
    async (customerId) => {
        const resp = await instance.get(`/stripe/create-payment-intent/${customerId}`)
        const clientSecret = resp.data.clientSecret
        return clientSecret
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

export const createCustomer = createAsyncThunk(
    "stripe/createCustomer",
    async (customerEmail) => {
        const resp = await instance.post(`/stripe/create-customer/`, { customerEmail })
        const customer = resp.data.customer
        return customer
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



const stripeSlice = createSlice({
    name: "stripe",
    initialState: {
        clientSecret: null,
        stripePromise: null,
        stripeClient : null,
        status: "idle",
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [getStripePublishableKey.fulfilled]: (state, action) => {
            const stripePublishableKey = action.payload
            state.stripePromise = loadStripe(stripePublishableKey)
            state.stripeClient = Stripe(stripePublishableKey)
            state.status = "succeeded";
        },
        [createPaymentIntent.fulfilled]: (state, action) => {
            const clientSecret = action.payload
            state.clientSecret = clientSecret
            state.status = "succeeded";
        },
        [createCustomer.fulfilled]: (state, action) => {
            const customer = action.payload
            state.customer = customer
            state.status = "succeeded";
        }
    }
})

export const { } = stripeSlice.actions
export default stripeSlice.reducer
export const selectClientSecret = state => state.stripe.clientSecret
export const selectStripePromise = state => state.stripe.stripePromise
export const selectStripeClient = state => state.stripe.stripeClient
