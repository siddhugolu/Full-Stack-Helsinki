const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        logger.info('Connected to MongoDB!')
    })
    .catch(error => {
        logger.error('Error in connecting to MongoDB: ', error.message)
    })


app.use(cors())
app.use(middleware.tokenExtractor)
app.use(bodyParser.json())
app.use(middleware.requestLogger)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app