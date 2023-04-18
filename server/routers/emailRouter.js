const express = require('express');
const { consoleLogger } = require('../errorhandling/logger');   
const nodemailer = require("nodemailer")
const { StatusCodes } = require('http-status-codes');
const { Customer } = require('../schema');
const router = express.Router();
require('dotenv').config()

router.get("/send-newsletter-confirmation/:customerId", async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
    }
});


