const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const routes = require('./routes/index')
const connectDB = require('./configs/dbConnection')

//Firebase admin configuration
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//Config middleware
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cookieParser())

//Routes
app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html')
    res.write("<h1>Welcome to the backend!</h1>")
    res.write('<h2>It\'s working!</h2>')
    res.end()
})
app.use(routes)

//Running server
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
    connectDB()
})


//Error middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})