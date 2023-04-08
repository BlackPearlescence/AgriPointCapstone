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
    // Delete Stocks
    await Stock.deleteMany({})
    // Delete Products
    await Product.deleteMany({})




    // Create a customer and a testimonial to go along with it
    for(let i = 0; i < 10; i++){
        const phoneNumbers = []
        const phone = new Phone({
            number_type: faker.lorem.word(),
            number: faker.phone.number()
        })
        phoneNumbers.push(phone)

        const contact = new Contact({
            phone_book: phoneNumbers,
            email: faker.internet.email()
        })

        const address = new Address({
            address_one: faker.address.streetAddress(),
            address_two: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        })

        
        const customer = new Customer({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            password: faker.internet.password(),
            joined_at: faker.date.between('2020-01-01', '2023-03-23'),
            contact: contact,
            address: address,
            avatar_url: faker.image.avatar(),
        })
        await customer.save()

        const testimonial = new Testimonial({
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(sentenceCount = 3),
            rating: faker.datatype.number({min: 4, max: 5}),
            customer: customer._id,
        })
        await testimonial.save()
    }

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
    for(let i = 0; i < 20; i++){
        const tag = new Tag({
            name: faker.lorem.word()
        })
        await tag.save()
    }

    // Get the list of Tags
    const tags =  await Tag.find({});

    for(let i = 0; i < 10; i++) {
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
        const numberOfTagsToAssign = faker.datatype.number({ min: 1, max: 5 })
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

        // Add items to the carts of a random customer
        const randomCustomer = await Customer.findOne({})
        for(let i = 0; i < 10; i++){
            const randomProduct = await Product.findOne({})
            if(!randomProduct.carts.some(c => c._id.equals(randomCustomer._id))){
                randomProduct.carts.push(randomCustomer._id)
                randomProduct.save()
            }
            const cartItem = randomCustomer.cart.find(item => item.product.equals(randomProduct._id));
            if(cartItem){
                randomCustomer.$inc("cartItem.quantity",1)
                await randomCustomer.save()
                console.log(randomCustomer)

            } else {
                const newCartItem = new Cart({
                    product: randomProduct._id,
                    quantity: faker.datatype.number({ min: 2, max: 10})
                })
                // await Customer.updateOne(
                //     {_id: randomCustomer._id},
                //     { $push: {cart: newCartItem}}
                // )
                randomCustomer.cart.push(newCartItem)
            }
            
        }
        await randomCustomer.save()
        

        // Create a random number of reviews and assign them to random products.
        const numberOfReviews = faker.datatype.number({ min: 0, max: 40 })
        const hasImage = faker.datatype.number({ min:0, max:1 })
        let reviewImage = null;
        if(hasImage){
            reviewImage = faker.image.business()
        } 
        for(let i = 0; i < numberOfReviews; i++){
            const randomCustomer = await Customer.aggregate().sample(1)
            const randomProduct = await Product.aggregate().sample(1)


            const productReview = new ProductReview({
                customer: randomCustomer._id,
                product: randomProduct._id,
                rating: faker.datatype.number({ min: 0, max: 5}),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                image_url: reviewImage
            })
            await productReview.save()
        }

        // Generate Vendors
        for(let i = 0; i < 5; i++){
            const numberOfNumbersToGenerate = faker.datatype.number({ min: 1, max:3 })
            const phoneNumbers = []
            for(let i = 0; i < numberOfNumbersToGenerate; i++){
                const phone = new Phone({
                    number_type: faker.lorem.word(),
                    number: faker.phone.number()
                })
                phoneNumbers.push(phone)
            }
    
            const contact = new Contact({
                phone_book: phoneNumbers,
                email: faker.internet.email()
            })
    
            const address = new Address({
                address_one: faker.address.streetAddress(),
                address_two: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode()
            })

            // Get random sample of products

            const numberOfProducts = faker.datatype.number({min: 2, max: 10})
            const randomProducts = await Product.aggregate().sample(numberOfProducts).project("_id").exec()

            const vendor = new Vendor({
                name: faker.company.name() + " " + faker.company.companySuffix(),
                slogan: faker.company.bs(),
                description: faker.lorem.paragraph(),
                joined_at: faker.date.between('2020-01-01', '2023-03-23'),
                contact: contact,
                address: address,
                image_url: faker.image.nature(),
                products: randomProducts,
            })

            await vendor.save()
        }
        
    }

    
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





