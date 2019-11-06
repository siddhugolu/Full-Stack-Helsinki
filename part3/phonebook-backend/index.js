const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Arto hellas",
        number: "39-44-5323523",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "889920-1839",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "99201-129-23",
        id: 3
    },
    {
        name: "Siddhartha",
        number: "882991-289",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {

    const date = new Date()
    res.send(`
    <p> Phonebook has info for ${persons.length} people </p>
    <p> Request received at: ${date} </p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(10000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    const pos = persons.findIndex(p => p.name === body.name)
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name/Number is missing'
        })
    }
    
    if(pos !== -1) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})