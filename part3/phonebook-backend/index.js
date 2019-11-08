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

app.get('/api/persons/:id', (req, res) => {
    Phonebook.findById(req.params.id).then(p => {
        res.json(p.toJSON())
    })
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


const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})