const express = require("express");
const logger = require("../errorhandling/logger");
const { Product } = require("../schema.js");
const mongoose = require("mongoose");
const router = express.Router();

// Base /products

router.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find({}).exec()
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(404).json({"error": {
            "code": 404,
            "message": "No products",
            "details": "There are no products that exist."
        }})
    }
})


module.exports = router;