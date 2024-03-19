const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    foodTags: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    foodStore: {
        type: mongoose.Schema.ObjectId,
        ref: 'FoodStore'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    ratingCount: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    additives: {
        type: Array,
        required: true
    }
}, { timestamps: true })

const Food = mongoose.model('Food', foodSchema)
module.exports = Food