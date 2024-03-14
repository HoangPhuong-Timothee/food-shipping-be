const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@food-shipping.ltzljvw.mongodb.net/food-shipping?retryWrites=true&w=majority&appName=food-shipping`)
        console.log(`Connected to database: ${mongoose.connect.name} successfully!`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB