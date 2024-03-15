const mongoose = require('mongoose')

const foodStoreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    foods: {
        type: Array,
    },
    owner: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    pickup: {
        type: Boolean,
        required: false,
        default: true
    },
    delivery: {
        type: Boolean,
        required: false,
        default: true
    },
    logoUrl: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/512/1702/1702100.png"
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: String,
    },
    coords: {
        id: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        lattitudeDelta: {
            type: Number,
            required: true
        },
        longitudeDelta: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const FoodStore = mongoose.model('FoodStore', foodStoreSchema)
module.exports = FoodStore