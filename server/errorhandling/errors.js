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
    err.message = "No customers fround"
    err.name = "NoCustomersFoundError";
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
}