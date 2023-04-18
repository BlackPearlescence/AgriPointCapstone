const express = require('express');
const { consoleLogger } = require('../errorhandling/logger');   
const sgMail = require("@sendgrid/mail");
const { StatusCodes } = require('http-status-codes');
const { Customer } = require('../schema');

const router = express.Router();
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// router.get("/send-newsletter-confirmation/:customerId", async (req, res, next) => {
//     const customer = await Customer.findById(req.params.customerId);
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });


//     const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: customer.username,
//         subject: "Newsletter Confirmation",
//         text: "Thank you for subscribing to our newsletter!"
//     }

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         consoleLogger.info(`Message sent: ${info.messageId}`);
//         res.status(StatusCodes.OK).send(info);
//     } catch (err) {
//         next(err)
//     }
// });


router.post("/send-newsletter-confirmation-no-auth", async (req, res, next) => {
    const msg = {
        to: req.body.username,
        from: process.env.EMAIL_USERNAME,
        subject: "Newsletter Confirmation",
        text: "Thank you for subscribing to our newsletter!",
        html: "<strong>Thank you for subscribing to our newsletter!</strong>",
    }

    sgMail
        .send(msg)
        .then(() => {
            consoleLogger.info("Email sent");
            res.status(StatusCodes.OK).send("Email sent");
        })
        .catch((err) => {
            consoleLogger.info(err);
            next(err);
        })
});


module.exports = router;