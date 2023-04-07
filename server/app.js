const express = require("express");
const { Customer, Testimonial } = require("./schema.js")
const mongoose = require("mongoose");
const morgan = require("morgan")
const { handleInternalServerError } = require("./errorhandling/errors.js");
require("dotenv").config()

const { MONGO_CONNECTION_STRING } = process.env
const app = express()
app.use(morgan("dev"))


mongoose.connect(MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Get all customers
app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find({}).exec()
        res.status(200).json(customers)
    } catch (err) {
        res.status(404).json({"error":"No customers."})
    }
})

// Get customer by id
app.get("/customers/:id", async (req,res) => {
    const customerId = req.params.id;
    try {
        const customer = await Customer.findById(customerId)
        res.status(200).json(customer)
    } catch(err) {
        res.status(404).json({"error":"No such customer."})
    }
})


// Get all testimonials
app.get("/testimonials", async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).populate("customer");
        res.status(200).json(testimonials)
    } catch (err) {
        res.status(404).json({"error":"No testimonials."})
    }
})

// Get testimonial by id
app.get("/testimonials/:id", async (req, res) => {
    const testimonialId = req.params.id;
    try {
        const testimonial = await Testimonial.findById(testimonialId).populate("customer");
        res.status(200).json(testimonial)
    } catch (err) {
        console.error(err.message)
        res.status(404).send({"error":"No such testimonial."})
    }
})


// server shutdown handling
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Database connection closed!")
        process.exit(0)
    })
})

// Final Error Handling Middleware
app.use((err, req, res, next) => {
    handleInternalServerError(err);
    res.status(err.statusCode).json({"error": {
        "code": err.statusCode,
        "name": err.name,
        "message": err.message
    }});
})


// Create server
const host = "http://localhost";
const port = 9000;
app.listen(port, () => {
    console.log(`Server is listening on ${host}:${port}`)
})