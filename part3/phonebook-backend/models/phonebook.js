const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(result => {
            console.log('Connected to MongoDB')
        })
        .catch((error) => {
            console.log(`Error connecting to MongoDB: ${error.message}`)
        })

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
    }
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

phoneSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Phonebook', phoneSchema)