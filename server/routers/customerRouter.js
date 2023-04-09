const express = require("express");
const { consoleLogger, fileLogger } = require("../errorhandling/logger");
const { Customer, Cart, Product, Vendor, VendorReview, ProductReview } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleCustomerNotFoundError, handleNoCustomersFoundError, handleCustomerHasNoProductReviewsError, handleCustomerHasNoReviewsError, handleCustomerHasNoVendorReviewsError } = require("../errorhandling/errors.js");
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
        const customerById = await Customer.findById(id).populate("cart.product")
                                                        .populate("shopping_lists.items")
        res.status(StatusCodes.OK).json(customerById);
        fileLogger.info(`Successfully sent response for /customers/${id}`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

router.use(handleCustomerNotFoundError)

// A customer's reviews can be filtered by type (vendor, product, or both)
// This middleware establishes a common query for the reviews


router.get("/reviews/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}/reviews`);
        const customerVendorReviews = await Vendor.find({ "reviews.customer" : id })
        const customerProductReviews = await Product.find({ "reviews.customer": id })
        const customerReviews = {
            vendor_reviews: customerVendorReviews,
            product_reviews: customerProductReviews
        }
        console.log(customerReviews)
        res.status(StatusCodes.OK).json(customerReviews);
        fileLogger.info(`Successfully sent response for /customers/${id}/reviews`);
    } catch (err) {
        filterLogger.error(err);
        next(err)
    }
})

router.use(handleCustomerHasNoReviewsError)
module.exports = router;