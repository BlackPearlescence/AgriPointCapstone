const mongoose = require("mongoose");
const { Schema, Decimal128 } = mongoose
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Subschemas

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

const rewardTrackSchema = new Schema({
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
    size_quantity: {
        type: Number,
        required: true,
    },
    size_stock: {
        type: Number,
        required: true,
    }
})

const cartSchema = new Schema ({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
    },
})


// Main Schemas

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

testimonialSchema.pre("find", async (next) => {
    if (this.options._recursed){
        return next()
    }
    this.populate({ path: "customer", options: {_recursed: true } });
    next();
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
    reward_track: {
        type: rewardTrackSchema,
        required: false,
    },
    shopping_lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShoppingList"
    }],
    cart : [{
        type: cartSchema,
        required: true,
        default: []
    }]
});

// customerSchema.pre("findById",  function(next){
//     if(this.options._recursed) {
//         return next();
//     }
//     this.populate({path: "cart.product", select: "name price", options: {_recursed: true}}).exec()
//     next()
// })

const shopppingListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
})

shopppingListSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populates({ path: "items customer", options: {_recursed: true} })
    next()
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

    image_url: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VendorReview"
    }],
    blog_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost"
    }],
})

vendorSchema.pre("find", async (next) => {
    if(this.options._recursed){
        return next()
    }
    this.populates({ path: "products reviews blog_posts", options: {_recursed: true}})
    next()
})

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Decimal128,
        required: true
    },
    stock: [{
        type: stockSchema,
        required: true
    }],
    image_url: {
        type: String,
        required: true,
    },

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductReview"
    }],

    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }]
})

// productSchema.virtual('cartItems', {
//     ref: 'Customer',
//     localField: '_id',
//     foreignField: 'cart.product'
// });

// productSchema.pre("findById", async (next) => {
//     if(this.options._recursed) {
//         return next()
//     }
//     this.populate({ path: "cart", options: { _recursed: true }});
//     next();
// })

const tagSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }
})



// cartSchema.pre("find", async (next) => {
//     if(this.options._recursed) {
//         return next()
//     }
//     this.populate({ path: "product customer", options: {__recursed: true}})
//     next()
// })

const orderSchema = new Schema ({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    placed_at: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

orderSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populate({ path: "products customer", options: {__recursed: true}})
    next()
})

const transactionSchema = new Schema ({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    date: {
        type: Date,
        required: true,
    },
    total: {
        type: Decimal128,
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

transactionSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populate({ path: "order products customer", options: {__recursed: true}})
    next()
})

const productReviewSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
})

productReviewSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populate({ path: "product customer", options: {__recursed: true}})
    next()
})

const vendorReviewSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

vendorReviewSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populate({ path: "vendor customer", options: {__recursed: true}})
    next()
})

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

const rewardsTransactionSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    date: {
        type: Date,
        required: true,
    },
    total: {
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

rewardsTransactionSchema.pre("find", async (next) => {
    if(this.options._recursed) {
        return next()
    }
    this.populate({ path: "products customer order", options: {__recursed: true}})
    next()
})

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

const Customer = mongoose.model("Customer",customerSchema)
const Testimonial = mongoose.model("Testimonial",testimonialSchema)
const Stock = mongoose.model("Stock",stockSchema)
const Phone = mongoose.model("Phone",phoneSchema)
const Contact = mongoose.model("Contact",contactSchema)
const RewardTrack = mongoose.model("RewardTrack",rewardTrackSchema)
const Benefit = mongoose.model("Benefit",benefitSchema)
const Address = mongoose.model("Address",addressSchema)
const ShoppingList = mongoose.model("ShoppingList",shopppingListSchema)
const Vendor = mongoose.model("Vendor",vendorSchema)
const Product = mongoose.model("Product",productSchema)
const Tag = mongoose.model("Tag",tagSchema)
const Cart = mongoose.model("Cart",cartSchema)
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
    Cart,
    Order,
    Transaction,
    ProductReview,
    VendorReview,
    RewardsProgram,
    RewardsTransaction,
    BlogPost,
}
