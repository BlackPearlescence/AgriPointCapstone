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
    const { product, quantity = 1, size_name, size_item_count   } = req.body;
    // consoleLogger.info(customerId)
    // consoleLogger.info("product" + product)
    try {
        const customerCart = await Customer.findById(customerId).select("_id cart")
        const productInCart = customerCart.cart.find(item => item.product == product && item.size_name == size_name)
        let result;
        // consoleLogger.info(customerCart)
        if (!productInCart) {
            result = await Customer.findOneAndUpdate(
                { _id: customerId  },
                { $push : { cart: { product: product, quantity: quantity, size_name: size_name, size_item_count: size_item_count } } },
                { new: true}
            )
        } else {
            // consoleLogger.info("blah")  
            result = await Customer.findOneAndUpdate(
                { _id: customerId, "cart" : { $elemMatch: { product: product, size_name: size_name } }},
                { $inc: { "cart.$.quantity": quantity } },
                { new: true }
            )
        }
        // consoleLogger.info(result)
        res.status(StatusCodes.OK).json(result.cart);
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
        ).populate("cart.product")
        // consoleLogger.info(customerCart.cart)
        res.status(StatusCodes.OK).json(customerCart.cart);
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

        res.status(StatusCodes.OK).json(customerCart.cart);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

// Delete all items from a customer's cart
router.delete("/", async (req, res, next) => {
    const customerId = req.id
    try {
        fileLogger.info(`Request received for /customers/${customerId}/cart`);
        const customerCart = await Customer.findOneAndUpdate(
            { _id: customerId },
            { $set: { cart: [] } },
            { new: true, returnOriginal: false }
        )
        res.status(StatusCodes.OK).json(customerCart.cart);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})


module.exports = router;