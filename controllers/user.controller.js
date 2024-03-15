const User = require('../models/user.model')
const errorHandler = require('../utils/error')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
}

const deleteUser = async (req, res) => {
    const { id } = req.params
}

module.exports = { getAllUsers, getUser, deleteUser }