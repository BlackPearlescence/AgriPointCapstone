const express = require("express");
const { consoleLogger, fileLogger } = require("../errorhandling/logger");
const { Vendor, Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleVendorNotFoundError, handleNoVendorsFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");

// Base /vendors

// Get all vendors
router.get("/", async (req, res, next) => {
    try {
        fileLogger.info("Request received for /vendors")
        const vendors = await Vendor.find({});
        consoleLogger.info(vendors)
        res.status(StatusCodes.OK).json(vendors);
        fileLogger.info("Successfully sent response for /vendors")
    } catch(err){
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoVendorsFoundError)

// Get vendor by id
router.get("/:id", async (req, res, next) => {
    try {
        fileLogger.info(`Request received for /vendors/${req.params.id}`)
        const vendorById = await Vendor.findById(req.params.id).populate("inventory").exec();
        res.status(StatusCodes.OK).json(vendorById)
        fileLogger.info(`Successfully sent response for /vendors/${req.params.id}`)
    }
    catch(err){
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleVendorNotFoundError)

module.exports = router;