const { StatusCodes } = require("http-status-codes");
const { consoleLogger } = require("./logger");


// 404s
const handleProductNotFoundError = (err, req, res, next) => {
    err.message = "Product not found"
    err.name = "ProductNotFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleNoProductsFoundError = (err, req, res, next) => {
    err.message = "No products found"
    err.name = "NoProductsFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleCustomerNotFoundError = (err, req, res, next) => {
    err.message = "Customer not found"
    err.name = "CustomerNotFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleNoCustomersFoundError = (err, req, res, next) => {
    err.message = "No customers found"
    err.name = "NoCustomersFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleVendorNotFoundError = (err, req, res, next) => {
    err.message = "Vendor not found"
    err.name = "VendorNotFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleNoVendorsFoundError = (err, req, res, next) => {
    err.message = "No vendors found"
    err.name = "NoVendorsFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleCustomerHasNoReviewsError = (err, req, res, next) => {
    err.message = "Customer has no reviews"
    err.name = "CustomerHasNoReviewsError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleCustomerHasNoVendorReviewsError = (err, req, res, next) => {
    err.message = "Customer has no vendor reviews"
    err.name = "CustomerHasNoVendorReviewsError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleCustomerHasNoProductReviewsError = (err, req, res, next) => {
    err.message = "Customer has no product reviews"
    err.name = "CustomerHasNoProductReviewsError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleNoTransactionsFoundError = (err, req, res, next) => {
    err.message = "No transactions found"
    err.name = "NoTransactionsFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleRandomProductFailure = (err, req, res, next) => {
    err.message = "Failure to obtain random product(s)"
    err.name = "RandomProductFailure";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleNoReviewsFoundError = (err, req, res, next) => {
    err.message = "No reviews found"    
    err.name = "NoReviewsFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleRatingStatFailure = (err, req, res, next) => {
    err.message = "Failure to obtain rating statistics"
    err.name = "RatingStatFailure";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleBadRegistrationDetailsError = (err, req, res, next) => {
    err.message = "Bad registration details"
    err.name = "BadRegistrationDetailsError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}

const handleInvalidCredentialsError = (err, req, res, next) => {
    err.message = "Invalid credentials"
    err.name = "InvalidCredentialsError";
    err.statusCode = StatusCodes.UNAUTHORIZED;
    err.stack = new Error().stack;
    next(err);
}

const handleLogoutFailureError = (err, req, res, next) => {
    err.message = "Failure to Log Out";
    err.name = "LogoutFailureError";
    err.statusCode = StatusCodes.UNAUTHORIZED;
    err.stack = new Error().stack;
    next(err);
}

const handleNoRecentResultsFoundError = (err, req, res, next) => {
    err.message = "No recent results found"
    err.name = "NoRecentResultsFoundError";
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack;
    next(err);
}



// Final Error Handling Function for final middleware
const handleInternalServerError = (err, req, res, next) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = err.message || "Internal Server Error"
    next(err)
}


module.exports = {
    handleInternalServerError,
    handleProductNotFoundError,
    handleNoProductsFoundError,
    handleCustomerNotFoundError,
    handleNoCustomersFoundError,
    handleVendorNotFoundError,
    handleNoVendorsFoundError,
    handleCustomerHasNoReviewsError,
    handleCustomerHasNoVendorReviewsError,
    handleCustomerHasNoProductReviewsError,
    handleNoTransactionsFoundError,
    handleRandomProductFailure,
    handleNoReviewsFoundError,
    handleRatingStatFailure,
    handleInvalidCredentialsError,
    handleBadRegistrationDetailsError,
    handleLogoutFailureError,
    handleNoRecentResultsFoundError
}