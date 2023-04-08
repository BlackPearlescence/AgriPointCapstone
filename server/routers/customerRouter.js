const express = require("express");
const logger = require("../errorhandling/logger");
const { Customer } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleCustomerNotFoundError, handleNoCustomersFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");

// Base /customers

// Get all customers
router.get("/", async (req, res, next) => {
    try {
        logger.info("Request received for /customers")
        const customers = await Customer.find({}).exec();
        res.status(StatusCodes.OK).json(customers);
        logger.info(customers);
    } catch (err) {
        logger.error(err);
        handleCustomerNotFoundError(req, res, next);
    }
})

// Get customer by id
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        logger.info(`Request received for /customers/${id}`);
        const customerById = await Customer.findById(id)
                                    .populate("shopping_lists")
                                    .populate({
                                        path: "cart",
                                        populate: {
                                            path: "product"
                                        }
                                    })
                                    .exec()
        res.status(StatusCodes.OK).json(customerById);
        logger.info(customerById);
    } catch (err) {
        logger.error(err);
        handleNoCustomersFoundError(req, res, next);
    }
})

module.exports = router;