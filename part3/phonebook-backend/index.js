require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Phonebook.find({}).then(p => {
        res.json(p.map(r => r.toJSON()))
    })
})

app.get('/info', (request, response) => {
    
    Phonebook.countDocuments({}, (err, count) => {
        console.log(count)
        const date = new Date()
        response.send(`
        <p> Phonebook has ${count} entries </p>
        <p> Request received at: ${date} </p>
        `)
    })
    

})

app.get('/api/persons/:id', (req, res, next) => {
    Phonebook.findById(req.params.id).then(p => {
        if(p) {
            res.json(p.toJSON())
        }
        else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'Name/number missing' })
    }
    const entry = new Phonebook({
        name: body.name,
        number: body.number,
    })

    entry.save().then(savedEntry => {
        res.json(savedEntry.toJSON())
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndRemove(request.params.id)
                .then(result => {
                    response.status(204).end()
                })
                .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const entry = {
        name: body.name,
        number: body.number,
    }
    Phonebook.findByIdAndUpdate(request.params.id, entry, { new: true })
            .then(updatedEntry => {
                response.json(updatedEntry.toJSON())
            })
            .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})