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

const createVendors = async (num) => {
    const vendors = [];
    for (let i = 0; i < num; i++) {
        const vendor = new Vendor({
            name: faker.company.companyName(),
            slogan: faker.company.catchPhrase(),
            description: faker.company.bs(),
            image_url: faker.image.imageUrl(),
            inventory: [],
        })
        vendors.push(vendor)
    }
    return vendors
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
            } else {
                customer.cart.push(cartItem)

            }
        }
        customersWithProducts.push(customer)
    }
    return customersWithProducts
}

const createCustomerShoppingLists = async (num) => {
    const shoppingLists = [];
    for (let i = 0; i < num; i++) {
        const shoppingList = new ShoppingList({
            name: faker.commerce.productAdjective(),
            items: [],
        })
        shoppingLists.push(shoppingList)
    }
    return shoppingLists
}

// Assign items to each customer's shopping list
// If an item is already in a customer's shopping list, don't add it
const assignItemsToShoppingLists = async (shoppingLists, products) => {
    const shoppingListsWithItems = [];
    for(shoppingList of shoppingLists) {
        const numItems = getRandomNumberBasedOnMax(products.length);
        for (let i = 0; i < numItems; i++) {
            const randomItem = getRandomItem(products);
            if(!shoppingList.items.some(item => item.equals(randomItem))) {
                shoppingList.items.push(randomItem)
            }
        }
        shoppingListsWithItems.push(shoppingList)
    }
    return shoppingListsWithItems
}

const assignShoppingListsToCustomers = async (customers, shoppingLists) => {
    const customersWithShoppingLists = [];
    for(customer of customers) {
        const numShoppingLists = getRandomNumberBasedOnMax(shoppingLists.length);
        for (let i = 0; i < numShoppingLists; i++) {
            const shoppingList = getRandomItem(shoppingLists);
            if(!customer.shopping_lists.some(list => list.equals(shoppingList))) {
                customer.shopping_lists.push(shoppingList)
            }
        }
        customersWithShoppingLists.push(customer)
    }
    return customersWithShoppingLists
}

// Create a random number of reviews for each product
const createProductReviews = async (num, products, customers) => {
    const reviews = [];
    for (let i = 0; i < num; i++) {
        const review = new ProductReview({
            customer: getRandomItem(customers)._id,
            rating: getRandomNumberBasedOnMax(5),
            title: faker.commerce.productAdjective(),
            body: faker.lorem.paragraph(),
            image_url: faker.image.imageUrl(),
        })
        reviews.push(review)
    }
    return reviews
}

// Assign reviews to products
const assignReviewsToProducts = async (products, reviews) => {
    const productsWithReviews = [];
    for(product of products) {
        const numReviews = getRandomNumberBasedOnMax(reviews.length);
        for (let i = 0; i < numReviews; i++) {
            const review = getRandomItem(reviews);
            if(!product.reviews.some(review => review.equals(review))) {
                product.reviews.push(review)
            }
        }
        productsWithReviews.push(product)
    }
    return productsWithReviews
}

// // Assign the ProductReviews that correspond to the customer's id  to the Customer's product_reviews array 
// const assignProductReviewsToCustomers = async (customers, products) => {
//     const customersWithProductReviews = [];
//     for(customer of customers) {
//         for(product of products) {
//             for(review of product.reviews) {
//                 if(review.customer.equals(customer._id)) {
//                     customer.product_reviews.push(review.customer)
//                 }
//             }
//         }
//         customersWithProductReviews.push(customer)
//     }
//     return customersWithProductReviews
// }




// Create a random number of reviews for each vendor
const createVendorReviews = async (num, vendors, customers) => {
    const reviews = [];
    for (let i = 0; i < num; i++) {
        const review = new VendorReview({
            customer: getRandomItem(customers)._id,
            rating: getRandomNumberBasedOnMax(5),
            title: faker.commerce.productAdjective(),
            body: faker.lorem.paragraph(),
        })
        reviews.push(review)
    }
    return reviews
}

// Assign reviews to vendors
const assignReviewsToVendors = async (vendors, reviews) => {
    const vendorsWithReviews = [];
    for(vendor of vendors) {
        const numReviews = getRandomNumberBasedOnMax(reviews.length);
        for (let i = 0; i < numReviews; i++) {
            const review = getRandomItem(reviews);
            if(!vendor.reviews.some(review => review.equals(review))) {
                vendor.reviews.push(review)
            }
        }
        vendorsWithReviews.push(vendor)
    }
    return vendorsWithReviews
}

// // Assign the VendorReviews that correspond to the customer's id  to the Customer's vendor_reviews array
// const assignVendorReviewsToCustomers = async (customers, vendors) => {
//     const customersWithVendorReviews = [];
//     for(customer of customers) {
//         for(vendor of vendors) {
//             for(review of vendor.reviews) {
//                 if(review.customer.equals(customer._id)) {
//                     customer.vendor_reviews.push(review.customer)
//                 }
//             }
//         }
//         customersWithVendorReviews.push(customer)
//     }
//     return customersWithVendorReviews
// }


// All products in the Product collection belongs to exactly one vendor
// So whatever product is assigned to a vendor, remove it from the products array
// Create a copy of the products array to avoid mutating the original array
const assignProductsToVendors = async (vendors, products) => {
    const vendorsWithProducts = [];
    const productsCopy = [...products];
    for(vendor of vendors) {
        const numProducts = getRandomNumberBasedOnMax(products.length);
        for (let i = 0; i < numProducts; i++) {
            const product = getRandomItem(productsCopy);
            if(!product) break;
            vendor.inventory.push(product._id);
            console.log("Product pushed")
            productsCopy.splice(productsCopy.indexOf(product), 1)
        }
        vendorsWithProducts.push(vendor)
    }
    return vendorsWithProducts
}







const seed = async () => {
    await deleteCollections();
    const customers = await createCustomers(5);
    const vendors = await createVendors(5);
    const products = await createProducts(20);
    const customersWithProducts = await assignProductsToCustomers(customers, products);
    const shoppingLists = await createCustomerShoppingLists(5);
    const shoppingListsWithItems = await assignItemsToShoppingLists(shoppingLists, products);
    const customersWithShoppingLists = await assignShoppingListsToCustomers(customersWithProducts, shoppingListsWithItems);
    
    const productReviews = await createProductReviews(20, products, customers);
    const productsWithReviews = await assignReviewsToProducts(products, productReviews);

    const vendorReviews = await createVendorReviews(20, vendors, customers);
    const vendorsWithReviews = await assignReviewsToVendors(vendors, vendorReviews);

    const vendorsWithProducts = await assignProductsToVendors(vendors, products);

    await Product.insertMany(products)
    await Customer.insertMany(customersWithShoppingLists)
    await Vendor.insertMany(vendorsWithProducts)



    await mongoose.disconnect()
}


seed()






