const agenda = require("./agenda.js");
const { consoleLogger, fileLogger } = require("../errorhandling/logger");
const mongoose = require("mongoose");
const { Customer } = require("../schema");
require('dotenv').config()
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



// Look for customers who have a cart that is not empty
const cartReminder =  async (job) => {
    const customers = await Customer.find({ "cart": { $ne: [] } });
    consoleLogger.info("Customers with non-empty carts: ", customers);
    customers.forEach(async (customer) => {
        const msg = {
            to: customer.username,
            from: process.env.EMAIL_USERNAME,
            subject: "Reminder: You still have items in your cart!",
            text: "You still have items in your cart! Please visit our website to complete your purchase.",
            html: "<strong>You still have items in your cart! Please visit our website to complete your purchase.</strong>",
        }

        sgMail
            .send(msg)
            .then(() => {
                fileLogger.info("Cart Reminder Email sent");
            })
            .catch((err) => {
                fileLogger.info(err);
            })
    })
}

module.exports = {
    cartReminder
}

