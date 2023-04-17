const express = require("express");
const { fileLogger,  } = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
// const { $expr, $eq } = require("mongoose").mongo
const router = express.Router();
const { handleProductNotFoundError, handleRandomProductFailure, handleNoProductsFoundError, handleNoReviewsFoundError, handleRatingStatFailure, handleNoRecentResultsFoundError } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
const  paginate  = require("../tools/paginate.js");
const getReviewStatistics = require("../tools/getReviewStatistics");
const getProductsWithAverageRatings = require("../tools/getProductsWithAverageRatings");
// Base /products

// Get all Products or Products by name
router.get("/", async (req, res, next) => {
    let { name, page, type, minprice, maxprice, minrating, maxrating,  limit } = req.query
    try {
        // if (name || page || limit) {
        fileLogger.info(`Request received for /products?name=${name}?page=${page}?type=${type}?minprice=${minprice}?maxprice=${maxprice}?minrating=${minrating}?maxrating=${maxrating}?limit=${limit}`)
        name = name || "";
        page = parseInt(page) || 1;
        type = type || "";
        minprice = parseInt(minprice) || 0;
        maxprice = parseInt(maxprice) || 1000;
        minrating = parseInt(minrating) === 0 || parseInt(minrating) === undefined ? 0 : parseInt(minrating) || 0;
        // .info(minprice,maxprice)
        maxrating = parseInt(maxrating) === 0 || parseInt(maxrating) === undefined ? 0 : parseInt(maxrating) || 5;
        limit = parseInt(limit) || 12;
        // .info(name, page, type, minprice, maxprice, minrating, maxrating, limit)
        // if(minrating === 0 && maxrating === 0){
        //     minrating = 0;
        //     maxrating = 1;
        // }

        const query = Product.find()
            .where("name", new RegExp(name, "i"))
            .where("price").gte(minprice).lte(maxprice)
            .where("vegetation_type", new RegExp(type, "i"))
            .where("statistics.average_rating").gte(minrating).lte(maxrating)


        // if(minrating == 0 && maxrating == 0){
        //     query.where("statistics.average_rating").equals(0)
        //     .info("THIS EXECUTED")
        // } else {
        //     console.log("WRONG ONE")
        // }
        
        const productsByFilter = await query.exec()
        // const productsByFilter = await Product.find({ 
        //     name: { $regex: name, $options: "i" },
        //     price: { $gte: minprice, $lte: maxprice },
        //     vegetation_type: { $regex: type, $options: "i" },
        //     "statistics.average_rating": { $gte: minrating, $lte: maxrating },
        // }).exec();
        // const productsWithAverageRatings = await getProductsWithAverageRatings(productsByFilter)
        // .info(productsWithAverageRatings)
        const pageResults = await paginate(productsByFilter, page, limit)
        res.status(StatusCodes.OK).json(pageResults)
    } catch (err) {
        fileLogger.error(err)  
        next(err)
    }
})

router.use(handleProductNotFoundError)

// Get random product based on the number of random products requested
// One by default
router.get("/random", async (req, res, next) => {
    const { num } = req.query;
    try {
        if(num){
            fileLogger.info(`Request received for /products/random?num=${num}`)
            const randomSampleProducts = await Product.aggregate().sample(parseInt(num)).exec()
            res.status(StatusCodes.OK).json(randomSampleProducts)
        } else {
            fileLogger.info("Request received for /products/random")
            const randomSampleProduct = await Product.aggregate().sample(1).exec()
            
            res.status(StatusCodes.OK).json(randomSampleProduct)
        }
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleRandomProductFailure)

// Get most recent fruits or vegetables
router.get("/recent", async (req, res, next) => {
    fileLogger.info("Request received for /products/recent")
    const { type = "", amount = 1 } = req.query
    // .info(req.query)
    try {
        const mostRecentResults = await Product.find()
                                                .where("vegetation_type", new RegExp(type, "i"))
                                                .sort({ added_at: -1 })
                                                .limit(parseInt(amount))
                                                .exec()
        // .info(mostRecentResults)
        res.status(StatusCodes.OK).json(mostRecentResults)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoRecentResultsFoundError)


// Get Product at ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        fileLogger.info(`Request received for /products/${id}`)
        const productAtId = await Product.findById(id).populate().exec()
        res.status(StatusCodes.OK).json(productAtId)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoProductsFoundError)



// Get reviews for a single product
router.get("/:id/reviews", async (req, res, next) => {
    const { id } = req.params
    try {
        fileLogger.info(`Request received for /products/${id}/reviews`)
        const productReviewsById = await Product.findById(id).select("reviews").populate("reviews.customer").exec()
        const productReviews = productReviewsById.reviews
        const reviewStatistics = await getReviewStatistics(productReviews)
        const reviewResults = {
            reviews: productReviews,
            reviewStatistics: reviewStatistics
        }
        res.status(StatusCodes.OK).json(reviewResults)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoReviewsFoundError)

// Calculate rating and review statistics for a single produc
// router.get("/:id/reviews/stats", async (req, res, next) => {
//     const { id } = req.params
//     try {
//         .info(`Request received for /products/${id}/reviews/stats`)
//         const 
//     } catch (err) {
//         fileLogger.error(err)
//         next(err)
//     }
// })

// router.use(handleRatingStatFailure)

module.exports = router;