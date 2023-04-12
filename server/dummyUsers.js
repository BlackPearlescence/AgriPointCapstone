const { Customer } = require("./schema.js")
const mongoose = require("mongoose");
require("dotenv").config()

const { MONGO_CONNECTION_STRING } = process.env 


mongoose.connect(MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

Customer.register( { username: "candy1", active: false }, "cane");
Customer.register( { username: "rot1", active: false }, "away");