const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const admin = require('firebase-admin')
const User = require('../models/user.model')
const errorHandler = require('../utils/error')
const salt = await bcrypt.genSalt(10)

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        await admin.auth().getUserByEmail(email)
        return next(errorHandler(400, "Email is already in used by another account!"))
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            try { 
                const user = await admin.auth().createUser({
                    email,
                    password,
                    emailVerified: false,
                    disabled: false,
                })
                const hashedPassword = await bcrypt.hash(password, salt)
                const newUser = new User({
                    username,
                    email,
                    uid: user.uid,
                    password: hashedPassword,
                    userRole: "client"
                })
                await newUser.save()
                res.status(201).json(newUser)
            } catch (err) {
                next(err)
            }
        }            
    }
}

const signIn = async (req, res, next) => {
    const { email } = req.body
    try {
        const validUser = await User.findOne({ email }, { __v: 0, updatedAt: 0, createdAt: 0 })
        if (!validUser) return next(errorHandler(401, "Wrong credentials!"))
        const checkPassword = await bcrypt.compare(password, validUser.password)
        if (!checkPassword) return next(errorHandler(401, "Wrong password!"))
        const token = jwt.sign({ id: validUser._id, userRole: validUser.userRole, email: validUser.email }, JWT_SECRET_KEY)
        const { password, ...rest } = validUser._doc
        res
            .cookies("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            })
            .status(200)
            .json(rest, token)
    } catch (err) {
        next(err)
    }
}

const logout = (req, res, next) => {
   try {
        res.clearCookies("access_token")
        res.status(200).json("Logged out successfully!")
   } catch (err) {
        next(err)
   }
}

module.exports = { signUp, signIn, logout }