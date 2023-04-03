const express = require("express");
const app = express();
const { Customer, Testimonial } = require("./schema.js")
const mongoose = require("mongoose")
require("dotenv").config()

const { MONGO_CONNECTION_STRING } = process.env


mongoose.co

app.get("/testimonials", (req, res) => {
    C
})