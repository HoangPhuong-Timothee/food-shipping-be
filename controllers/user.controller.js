const User = require('../models/user.model')
const errorHandler = require('../utils/error')
const bcrypt = require('bcrypt')
const salt = await bcrypt.genSalt(10)

const updateUserInfo = async (req, res, next) => {
    const userId = req.user.id
    if (userId !== req.params.id) {
        return next(errorHandler(401, "Unauthorized!"))
    }
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, salt) 
        }
        const isExistedEmail = await User.findOne({ email: req.body.email })
        if (isExistedEmail) return next(errorHandler(400, "Email is already in used by another account!")) 
        const updatedInfo = await User.findByIdAndUpdate(userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                avatar: req.body.avatar,
                password: req.body.password
            }  
        }, 
        { 
            new: true 
        })
        const { password, ...rest } = updatedInfo._doc
        res.status(200).json({
            message: "Updated user's info successfully!",
            data: rest
        })
    } catch (error) {
        next(error)
    }
}

const getUserInfo = async (req, res) => {
    const userId = req.user.id
    if (userId !== req.params.id) {
        return next(errorHandler(401, "Unauthorized!"))
    }
    try {
        const user = await User.findUserById({ _id: userId }, { __v: 0, password: 0, updatedAt: 0, createdAt: 0 })
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

const deleteAccount = async (req, res) => {
    const userId = req.user.id
    if (userId !== req.params.id) {
        return next(errorHandler(401, "Unauthorized!"))
    } 
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).json(`Delete account successfully!`)
    } catch (err) {
        next(err)
    }
}

module.exports = { getUserInfo, deleteAccount, updateUserInfo }