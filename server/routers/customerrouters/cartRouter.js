const { Customer, CartItem, Product, Vendor, VendorReview, ProductReview } = require("../../schema.js");
const express = require("express");
const router = express.Router();
const { consoleLogger, fileLogger } = require("../../errorhandling/logger");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const verifyToken = require("../../tools/verifyToken.js");


// Get the customer's cart
router.get("/", async (req, res, next) => {
    const customerId = req.id
    try {
        fileLogger.info(`Request received for /customers/${customerId}/cart`);
        const customerCart = await Customer.findById(customerId).select("_id cart").populate("cart.product")
        res.status(StatusCodes.OK).json(customerCart.cart);
        fileLogger.info(`Successfully sent response for /customers/${customerId}/cart`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})


// Add to a customer's cart
router.post("/", async (req, res, next) => {
    const customerId = req.id
    const { product, quantity = 1, size = "small"  } = req.body;
    consoleLogger.info(customerId)
    try {
        const customerCart = await Customer.findById(customerId).select("_id cart")
        const productInCart = customerCart.cart.find(item => item.product == product)
        consoleLogger.info(productInCart)
        if (!productInCart) {

            await Customer.findOneAndUpdate(
                { _id: customerId },
                { $push : { cart: { product: product, quantity: quantity, size: size } } },
                { new: true}
            )
        } else {
            consoleLogger.info("blah")  
            await Customer.findOneAndUpdate(
                { _id: customerId, "cart.product": product },
                { $inc: { "cart.$.quantity": quantity } },
                { new: true }
            )
        }
        res.status(StatusCodes.OK).json(customerCart);
        fileLogger.info(`Successfully sent response for /customers/${customerId}/cart`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

// Update a customer's cart
router.patch("/:productId", async (req, res, next) => {
    const customerId = req.id
    const productId = req.params.productId
    const { quantity = 1, size = "small" } = req.body;

    try {
        fileLogger.info(`Request received for /customers/${customerId}/cart/${productId}`);
        const customerCart = await Customer.findOneAndUpdate(
            { _id: customerId, "cart.product": productId },
            { $set: { "cart.$.quantity": quantity, "cart.$.size": size } },
            { new: true }
        )
        res.status(StatusCodes.OK).json(customerCart);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})


// Delete from a customer's cart
// Return an error if the product is not in the cart
router.delete("/:productId", async (req, res, next) => {
    const customerId = req.id
    const productId = req.params.productId
    try {
        fileLogger.info(`Request received for /customers/${customerId}/cart/${productId}`);

        const customerCart = await Customer.findOneAndUpdate(
            { _id: customerId },
            { $pull: { cart: { product: productId } } },
            { new: true, returnOriginal: false }
        )

        res.status(StatusCodes.OK).json(customerCart);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})


module.exports = router;