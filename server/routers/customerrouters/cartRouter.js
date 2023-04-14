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
        const customerCart = await Customer.findById(customerId).select("_id cart").populate("cart.product")
        const productInCart = customerCart.cart.find(item => item.product == product)
        if (!productInCart) {

            const customerCart = await Customer.findOneAndUpdate(
                { _id: customerId },
                { $push : { cart: { product: product, quantity: quantity, size: size } } },
                { new: true}
            )
        // fileLogger.info(`Request received for /customers/${customerId}/cart`);
        // // consoleLogger.info("blah")

        // const customerCart = await Customer.findById(customerId).select("_id cart").populate("cart.product")
        // consoleLogger.info(customerCart)
        // const productInCart = customerCart.cart.find(item => item.product == product)
        // // consoleLogger.info(productInCart)
        // if (productInCart) {
        //     // consoleLogger.info("blah")
        //     productInCart.quantity += quantity
        //     consoleLogger.info(productInCart)

        // } else { 
        //     // consoleLogger.info("blah")
        //     customerCart.cart.push(new CartItem({ 
        //         product: product, 
        //         quantity: quantity, 
        //         size: size 
        //     }))
        //     consoleLogger.info(customerCart)
        // }
        // await customerCart.save()
        res.status(StatusCodes.OK).json(customerCart);
        fileLogger.info(`Successfully sent response for /customers/${customerId}/cart`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

// Delete from a customer's cart
router.delete("/:productId", async (req, res, next) => {
    const { id, cartId } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}/cart/${cartId}`);
        const customerCart = await Customer.findById(id).select("_id cart")
        customerCart.cart = customerCart.cart.filter(item => item._id != cartId)
        await customerCart.save()
        res.status(StatusCodes.OK).json(customerCart);
        fileLogger.info(`Successfully sent response for /customers/${id}/cart/${cartId}`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

// Update a customer's cart
router.put("/:productId", async (req, res, next) => {
    const { id, cartId } = req.params;
})

module.exports = router;