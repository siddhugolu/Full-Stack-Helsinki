const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch(error => {
        console.log('Error in connecting to MongoDB: ', error.message)
    })


app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app