const express = require("express");
const { fileLogger, consoleLogger } = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleProductNotFoundError, handleRandomProductFailure, handleNoProductsFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
// Base /products

// Get all Products or Products by name
router.get("/", async (req, res, next) => {
    const { name } = req.query
    try {
        if (name) {
            fileLogger.info(`Request received for /products?name=${name}`)
            const productsByName = await Product.find({ name: { $regex: name, $options: "i" } }).exec()
            res.status(StatusCodes.OK).json(productsByName)
        } else {
            fileLogger.info("Request received for /products")
            const allProducts = await Product.find({}).exec()
            res.status(StatusCodes.OK).json(allProducts)
        }
    } catch (err) {
        fileLogger.error(err)  
        next(err)
    }
})

router.use(handleProductNotFoundError)

// Get random product based on the number of random products requested
// One by default
router.get("/random", async (req, res, next) => {
    const { num } = req.query;
    try {
        if(num){
            fileLogger.info(`Request received for /products/random?num=${num}`)
            const randomSampleProduct = await Product.aggregate().sample(parseInt(num)).exec()
            res.status(StatusCodes.OK).json(randomSampleProduct)
        } else {
            fileLogger.info("Request received for /products/random")
            const randomSampleProducts = await Product.aggregate().sample(1).exec()
            res.status(StatusCodes.OK).json(randomSampleProducts)
        }
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleRandomProductFailure)


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