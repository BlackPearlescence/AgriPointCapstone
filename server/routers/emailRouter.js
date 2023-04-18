const express = require('express');
const { consoleLogger } = require('../errorhandling/logger');   
const nodemailer = require("nodemailer")
const { StatusCodes } = require('http-status-codes');
const { Customer } = require('../schema');
const router = express.Router();
require('dotenv').config()

router.get("/send-newsletter-confirmation/:customerId", async (req, res, next) => {
    const customer = await Customer.findById(req.params.customerId);
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
        to: customer.username,
        subject: "Newsletter Confirmation",
        text: "Thank you for subscribing to our newsletter!"
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        consoleLogger.info(`Message sent: ${info.messageId}`);
        res.status(StatusCodes.OK).send(info);
    } catch (err) {
        next(err)
    }
});


router.post("/send-newsletter-confirmation-no-auth", async (req, res, next) => {
    const { username } = req.body;
    console.log(username)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: username,
        subject: "Newsletter Confirmation",
        text: "Thank you for subscribing to our newsletter!"
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        consoleLogger.info(`Message sent: ${info.messageId}`);
        res.status(StatusCodes.OK).send(info);
    } catch (err) {
        next(err)
    }
});


module.exports = router;