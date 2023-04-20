const express = require("express");
const { consoleLogger } = require("../errorhandling/logger");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const { Product, Customer, OrderItem, Transaction, Order, Address } = require("../schema");
const mongoose = require("mongoose");
const { fileLogger } = require("../errorhandling/logger");


const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;



router.post("/", express.json({ type: "application/json" }), async (req, res) => {
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
            const myCustomer = await Customer.findOne({ stripe_id: paymentIntent.customer }).populate("cart.product")
            consoleLogger.info(myCustomer)
            console.log(myCustomer)
            const order_items = []
            for(const item of myCustomer.cart) {
                order_items.push(new OrderItem({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                    size: item.size_name,
                }))
            }
            const newOrder = new Order({
                order_items: order_items,
                status: "Shipped",
            })
            fileLogger.info("Saved new order: " + newOrder._id)
            const newTransaction = new Transaction({
                order: newOrder._id,
                total: paymentIntent.amount,
                payment_method: paymentIntent.payment_method,
                status: "Completed",
                shipping_address: new Address({
                    address_one: paymentIntent.shipping.address.line1,
                    address_two: paymentIntent.shipping.address.line2,
                    city: paymentIntent.shipping.address.city,
                    state: paymentIntent.shipping.address.state,
                    zip: paymentIntent.shipping.address.postal_code,
                }),
                billing_address: new Address({
                    address_one: paymentIntent.shipping.address.line1,
                    address_two: paymentIntent.shipping.address.line2,
                    city: paymentIntent.shipping.address.city,
                    state: paymentIntent.shipping.address.state,
                    zip: paymentIntent.shipping.address.postal_code,
                }),
                notes: paymentIntent.description,
            })

            await newOrder.save()
            await newTransaction.save()
            await Customer.findByIdAndUpdate(myCustomer._id, { $set: { cart: [] }})
            await Customer.findByIdAndUpdate(myCustomer._id, { $push: { transactions: newTransaction._id }})

            fileLogger.info("Saved new transaction: " + newTransaction._id)
            break;
        case "payment_intent.payment_failed":
            break;
        default:
            console.log("Unhandled event type", event.type);
    }
    res.send()
})



module.exports = router