
const Gardeny  = require("./Gardeny.js");
const { faker } = require("@faker-js/faker")
const { Product, Stock } = require("../schema.js");
const { getRandomItem } = require("../seedfunctions.js");

const mongoose = require("mongoose");

const { MONGO_CONNECTION_STRING } = process.env
mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const gardeny = new Gardeny();
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

const createProductStocks = async () => {
    const stocks = [];
    // Randomly choose smallstock or largestock
    const stockList = await getRandomItem([smallProductStocks, largeProductStocks])
    for (singleStock of stockList) {
        const stock =  new Stock({
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
    for (i = 0; i < num; i++) {
        const newProduct = await gardeny.newProduct();
        const stocks = await createProductStocks(newProduct.stock);
        const { name, type, link, tags } = newProduct
        console.log(name,type,link,tags)
        const product = new Product({
            name: await newProduct.name,
            type:  await newProduct.type,
            description: faker.lorem.paragraph(),
            price: faker.commerce.price(),
            image_url: await newProduct.link,
            stock: stocks,
            reviews: [],
            tags: await newProduct.tags,
        })
        products.push(product)
    }
    return products
}

// Creating a lot of products with gardeny and then using Promise.all

const createNewProducts = async (num) => {
    const products = [];
    const gardenyProducts = []
    for (i = 0; i < num; i++) {
        const gardenProduct = gardeny.newProduct();
        gardenyProducts.push(gardenProduct)
    }
    const newProducts = await Promise.all(gardenyProducts)
    for (newProduct of newProducts) {
        const stocks = await createProductStocks(newProduct.stock);
        const { name, type, link, tags } = newProduct
        console.log(name,type,link,tags)
    }
}

createNewProducts(50)

const seedProducts = async (num) => {
    const products = await createProducts(num);
    try {
        for (product of products) {
            await product.save();
        }
        console.log("Products seeded");
    } catch (err) {
        console.error(err);
    }
}

// seedProducts(50)