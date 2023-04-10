const express = require("express");
const { fileLogger, consoleLogger } = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleProductNotFoundError, handleRandomProductFailure, handleNoProductsFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
const  paginate  = require("../tools/paginate.js")
// Base /products

// Get all Products or Products by name
router.get("/", async (req, res, next) => {
    let { name, page, limit } = req.query
    try {
        if (name || page || limit) {
            consoleLogger.info(`Request received for /products?name=${name}`)
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 12;
            const productsByName = await Product.find({ name: { $regex: name, $options: "i" } }).exec()
            const pageResults = await paginate(productsByName, page, limit)
            consoleLogger.info(pageResults)
            res.status(StatusCodes.OK).json(pageResults)
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
            consoleLogger.info(randomSampleProduct)
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