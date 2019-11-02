const express = require('express')
const app = express()

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

const port = 3001
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})