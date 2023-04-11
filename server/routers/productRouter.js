const express = require("express");
const { fileLogger, consoleLogger } = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();
const { handleProductNotFoundError, handleRandomProductFailure, handleNoProductsFoundError, handleNoReviewsFoundError, handleRatingStatFailure } = require("../errorhandling/errors.js");
const { StatusCodes } = require("http-status-codes");
const  paginate  = require("../tools/paginate.js")
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
        minrating = parseInt(minrating) || 0;
        maxrating = parseInt(maxrating) || 5;
        limit = parseInt(limit) || 12;

        const productsByFilter = await Product.find({ 
            name: { $regex: name, $options: "i" },
            price: { $gte: minprice, $lte: maxprice },
            vegetation_type: { $regex: type, $options: "i" },
        }).exec();
        console.log(productsByFilter)
        const pageResults = await paginate(productsByFilter, page, limit)
        consoleLogger.info(pageResults)
        res.status(StatusCodes.OK).json(pageResults)
        // } else {
        //     page = 1;
        //     limit = 12;
        //     fileLogger.info("Request received for /products")
        //     const allProducts = await Product.find({}).exec()
        //     const pageResults = await paginate(allProducts, page, limit)
        //     res.status(StatusCodes.OK).json(pageResults)
        // }
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
            const randomSampleProduct = await Product.aggregate().sample(parseInt(num)).exec()
            consoleLogger.info(randomSampleProduct)
            res.status(StatusCodes.OK).json(randomSampleProduct)
        } else {
            fileLogger.info("Request received for /products/random")
            const randomSampleProducts = await Product.aggregate().sample(1).exec()
            res.status(StatusCodes.OK).json(randomSampleProducts)
        }
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleRandomProductFailure)


// Get Product at ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        fileLogger.info(`Request received for /products/${id}`)
        const productAtId = await Product.findById(id).populate({path: "carts", select: "first_name last_name cart"})
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
        const productReviews = await Product.findById(id).select("reviews").exec()
        res.status(StatusCodes.OK).json(productReviews)
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleNoReviewsFoundError)

// Calculate rating and review statistics for a single produc
router.get("/:id/reviews/stats", async (req, res, next) => {
    const { id } = req.params
    try {
        consoleLogger.info(`Request received for /products/${id}/reviews/stats`)
        Product.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            { $project: { _id: 0, reviews: 1 } },
            { $unwind: "$reviews" },
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$reviews.rating" },
                numberOfReviews: { $sum: 1 }
              }
            }
          ])
          .exec((err, result) => {
            if (err) {
              console.error(err);
              next(err);
            } else {
              res.status(200).json(result);
            }
          });
    } catch (err) {
        fileLogger.error(err)
        next(err)
    }
})

router.use(handleRatingStatFailure)

module.exports = router;