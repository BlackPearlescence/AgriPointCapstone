const express = require("express");
const logger = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleProductNotFoundError, handleProductsNotFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
// Base /products

// Get all Products
router.get("/", async (req, res, next) => {
    try {
        logger.info("Request received for /products")
        const allProducts = await Product.find({}).exec()
        res.status(StatusCodes.OK).json(allProducts)
        logger.info(allProducts)
    } catch (err) {
        logger.error(err)
        handleProductNotFoundError(req, res, next)
    }
})


// Get Product at ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        logger.info(`Request received for /products/${id}`)
        const productAtId = await Product.findById(id).exec()
        res.status(StatusCodes.OK).json(productAtId)
        logger.info(productAtId)
    } catch (err) {
        logger.error(err)
        handleNoProductsFoundError(req, res, next);
    }
})

module.exports = router;