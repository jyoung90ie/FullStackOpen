const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the database password, usage:')
    console.log('node mongo.js <password>')
}

const password = process.argv[2]

// connect to mongodb
const url = `mongodb+srv://fullstack:${password}@cluster0-4cihk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// define db schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
// initialise mongoose model
const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    // if only password is provided, return list of phonebook entries
    console.log('---Show all entries in phonebook---')
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })


} else {
    // if more than 3 arguments are provided, assume user wants to add a new entry

    const name = process.argv[3]
    const number = process.argv[4]

    // create new number
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(() => {
        console.log('---New entry added to the Phonebook DB---')
        mongoose.connection.close()
    })
}