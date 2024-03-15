const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Array,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    userRole: {
        type: String,
        required: true,
        default: "client",
        enum: ["client", "admin", "driver", "vendor"]
    },
    avatar: {
        type: String,
        required: true,
        default: "https://www.svgrepo.com/show/382095/female-avatar-girl-face-woman-user-4.svg",
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User