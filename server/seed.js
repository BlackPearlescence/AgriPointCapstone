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
    Cart,
    Order,
    Transaction,
    ProductReview,
    VendorReview,
    RewardsProgram,
    RewardsTransaction,
    BlogPost,
    Stock, } = require("./schema.js");

const { getRandomItem } = require("./seedfunctions.js");

const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose");
const async = require("async");
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const seed = async () => {
    // Delete Customers 
    await Customer.deleteMany({})
    // Delete Testimonials
    await Testimonial.deleteMany({});
    // Delete ShoppingLists
    await ShoppingList.deleteMany({});
    // Delete Vendors
    await Vendor.deleteMany({})
    // Delete Tags
    await Tag.deleteMany({})
    // Delete Carts
    await Cart.deleteMany({})
    // Delete Orders
    await Order.deleteMany({})
    // Delete Transactions
    await Transaction.deleteMany({})
    // Delete ProductReviews
    await ProductReview.deleteMany({})
    // Delete VendorReviews
    await VendorReview.deleteMany({})
    // Delete RewardsPrograms
    await RewardsProgram.deleteMany({})
    // Delete RewardsTransactions
    await RewardsTransaction.deleteMany({})
    // Delete BlogPosts
    await BlogPost.deleteMany({})

    for(let i = 0; i < 5; i++){
        // Generate the benefits for the program
        const benefits = []
        for(let i = 1; i < 11; i++){
            const benefit = new Benefit({
                rank: i,
                titular_description: faker.lorem.words(3),
                description: faker.lorem.paragraph()
            })
            benefits.push(benefit)
        }

        // Create the rewards programs
        const rewardsProgram = new RewardsProgram({
            tier_name: faker.lorem.word(),
            benefits: benefits,
            tier_card_url: faker.image.abstract()
        })

        await rewardsProgram.save()
    }

    // Generate Tags
    for(let i = 0; i < 50; i++){
        const tag = new Tag({
            name: faker.lorem.word()
        })
        await tag.save()
    }

    // Get the list of Tags
    const tags =  await Tag.find({});

    for(let i = 0; i < 50; i++) {
        // Generate product stocks with their associated sizes
        const sizeNumber = faker.datatype.number({ min: 1, max: 5})
        const stocks = []
        for(let i = 0; i < sizeNumber; i++){
            const quantity = faker.datatype.number({ min: 2, max: 24})
            const amountInStock = faker.datatype.number({ min: 1, max: 99})
            const stock = new Stock({
                size_name: faker.lorem.word(),
                size_quantity: quantity,
                size_stock: amountInStock,
            })
            stocks.push(stock)
        }

        // Collect a random number of tags for the product 
        // and make an empty array for the tags to assign
        const numberOfTagsToAssign = faker.datatype.number({ min: 1, max: 20})
        const tagsToAssign = []
        
        // Copy the list of tags
        let copyOfTags = tags

        for(let i = 0; i < numberOfTagsToAssign; i++) {
            const randomTag = getRandomItem(copyOfTags)
            tagsToAssign.push(randomTag._id)
            // Remove the tag so it isn't assigned twice
            copyOfTags = copyOfTags.filter(tag => tag != randomTag)
        }
        // Generate products
        const product = new Product({
            name: faker.commerce.product(),
            type: faker.commerce.productName(),
            price: faker.commerce.price(),
            stock: stocks,
            image_url: faker.image.food(),
            tags: tagsToAssign,
            // TODO: Add product review seed
        })

        await product.save()
    }

    // Create a customer and a testimonial to go along with it
    // for(let i = 0; i < 50; i++){
    //     const customer = new Customer({
    //         first_name: faker.name.firstName(),
    //         last_name: faker.name.lastName(),
    //         email: faker.internet.email(),
    //         password: faker.internet.password(),
    //     })
    //     await customer.save()

    //     const testimonial = new Testimonial({
    //         title: faker.lorem.words(3),
    //         description: faker.lorem.paragraph(sentenceCount = 3),
    //         rating: faker.datatype.number({min: 4, max: 5}),
    //         customer: customer._id,
    //     })
    //     await testimonial.save()
    // }
    await mongoose.disconnect()
}


seed()


// const dropAllCollections = (callback) => {
//     Customer.collection.drop()
//     callback(null)
// }

// const seedCustomers = (callback) => {
//     for(let i=0; i < 10 ; i++){
//         const customer = new Customer({
//             firstName: faker.name.firstName(),
//             lastName: faker.name.lastName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//         })
//         newCustomer = customer.save()
//         console.log("Saved customer:", newCustomer)
//     }
//     console.log("Seeded customer data")
//     callback(null)
// }

// async.series([
//     // dropAllCollections,
//     seedCustomers
// ], (err) => {
//     if(err) {
//         console.error("Failed to seed database:",err)
//     } else {
//         console.log("Finished seeding database!")
//     }

//     // Close database connection
    
// })
// conn.close()
// process.exit(0)





