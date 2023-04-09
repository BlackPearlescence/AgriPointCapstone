const express = require("express");
const { Customer, Testimonial } = require("./schema.js")
const mongoose = require("mongoose");
const morgan = require("morgan")
const { handleInternalServerError } = require("./errorhandling/errors.js");
const productRouter = require("./routers/productRouter.js")
const customerRouter = require("./routers/customerRouter.js");
const vendorRouter = require("./routers/vendorRouter.js");
const { consoleLogger, fileLogger } = require("./errorhandling/logger.js");
require("dotenv").config()

const { MONGO_CONNECTION_STRING } = process.env
const app = express()
app.use(morgan("dev"))


mongoose.connect(MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get("/", async (req, res) => {
    res.status(200).send("Welcome to the AgriPoint REST API!")
})

// Routers
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/vendors", vendorRouter);


// // Get all testimonials
// app.get("/testimonials", async (req, res) => {
//     try {
//         const testimonials = await Testimonial.find({}).populate("customer");
//         res.status(200).json(testimonials)
//     } catch (err) {
//         res.status(404).json({"error":"No testimonials."})
//     }
// })

// // Get testimonial by id
// app.get("/testimonials/:id", async (req, res) => {
//     const testimonialId = req.params.id;
//     try {
//         const testimonial = await Testimonial.findById(testimonialId).populate("customer");
//         res.status(200).json(testimonial)
//     } catch (err) {
//         console.error(err.message)
//         res.status(404).send({"error":"No such testimonial."})
//     }
// })


// server shutdown handling
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Database connection closed!")
        process.exit(0)
    })
})

// Finalize Error Decision
app.use(handleInternalServerError)

// Final Error Handling Middleware
app.use((err, req, res, next) => {
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
    consoleLogger.info(`Server is listening on ${host}:${port}!`)
})