const express = require("express");
const { consoleLogger, fileLogger } = require("../errorhandling/logger");
const { Customer, Cart, Product, Vendor, VendorReview, ProductReview } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleCustomerNotFoundError, handleNoCustomersFoundError, handleCustomerHasNoProductReviewsError, handleCustomerHasNoReviewsError, handleCustomerHasNoVendorReviewsError, handleNoTransactionsFoundError, handleInvalidCredentialsError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
const verifyToken = require("../tools/verifyToken.js");
const cartRouter = require("./customerrouters/cartRouter.js");

// Base /customers



router.param("id", async (req, res, next, id) => {
    try {
        req.id = id;
        next()
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

router.use("/:id/cart", cartRouter)


// Customer's by Id


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



// Get specific customer profile
router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.customerId)
        res.status(StatusCodes.OK).json(customer)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})  




// Get customer by id
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}`);
        // Populate cart with product info
        const customerById = await Customer.findById(id).populate("cart.product")
                                                        .populate("shopping_lists.items")
                                                        .populate("reward_information.reward_program")
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


router.get("/:id/reviews", async (req, res, next) => {
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



router.use(handleInvalidCredentialsError)

// Get all transactions for a customer
router.get("/:id/transactions", async (req, res, next) => {
    const { id } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}/transactions`);
        const customerTransactions = await Customer.findById(id).populate("transactions.order.order_items.product").select("transactions")
        res.status(StatusCodes.OK).json(customerTransactions);
        fileLogger.info(`Successfully sent response for /customers/${id}/transactions`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})

router.get("/:id/reviewtransactions", async (req, res, next) => {
    const { id } = req.params;
    try {
        fileLogger.info(`Request received for /customers/${id}/reviewtransactions`);
        const customerTransactions = await Customer.findById(id).populate("review_transactions.order.order_items.product").select("transactions")
        res.status(StatusCodes.OK).json(customerTransactions);
        fileLogger.info(`Successfully sent response for /customers/${id}/reviewtransactions`);
    } catch (err) {
        fileLogger.error(err);
        next(err)
    }
})


router.use(handleNoTransactionsFoundError)





module.exports = router;