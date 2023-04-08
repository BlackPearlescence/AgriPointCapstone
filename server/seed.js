const { 
    Customer,
    Testimonial,
    Phone,
    Contact,
    RewardTrack,
    Benefit,
    Address,
    ShoppingList,
    Vendor,
    Product,
    Tag,
    CartItem,
    Order,
    Transaction,
    ProductReview,
    VendorReview,
    RewardsProgram,
    RewardsTransaction,
    BlogPost,
    Stock, } = require("./schema.js");

const { getRandomItem, getRandomNumberBasedOnMax } = require("./seedfunctions.js");

const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose");
const async = require("async");
const e = require("express");
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const deleteCollections = async () => {
    await Customer.deleteMany({});
    await Testimonial.deleteMany({});
    await Phone.deleteMany({});
    await Contact.deleteMany({});
    await RewardTrack.deleteMany({});
    await Benefit.deleteMany({});
    await Address.deleteMany({});
    await ShoppingList.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    await Tag.deleteMany({});
    await CartItem.deleteMany({});
    await Order.deleteMany({});
    await Transaction.deleteMany({});
    await ProductReview.deleteMany({});
    await VendorReview.deleteMany({});
    await RewardsProgram.deleteMany({});
    await RewardsTransaction.deleteMany({});
    await BlogPost.deleteMany({});
    await Stock.deleteMany({});
}

const createCustomers = async (num) => {
    const customers = [];
    for (let i = 0; i < num; i++) {
        const customer = new Customer({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            cart: [],
        })
        customers.push(customer)
    }
    return customers
}

// Product stocks represent the number of products available based on size
const createProductStocks = async (num) => {
    const stocks = [];
    for (let i = 0; i < num; i++) {
        const stock = new Stock({
            size_name: faker.commerce.productAdjective(),
            size_item_count: faker.datatype.number(),
            size_stock: faker.datatype.number(),
        })
        stocks.push(stock)
    }
    return stocks
}

const createProducts = async (num) => {
    const products = [];
    const stocks = await createProductStocks(4);
    for (let i = 0; i < num; i++) {
        const product = new Product({
            name: faker.commerce.productName(),
            type: faker.commerce.productMaterial(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            image_url: faker.image.imageUrl(),
            stock: stocks,
        })
        products.push(product)
    }
    return products
}

// Assign a random number of products to each customer's cart
// If a product is already in a customer's cart, increment the quantity
const assignProductsToCustomers = async (customers, products) => {
    const customersWithProducts = [];
    for(customer of customers) {
        const numProducts = getRandomNumberBasedOnMax(products.length);
        for (let i = 0; i < numProducts; i++) {
            // Create CartItem
            const cartItem = new CartItem({
                product: getRandomItem(products)._id,
                quantity: 1,
            })
            // Assign CartItem to customer
            // If cartItem is already in customer's cart, increment quantity
            if(customer.cart.some(item => item.product.equals(cartItem.product))) {
                customer.cart.find(item => item.product.equals(cartItem.product)).quantity += 1
                console.log("found cartItem")
            } else {
                customer.cart.push(cartItem)

            }
        }
        customersWithProducts.push(customer)
    }
    return customersWithProducts
}






const seed = async () => {
    await deleteCollections();
    const customers = await createCustomers(5);
    const products = await createProducts(10);
    const customersWithProducts = await assignProductsToCustomers(customers, products);

    await Product.insertMany(products)
    await Customer.insertMany(customersWithProducts)



    await mongoose.disconnect()
}


seed()






