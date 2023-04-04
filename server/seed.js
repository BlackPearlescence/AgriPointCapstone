const { Customer, Testimonial } = require("./schema.js")
const { faker, SystemModule } = require("@faker-js/faker")
const mongoose = require("mongoose");
const async = require("async");
require("dotenv").config();


const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const seed = async () => {
    // Delete Customers Collection
    await Customer.deleteMany({})
    // Delete Testimonials
    await Testimonial.deleteMany({});

    // Create a customer and a testimonial to go along with it
    for(let i = 0; i < 50; i++){
        const customer = new Customer({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        await customer.save()

        const testimonial = new Testimonial({
            title: faker.lorem.words(3),
            description: faker.lorem.words(10),
            rating: faker.datatype.number({min: 4, max: 5}),
            customer: customer._id,
        })
        await testimonial.save()
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





