const express = require("express");
const { consoleLogger } = require("../errorhandling/logger");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const { Product } = require("../schema");

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


router.post("/", express.json({ type: "application/json" }), (req, res) => {
    // const sig = req.headers["stripe-signature"];

    let event;

    try {
        event =  req.body;
    } catch (err) {
        consoleLogger.info(err)
    }

    if(!event) {
        consoleLogger.info("No event")

    }
    switch(event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            consoleLogger.info(paymentIntent)
            console.log(paymentIntent)
            break;
        case "payment_intent.payment_failed":
            break;
        default:
            console.log("Unhandled event type", event.type);
    }
    res.send()
})



module.exports = router