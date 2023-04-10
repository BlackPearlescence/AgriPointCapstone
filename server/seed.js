const { 
    Customer,
    Testimonial,
    Phone,
    Contact,
    Benefit,
    Address,
    ShoppingList,
    Vendor,
    Product,
    OrderItem,
    CartItem,
    Order,
    Transaction,
    ProductReview,
    VendorReview,
    RewardsProgram,
    RewardsTransaction,
    BlogPost,
    Stock,
    RewardStatistics, } = require("./schema.js");

const { getRandomItem, getRandomNumberBasedOnMax } = require("./seedfunctions.js");
const Gardeny  = require("./truedata/Gardeny.js");
require("./truedata/Gardeny.js");
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose");
const async = require("async");
const e = require("express");
const { consoleLogger } = require("./errorhandling/logger.js");
// const { default: Gardeny } = require("./truedata/realseed.js");
require("dotenv").config();

const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const gardeny =   new Gardeny();
const largeProductStocks = [
    {
        size_name: "Small Crate",
        size_item_count: 2,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
    {
        size_name: "Medium Crate",
        size_item_count: 4,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
    {
        size_name: "Large Crate",
        size_item_count: 6,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
]

const smallProductStocks = [
    {
        size_name: "Half Dozen",
        size_item_count: 6,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
    {
        size_name: "Dozen",
        size_item_count: 12,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
    {
        size_name: "Two Dozen",
        size_item_count: 24,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
    {
        size_name: "Three Dozen",
        size_item_count: 36,
        size_stock:  faker.datatype.number({ min: 0, max: 10 }),
    },
]

const loadNewProducts = async () => {
    // Gardeny Seeder
   
    return newProducts
}

const deleteCollections = async () => {
    await Customer.deleteMany({});
    await Testimonial.deleteMany({});
    await Phone.deleteMany({});
    await Contact.deleteMany({});
    await RewardStatistics.deleteMany({});
    await Benefit.deleteMany({});
    await Address.deleteMany({});
    await ShoppingList.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    await CartItem.deleteMany({});
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    await Transaction.deleteMany({});
    await ProductReview.deleteMany({});
    await VendorReview.deleteMany({});
    await RewardsProgram.deleteMany({});
    await RewardsTransaction.deleteMany({});
    await BlogPost.deleteMany({});
    await Stock.deleteMany({});
}

const createSpecialities = async (num) => {
    const specialities = [];
    for (let i = 0; i < num; i++) {
        specialities.push(faker.commerce.productAdjective())
    }
    return specialities
}

const createTags = async (num) => {
    const tags = [];
    for (let i = 0; i < num; i++) {
        tags.push(faker.commerce.productMaterial())
    }
    return tags
}

const createRewardProgramBenefits = async (num) => {
    const benefits = [];
    for (let i = 0; i < num; i++) {
        benefit = new Benefit({
            rank: i,
            titular_description: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
        })
        benefits.push(benefit)
    }
}

const createRewardsPrograms = async (num) => {
    const rewardsPrograms = [];
    for (let i = 0; i < num; i++) {
        benefitList = await createRewardProgramBenefits(getRandomNumberBasedOnMax(5))
        const rewardsProgram = new RewardsProgram({
            tier_name: faker.science.chemicalElement(),
            tier_description: faker.lorem.sentence(),
            benefits: benefitList,
            tier_card_url: faker.image.imageUrl(),
        })
        rewardsPrograms.push(rewardsProgram)
    }
    return rewardsPrograms
}

const createTestimonials = async (num) => {
    const testimonials = [];
    for (let i = 0; i < num; i++) {
        const testimonial = new Testimonial({
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            rating: getRandomNumberBasedOnMax(5),
        })
        testimonials.push(testimonial)
    }
    return testimonials
}


const createOneRewardStatistics = async () => {
    const rewardStatistics = new RewardStatistics({
        tier: faker.science.chemicalElement(),
        rank: getRandomNumberBasedOnMax(10),
        point_balance: getRandomNumberBasedOnMax(1000),
        point_total: getRandomNumberBasedOnMax(1000),
    })
    return rewardStatistics
}


const createCustomers = async (num, rewardsPrograms) => {
    const customers = [];
    const testimonials = await createTestimonials(getRandomNumberBasedOnMax(5))
    const randomTestimonial = await getRandomItem(testimonials)
    for (let i = 0; i < num; i++) {
        const customer = new Customer({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            addresses: [new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            })],
            joined_at: faker.date.past(),
            avatar_url: faker.image.imageUrl(),
            cart: [],
            shopping_lists: [],
            reward_program: await getRandomItem(rewardsPrograms),
            reward_statistics: new RewardStatistics({
                tier: faker.lorem.word(),
                rank: await getRandomNumberBasedOnMax(10),
                point_balance: await getRandomNumberBasedOnMax(1000),
                point_total: await getRandomNumberBasedOnMax(1000),
            }),
            reward_transactions: [],
            transactions: [],
            testimonial: randomTestimonial,
        })
        customers.push(customer)
    }
    return customers
}



const createVendors = async (num) => {
    const vendors = [];
    // const specialities = await createSpecialities(getRandomNumberBasedOnMax(5))
    for (let i = 0; i < num; i++) {
        const newVendor = await gardeny.newVendor()
        await newVendor
        console.log(newVendor)
        const vendor = new Vendor({
            name: newVendor.name,
            slogan: faker.company.catchPhrase(),
            description: faker.company.bs(),
            image_url: newVendor.link,
            email: faker.internet.email(),
            phone_numbers: [faker.phone.number()],
            joined_at: faker.date.past(),
            specialities: newVendor.specialities,
            reviews: [],
            address: new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }),
            blog_posts: [],
            inventory: [],
        })
        vendors.push(vendor)
    }
    return vendors
}


// Product stocks represent the number of products available based on size
const createProductStocks = async () => {
    const stocks = [];
    // Randomly choose smallstock or largestock
    const stockList = await getRandomItem([smallProductStocks, largeProductStocks])
    for (singleStock of stockList) {
        const stock = await new Stock({
            size_name: singleStock.size_name,
            size_item_count: singleStock.size_item_count,
            size_stock: singleStock.size_stock,
        })
        stocks.push(stock)
    }
    return stocks
}

const createProducts = async (num) => {
    const products = [];
    const newProducts = Array.from({ length: num }, async () => await gardeny.newProduct())
    console.log(newProducts)
    for (i = 0; i < num; i++) {
        const newProduct = await gardeny.newProduct()
        await newProduct
        const stocks = await createProductStocks(newProduct.stock);
        const { name, type, link, tags } = newProduct
        console.log(name,type,link,tags)
        const product = new Product({
            name: await newProduct.name,
            type: await newProduct.type,
            description: faker.lorem.paragraph(),
            price: faker.commerce.price(),
            image_url: await newProduct.link,
            vegetation_type: newProduct.vegetationType,
            stock: stocks,
            reviews: [],
            tags: await newProduct.tags,
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
                size: getRandomItem(products[0].stock).size_name,
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
        const numProducts = await getRandomNumberBasedOnMax(products.length);
        for (let i = 0; i < numProducts; i++) {
            const product = await getRandomItem(productsCopy);
            if(!product) break;
            product.vendor = vendor._id;
            await vendor.inventory.push(product._id);
            // New property to store the vendor's id
            productsCopy.splice(productsCopy.indexOf(product), 1)
        }
        vendorsWithProducts.push(vendor)
    }
    return vendorsWithProducts
}

const createOrders = async (num, customers, products) => {
    const orders = [];
    for (let i = 0; i < num; i++) {
        const order = new Order({
            order_items: [],
            placed_at: await faker.date.past(),
            status: await getRandomItem(['pending', 'fulfilled', 'cancelled']),
        })
        const numProducts = await getRandomNumberBasedOnMax(products.length);
        for (let i = 0; i < numProducts; i++) {
            const product = await getRandomItem(products);
            order.order_items.push(new OrderItem({
                product: product._id,
                quantity: await getRandomNumberBasedOnMax(10),
                price: product.price,
                size: await getRandomItem(['small', 'medium', 'large']),
            }))
        }
        orders.push(order)
    }
    return orders
}

const createTransactions = async (num, customers, orders) => {
    const transactions = [];
    for (let i = 0; i < num; i++) {
        const transaction = new Transaction({
            order: await getRandomItem(orders),
            date: faker.date.past(),
            total: faker.commerce.price(),
            payment_method: await getRandomItem(['credit card', 'debit card', 'cash']),
            status: await getRandomItem(['pending', 'fulfilled', 'cancelled']),
            shipping_address: new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }),
            billing_address: new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }),
            notes: faker.lorem.paragraph(),
        })
        transactions.push(transaction)
    }
    return transactions
}

const createRewardTransactions = async (num, customers, orders) => {
    const rewardTransactions = [];
    for (let i = 0; i < num; i++) {
        const rewardTransaction = new RewardsTransaction({
            order: await getRandomItem(orders),
            date: faker.date.past(),
            point_total: faker.datatype.number({min: 1, max: 100}),
            status: await getRandomItem(['pending', 'fulfilled', 'cancelled']),
            shipping_address: new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }),
            billing_address: new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }),
            notes: faker.lorem.paragraph(),
        })
        rewardTransactions.push(rewardTransaction)
    }
    return rewardTransactions
}

const assignTransactionsToCustomers = async (customers, transactions) => {
    const customersWithTransactions = [];
    // While there are still transactions left to assign, assign them to a random customer
    while(transactions.length > 0) {
        const customer = await getRandomItem(customers);
        const transaction = await transactions.pop();
        if(transactions){
            customer.transactions.push(transaction)
            customersWithTransactions.push(customer)
        }
        
    }
    return customersWithTransactions
}

const assignRewardTransactionsToCustomers = async (customers, rewardTransactions) => {
    const customersWithRewardTransactions = [];
    // While there are still transactions left to assign, assign them to a random customer
    while(rewardTransactions.length > 0) {
        const customer = await getRandomItem(customers);
        const rewardTransaction = await rewardTransactions.pop();
        if(rewardTransactions){
            customer.reward_transactions.push(rewardTransaction)
            customersWithRewardTransactions.push(customer)
        }
    }
    return customersWithRewardTransactions
}


const createVendorBlogPosts = async (num, vendors) => {
    const blogPosts = [];
    for (let i = 0; i < num; i++) {
        const blogPost = new BlogPost({
            title: faker.lorem.sentence(),
            heading: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            post: faker.lorem.paragraphs(),
            read_duration: faker.datatype.number({min: 1, max: 10}),
            created_at: faker.date.past(),
        })
        blogPosts.push(blogPost)
    }
    return blogPosts
}

const assignBlogPostsToVendors = async (vendors, blogPosts) => {
    const vendorsWithBlogPosts = [];
    for(vendor of vendors) {
        const numBlogPosts = getRandomNumberBasedOnMax(blogPosts.length);
        for (let i = 0; i < numBlogPosts; i++) {
            const blogPost = getRandomItem(blogPosts);
            vendor.blog_posts.push(blogPost._id)
        }
        vendorsWithBlogPosts.push(vendor)
    }
    return vendorsWithBlogPosts
}









// 




const seed = async () => {
    await deleteCollections();
    const customers = await createCustomers(5);
    const vendors = await createVendors(5);
    const products = await createProducts(100);
    const customersWithProducts = await assignProductsToCustomers(customers, products);
    const shoppingLists = await createCustomerShoppingLists(5);
    const shoppingListsWithItems = await assignItemsToShoppingLists(shoppingLists, products);
    const customersWithShoppingLists = await assignShoppingListsToCustomers(customersWithProducts, shoppingListsWithItems);
    
    const productReviews = await createProductReviews(10, products, customers);
    const productsWithReviews = await assignReviewsToProducts(products, productReviews);

    const vendorReviews = await createVendorReviews(10, vendors, customers);
    const vendorsWithProducts = await assignProductsToVendors(vendors, products);
    const vendorsWithReviews = await assignReviewsToVendors(vendorsWithProducts, vendorReviews);

    const orders = await createOrders(10, customers, products);
    const transactions = await createTransactions(10, customers, orders);
    const customersWithTransactions = await assignTransactionsToCustomers(customersWithShoppingLists, transactions);

    const rewardOrders = await createOrders(10, customers, products);
    const rewardTransactions = await createRewardTransactions(20, customers, rewardOrders);
    const customersWithRewardTransactions = await assignRewardTransactionsToCustomers(customersWithTransactions, rewardTransactions);

    const blogPosts = await createVendorBlogPosts(10, vendors);
    const vendorsWithBlogPosts = await assignBlogPostsToVendors(vendorsWithReviews, blogPosts);


    for (let i = 0; i < productsWithReviews.length; i++) {
        // console.log(productsWithReviews[i])
      await Product.create(productsWithReviews[i]);
    }

    for (let i = 0; i < vendorsWithBlogPosts.length; i++) {
        // console.log(vendorsWithBlogPosts[i])
      await Vendor.create(vendorsWithBlogPosts[i]);
    }


    for (let i = 0; i < customersWithRewardTransactions.length; i++) {
        // console.log(customersWithRewardTransactions[i])
      await Customer.create(customersWithRewardTransactions[i]);
    }

    


    await mongoose.disconnect()
}


seed()

