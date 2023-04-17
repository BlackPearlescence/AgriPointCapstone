const express = require('express');
const { consoleLogger } = require('../errorhandling/logger');
const { Customer } = require('../schema');
const router = express.Router();
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.get("/get-publishable-key", (req, res, next) => {
    try{
        res.status(200).json({ stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
    } catch (err) {
        next(err)
    }
})

router.get("/create-payment-intent/:customerId", async (req, res, next) => {
    const customerId = req.params.customerId
    try{
        const customer = await Customer.findById(customerId).populate("cart.product")
        console.log(customer)
        const stripeCustomer = await stripe.customers.retrieve(customer.stripe_id)
        console.log(stripeCustomer)
        const customerCart = customer.cart
        // consoleLogger.error(customerCart)
        const amount = customerCart.reduce((acc, item) => acc + item.product.price, 0)
        // consoleLogger.error(amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            receipt_email: customer.username,
            description: "5% of your purchase will be donated directly to the hardworking farmers who grew your food!",
            customer: customer.stripe_id
        })
        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
        next(err)
    }
})




module.exports = router;