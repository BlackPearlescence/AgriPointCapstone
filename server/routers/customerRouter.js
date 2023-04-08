const express = require("express");
const { consoleLogger, fileLogger } = require("../errorhandling/logger");
const { Customer, Cart, Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleCustomerNotFoundError, handleNoCustomersFoundError, handleProductNotFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");

// Base /customers

// Get all customers
router.get("/", async (req, res, next) => {
    try {
        fileLogger.info("Request received for /customers")
        const customers = await Customer.find({});
        res.status(StatusCodes.OK).json(customers);
        fileLogger.info("Successfully sent response for /customers")
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

router.use(handleNoCustomersFoundError)


// Get customer by id
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}`);
        // Populate cart with product info
        const customerById = await Customer.findById(id).populate("cart.product").exec();

        res.status(StatusCodes.OK).json(customerById);
        fileLogger.info(`Successfully sent response for /customers/${id}`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

router.use(handleCustomerNotFoundError)


module.exports = router;