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
        checkoutSteps: [
            { name: "Shipping Address", component: "ShippingAddress", active: true },
            { name: "Payment Method", component: "PaymentMethod", active: false },
            { name: "Confirm Order", component: "ConfirmOrder", active: false },
            { name: "Order Complete", component: "OrderComplete", active: false }
        ],
        isPurchaseComplete: false,
    },
    reducers: {
        nextStep: state => { 
            const activeStep = state.checkoutSteps.find(step => step.active === true)
            const activeStepIndex = state.checkoutSteps.indexOf(activeStep)
            state.checkoutSteps[activeStepIndex].active = false
            state.checkoutSteps[activeStepIndex + 1].active = true
         },
        prevStep: state => {
            const activeStep = state.checkoutSteps.find(step => step.active === true)
            const activeStepIndex = state.checkoutSteps.indexOf(activeStep)
            state.checkoutSteps[activeStepIndex].active = false
            state.checkoutSteps[activeStepIndex - 1].active = true
        },
        resetSteps: state => {
            state.checkoutSteps.forEach(step => step.active = false)
            state.checkoutSteps[0].active = true
        },
        changeStep: (state, action) => {
            const stepNumber = action.payload,
            activeStep = state.checkoutSteps.find(step => step.active === true)
            const activeStepIndex = state.checkoutSteps.indexOf(activeStep)
            state.checkoutSteps[activeStepIndex].active = false
            state.checkoutSteps[stepNumber].active = true
        },
        setPurchaseToComplete: state => { state.purchaseComplete = true },
        setPurchaseToIncomplete: state => { state.purchaseComplete = false }
    },
    extraReducers: {
        [getStripePublishableKey.fulfilled]: (state, action) => {
            const stripePublishableKey = action.payload
            state.stripePromise = loadStripe(stripePublishableKey)
            state.stripeClient = Stripe(stripePublishableKey)
            state.status = "succ eeded";
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

export const { nextStep, prevStep, resetSteps, changeStep, setPurchaseToComplete, setPurchaseToIncomplete } = stripeSlice.actions
export default stripeSlice.reducer
export const selectClientSecret = state => state.stripe.clientSecret
export const selectStripePromise = state => state.stripe.stripePromise
export const selectStripeClient = state => state.stripe.stripeClient
export const selectCheckoutSteps = state => state.stripe.checkoutSteps
export const selectIsPurchaseComplete = state => state.stripe.isPurchaseComplete
