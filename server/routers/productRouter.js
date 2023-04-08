const express = require("express");
const { fileLogger, consoleLogger } = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleProductNotFoundError, handleProductsNotFoundError, handleNoProductsFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
// Base /products

// Get all Products
router.get("/", async (req, res, next) => {
    try {
        fileLogger.info("Request received for /products")
        const allProducts = await Product.find({}).exec()
        res.status(StatusCodes.OK).json(allProducts)
    } catch (err) {
        fileLogger.error(err)  
        next(err)
    }
})

router.use(handleProductNotFoundError)


// Get Product at ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        fileLogger.info(`Request received for /products/${id}`)
        const productAtId = await Product.findById(id).populate({path: "carts", select: "first_name last_name cart"})
        res.status(StatusCodes.OK).json(productAtId)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoProductsFoundError)

module.exports = router;