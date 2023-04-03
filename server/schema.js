const mongoose = require("mongoose");
const { Schema } = mongoose
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

const testimonialSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    }
});

const Customer = mongoose.model("Customer",customerSchema)
const Testimonial = mongoose.model("Testimonial",testimonialSchema)

module.exports = {
    Customer,
    Testimonial
}
