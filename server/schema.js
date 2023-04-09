const mongoose = require("mongoose");
const { Schema, Decimal128 } = mongoose
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Subschemas

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    read_duration: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
})

const phoneSchema = new Schema({
    number_type: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
})

const contactSchema = new Schema({
    phone_book: [{
        type: phoneSchema,
        required: true,
    }],

    // REMINDER: SET EMAIL FIELD TO UNIQUE AFTER TESTING
    email: {
        type: String,
        required: true,
    }
})

const rewardStatisticsSchema = new Schema({
    // Bronze, Silver, Gold, Platinum, Diamond
    tier: {
        type: String,
        required: true,
    },
    // 1  to 10
    rank: {
        type: Number,
        required: true,
    },
    point_balance: {
        type: Number,
        required: true,
    },
    point_total: {
        type: Number,
        required: true,
    },
})

const benefitSchema = new Schema({
    rank: {
        type: String,
        required: true,
    },
    titular_description: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const addressSchema = new Schema({
    address_one: {
        type: String,
        required: true,
    },
    address_two: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    }
})

const stockSchema = new Schema({
    size_name: {
        type: String,
        required: true,
    },
    size_item_count: {
        type: Number,
        required: true,
    },
    size_stock: {
        type: Number,
        required: true,
    }
})

const shoppingListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
})

const vendorReviewSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
})

const productReviewSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
})

const orderSchema = new Schema ({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    placed_at: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
})

const rewardOrderSchema = new Schema ({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    placed_at: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
})

const transactionSchema = new Schema ({
    order: {
        type: orderSchema,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    shipping_address: {
        type: String,
        required: true,
    },
    billing_address: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    }
})








const rewardsTransactionSchema = new Schema({
    order: {
        type: rewardOrderSchema,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    point_total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    shipping_address: {
        type: addressSchema,
        required: true,
    },
    billing_address: {
        type: addressSchema,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    }
})

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
});

// Main Schemas





const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
});

const rewardsProgramSchema = new Schema({
    tier_name: {
        type: String,
        required: true,
    },
    benefits: [{
        type: benefitSchema,
        required: true,
    }],
    tier_card_url: {
        type: String,
        required: true,
    },
})



const customerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    cart: [{
        type: cartItemSchema,
        required: true.valueOf,
    }],
    shopping_lists: [{
        type: shoppingListSchema,
        required: true,
    }],

    joined_at: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: contactSchema,
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    avatar_url: {
        type: String,
        required: false,
    },
    reward_program: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    reward_statistics: {
        type: rewardStatisticsSchema,
        required: true,
    },
    reward_transactions: [{
        type: rewardsTransactionSchema,
        required: true,
        default: [],
    }],
    transactions: [{
        type: transactionSchema,
        required: true,
        default: [],
    }],
    testimonial: {
        type: testimonialSchema,
        required: false,
    }
});


  const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    
    image_url: {
        type: String,
        required: true,
    },

    stock: [{
        type: stockSchema,
        required: true,
    }],

    reviews: [{
        type: productReviewSchema,
        required: true,
        default: [],
    }],

    tags: [{
        type: String,
        default: [],
    }],
})


const vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    reviews: [{
        type: vendorReviewSchema,
        required: true,
        default: [],
    }],
    specialities: [{
        type: String,
        required: true,
        default: [],
    }],
    joined_at: {
        type: Date,
        required: true,
    },
    contact: {
        type: contactSchema,
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    blog_posts: [{
        type: blogPostSchema,
        required: true,
        default: [],
    }],
})

const specialitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    }
})


const tagSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
})



const Customer = mongoose.model("Customer",customerSchema)
const Testimonial = mongoose.model("Testimonial",testimonialSchema)
const Stock = mongoose.model("Stock",stockSchema)
const Phone = mongoose.model("Phone",phoneSchema)
const Contact = mongoose.model("Contact",contactSchema)
const RewardTrack = mongoose.model("RewardTrack",rewardTrackSchema)
const Benefit = mongoose.model("Benefit",benefitSchema)
const Address = mongoose.model("Address",addressSchema)
const ShoppingList = mongoose.model("ShoppingList",shoppingListSchema)
const Vendor = mongoose.model("Vendor",vendorSchema)
const Product = mongoose.model("Product",productSchema)
const Tag = mongoose.model("Tag",tagSchema)
const Speciality = mongoose.model("Speciality",specialitySchema)

const CartItem = mongoose.model("CartItem",cartItemSchema)
const Order = mongoose.model("Order",orderSchema)
const Transaction = mongoose.model("Transaction",transactionSchema)
const ProductReview = mongoose.model("ProductReview",productReviewSchema)
const VendorReview = mongoose.model("VendorReview",vendorReviewSchema)
const RewardsProgram = mongoose.model("RewardsProgram",rewardsProgramSchema)
const RewardsTransaction = mongoose.model("RewardsTransaction",rewardsTransactionSchema)
const BlogPost = mongoose.model("BlogPost",blogPostSchema)
module.exports = {
    Customer,
    Testimonial,
    Stock,
    Phone,
    Contact,
    RewardTrack,
    Benefit,
    Address,
    ShoppingList,
    Vendor,
    Product,
    Tag,
    Speciality,
    CartItem,
    Order,
    Transaction,
    ProductReview,
    VendorReview,
    RewardsProgram,
    RewardsTransaction,
    BlogPost,
}
