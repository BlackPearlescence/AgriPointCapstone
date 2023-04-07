const { StatusCodes } = require("http-status-codes")


// 404s
const handleProductNotFoundError = (req, res, next) => {
    const err = new Error("Product not found");
    err.name = "ProductNotFoundError"
    err.statusCode = StatusCodes.NOT_FOUND;
    next(err)
}

const handleNoProductsFoundError = (req, res, next) => {
    const err = new Error("Products not found");
    err.statusCode = StatusCodes.NOT_FOUND;
    err.stack = new Error().stack()
    next(err)
}



// Final Error Handling Function for final middleware
const handleInternalServerError = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal Server Error"
    next(err)
}

module.exports = {
    handleInternalServerError
}