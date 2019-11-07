const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log(`Please enter your password as an argument`)
    process.exit(1)
}


const password = process.argv[2]

const url = 
    `mongodb+srv://fullstack_sid:${password}@cluster0-m6jas.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = new mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length === 3) {
    Phonebook.find({}).then(result => {
        console.log(`Phonebook: \n`)
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}

else if(process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const entry = new Phonebook({
        name: name,
        number: number,
    })

    entry.save().then(result => {
        console.log(`Added ${name} - ${number} to Phonebook`)
        mongoose.connection.close()
    })
}

else {
    console.log(`Expecting either 3 or 5 arguments`)
    process.exit(1)
}