const { StatusCodes } = require("http-status-codes")


// 404s
const handleProductNotFoundError = (req, res, next) => {
    const error = new Error("Product not found");
    error.statusCode = StatusCodes.OK;
    next(error)
}