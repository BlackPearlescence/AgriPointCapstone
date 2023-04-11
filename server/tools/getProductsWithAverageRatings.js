const { consoleLogger } = require("../errorhandling/logger")
const getReviewStatistics = require("./getReviewStatistics.js")

const getProductsWithAverageRatings = async (products) => {
    const productsWithAverageRatings = []
    for(product of products) {
        const reviews  = product.reviews
        const reviewStatistics = await getReviewStatistics(reviews)
        const averageRating = reviewStatistics.averageRating
        const productWithAverageRating = {
            ...product._doc ? product._doc : product,
            averageRating: Math.ceil(averageRating)
        }
        productsWithAverageRatings.push(productWithAverageRating)
    }
    consoleLogger.info(productsWithAverageRatings)
    return productsWithAverageRatings
}

module.exports = getProductsWithAverageRatings